import * as ts from 'typescript';

import { compileDts } from './compile-dts';
import { TypesUsageEvaluator } from './types-usage-evaluator';
import {
	ExportType,
	getActualSymbol,
	getClosestModuleLikeNode,
	getClosestSourceFileLikeNode,
	getDeclarationsForSymbol,
	getExportsForSourceFile,
	getExportsForStatement,
	getImportModuleName,
	getNodeName,
	getNodeSymbol,
	getRootSourceFile,
	hasNodeModifier,
	isAmbientModule,
	isDeclareGlobalStatement,
	isDeclareModule,
	isNodeNamedDeclaration,
	SourceFileExport,
	splitTransientSymbol,
} from './helpers/typescript';

import {
	getFileModuleInfo,
	getModuleLikeModuleInfo,
	getReferencedModuleInfo,
	ModuleCriteria,
	ModuleInfo,
	ModuleType,
} from './module-info';

import { generateOutput, ModuleImportsSet, OutputParams } from './generate-output';

import {
	normalLog,
	verboseLog,
} from './logger';
import { CollisionsResolver } from './collisions-resolver';

export interface CompilationOptions {
	/**
	 * EXPERIMENTAL!
	 * Allows disable resolving of symlinks to the original path.
	 * By default following is enabled.
	 * @see https://github.com/timocov/dts-bundle-generator/issues/39
	 */
	followSymlinks?: boolean;

	/**
	 * Path to the tsconfig file that will be used for the compilation.
	 */
	preferredConfigPath?: string;
}

export interface OutputOptions {
	/**
	 * Sort output nodes in ascendant order.
	 */
	sortNodes?: boolean;

	/**
	 * Name of the UMD module.
	 * If specified then `export as namespace ModuleName;` will be emitted.
	 */
	umdModuleName?: string;

	/**
	 * Enables inlining of `declare global` statements contained in files which should be inlined (all local files and packages from inlined libraries).
	 */
	inlineDeclareGlobals?: boolean;

	/**
	 * Enables inlining of `declare module` statements of the global modules
	 * (e.g. `declare module 'external-module' {}`, but NOT `declare module './internal-module' {}`)
	 * contained in files which should be inlined (all local files and packages from inlined libraries)
	 */
	inlineDeclareExternals?: boolean;

	/**
	 * Allows remove "Generated by dts-bundle-generator" comment from the output
	 */
	noBanner?: boolean;

	/**
	 * Enables stripping the `const` keyword from every direct-exported (or re-exported) from entry file `const enum`.
	 * This allows you "avoid" the issue described in https://github.com/microsoft/TypeScript/issues/37774.
	 */
	respectPreserveConstEnum?: boolean;

	/**
	 * By default all interfaces, types and const enums are marked as exported even if they aren't exported directly.
	 * This option allows you to disable this behavior so a node will be exported if it is exported from root source file only.
	 */
	exportReferencedTypes?: boolean;
}

export interface LibrariesOptions {
	/**
	 * Array of package names from node_modules to inline typings from.
	 * Used types will be inlined into the output file.
	 */
	inlinedLibraries?: string[];

	/**
	 * Array of package names from node_modules to import typings from.
	 * Used types will be imported using `import { First, Second } from 'library-name';`.
	 * By default all libraries will be imported (except inlined libraries and libraries from @types).
	 */
	importedLibraries?: string[];

	/**
	 * Array of package names from @types to import typings from via the triple-slash reference directive.
	 * By default all packages are allowed and will be used according to their usages.
	 */
	allowedTypesLibraries?: string[];
}

export interface EntryPointConfig {
	/**
	 * Path to input file.
	 */
	filePath: string;

	libraries?: LibrariesOptions;

	/**
	 * Fail if generated dts contains class declaration.
	 */
	failOnClass?: boolean;

	output?: OutputOptions;
}

export function generateDtsBundle(entries: readonly EntryPointConfig[], options: CompilationOptions = {}): string[] {
	normalLog('Compiling input files...');

	const { program, rootFilesRemapping } = compileDts(entries.map((entry: EntryPointConfig) => entry.filePath), options.preferredConfigPath, options.followSymlinks);
	const typeChecker = program.getTypeChecker();

	const typeRoots = ts.getEffectiveTypeRoots(program.getCompilerOptions(), {});

	const sourceFiles = program.getSourceFiles().filter((file: ts.SourceFile) => {
		return !program.isSourceFileDefaultLibrary(file);
	});

	verboseLog(`Input source files:\n  ${sourceFiles.map((file: ts.SourceFile) => file.fileName).join('\n  ')}`);

	const typesUsageEvaluator = new TypesUsageEvaluator(sourceFiles, typeChecker);

	return entries.map((entryConfig: EntryPointConfig) => {
		normalLog(`Processing ${entryConfig.filePath}`);

		const newRootFilePath = rootFilesRemapping.get(entryConfig.filePath);
		if (newRootFilePath === undefined) {
			throw new Error(`Cannot remap root source file ${entryConfig.filePath}`);
		}

		const rootSourceFile = getRootSourceFile(program, newRootFilePath);
		const rootSourceFileSymbol = typeChecker.getSymbolAtLocation(rootSourceFile);
		if (rootSourceFileSymbol === undefined) {
			throw new Error(`Symbol for root source file ${newRootFilePath} not found`);
		}

		const librariesOptions: LibrariesOptions = entryConfig.libraries || {};

		const criteria: ModuleCriteria = {
			allowedTypesLibraries: librariesOptions.allowedTypesLibraries,
			importedLibraries: librariesOptions.importedLibraries,
			inlinedLibraries: librariesOptions.inlinedLibraries || [],
			typeRoots,
		};

		const rootFileExports = getExportsForSourceFile(typeChecker, rootSourceFileSymbol);
		const rootFileExportSymbols = rootFileExports.map((exp: SourceFileExport) => exp.symbol);

		interface CollectingResult {
			typesReferences: Set<string>;
			imports: Map<string, ModuleImportsSet>;
			statements: ts.Statement[];
			renamedExports: OutputParams['renamedExports'];
		}

		const collectionResult: CollectingResult = {
			typesReferences: new Set(),
			imports: new Map(),
			statements: [],
			renamedExports: [],
		};

		const outputOptions: OutputOptions = entryConfig.output || {};
		const inlineDeclareGlobals = Boolean(outputOptions.inlineDeclareGlobals);

		const collisionsResolver = new CollisionsResolver(typeChecker);

		function updateResultForAnyModule(statements: readonly ts.Statement[], currentModule: ModuleInfo): void {
			// contains a set of modules that were visited already
			// can be used to prevent infinite recursion in updating results in re-exports
			const visitedModules = new Set<string>();

			function updateResultForExternalExport(exportAssignment: ts.ExportAssignment | ts.ExportDeclaration): void {
				// if we have `export =` or `export * from` somewhere so we can decide that every declaration of exported symbol in this way
				// is "part of the exported module" and we need to update result according every member of each declaration
				// but treat they as current module (we do not need to update module info)
				for (const declaration of getDeclarationsForExportedValues(exportAssignment)) {
					let exportedDeclarations: readonly ts.Statement[] = [];

					if (ts.isModuleDeclaration(declaration)) {
						if (declaration.body !== undefined && ts.isModuleBlock(declaration.body)) {
							const referencedModule = getReferencedModuleInfo(declaration, criteria, typeChecker);
							if (referencedModule !== null) {
								if (visitedModules.has(referencedModule.fileName)) {
									continue;
								}

								visitedModules.add(referencedModule.fileName);
							}

							exportedDeclarations = declaration.body.statements;
						}
					} else {
						exportedDeclarations = [declaration as unknown as ts.Statement];
					}

					updateResultImpl(exportedDeclarations);
				}
			}

			// eslint-disable-next-line complexity
			function updateResultImpl(statementsToProcess: readonly ts.Statement[]): void {
				for (const statement of statementsToProcess) {
					// we should skip import statements
					if (statement.kind === ts.SyntaxKind.ImportDeclaration || statement.kind === ts.SyntaxKind.ImportEqualsDeclaration) {
						continue;
					}

					if (isDeclareModule(statement)) {
						updateResultForModuleDeclaration(statement, currentModule);

						// if a statement is `declare module "module" {}` then don't process it below
						// as it is handled already in `updateResultForModuleDeclaration`
						// but if it is `declare module Module {}` then it can be used in types and imports
						// so in this case it needs to be checked for "usages" below
						if (ts.isStringLiteral(statement.name)) {
							continue;
						}
					}

					if (currentModule.type === ModuleType.ShouldBeUsedForModulesOnly) {
						continue;
					}

					if (isDeclareGlobalStatement(statement) && inlineDeclareGlobals && currentModule.type === ModuleType.ShouldBeInlined) {
						collectionResult.statements.push(statement);
						continue;
					}

					if (ts.isExportDeclaration(statement)) {
						if (!currentModule.isExternal) {
							continue;
						}

						// `export * from`
						if (statement.exportClause === undefined) {
							updateResultForExternalExport(statement);
							continue;
						}

						// `export { val }`
						if (ts.isNamedExports(statement.exportClause) && currentModule.type === ModuleType.ShouldBeImported) {
							updateImportsForStatement(statement);
							continue;
						}
					}

					if (ts.isExportAssignment(statement) && statement.isExportEquals && currentModule.isExternal) {
						updateResultForExternalExport(statement);
						continue;
					}

					if (!isNodeUsed(statement)) {
						continue;
					}

					switch (currentModule.type) {
						case ModuleType.ShouldBeReferencedAsTypes:
							addTypesReference(currentModule.typesLibraryName);
							break;

						case ModuleType.ShouldBeImported:
							updateImportsForStatement(statement);
							break;

						case ModuleType.ShouldBeInlined:
							if (ts.isVariableStatement(statement)) {
								for (const variableDeclaration of statement.declarationList.declarations) {
									if (ts.isIdentifier(variableDeclaration.name)) {
										collisionsResolver.addTopLevelIdentifier(variableDeclaration.name);
									}

									// it seems that the compiler doesn't produce anything else (e.g. binding elements) in declaration files
									// but it is still possible to write such code manually
									// this feels like quite rare case so no support for now
								}
							} else if (isNodeNamedDeclaration(statement)) {
								const statementName = getNodeName(statement);
								if (statementName !== undefined) {
									collisionsResolver.addTopLevelIdentifier(statementName as ts.Identifier | ts.DefaultKeyword);
								}
							}

							collectionResult.statements.push(statement);
							break;
					}
				}
			}

			updateResultImpl(statements);
		}

		function updateResultForRootModule(statements: readonly ts.Statement[], currentModule: ModuleInfo): void {
			function isReExportFromImportableModule(statement: ts.Statement): boolean {
				if (!ts.isExportDeclaration(statement)) {
					return false;
				}

				const resolvedModuleInfo = getReferencedModuleInfo(statement, criteria, typeChecker);
				if (resolvedModuleInfo === null) {
					return false;
				}

				return resolvedModuleInfo.type === ModuleType.ShouldBeImported;
			}

			updateResultForAnyModule(statements, currentModule);

			// add skipped by `updateResult` exports
			for (const statement of statements) {
				// "export =" or "export {} from 'importable-package'"
				if (ts.isExportAssignment(statement) && statement.isExportEquals || isReExportFromImportableModule(statement)) {
					collectionResult.statements.push(statement);
					continue;
				}

				// "export default"
				if (ts.isExportAssignment(statement) && !statement.isExportEquals) {
					if (!ts.isIdentifier(statement.expression)) {
						// `export default 123`, `export default "str"`
						collectionResult.statements.push(statement);
					}

					continue;
				}
			}
		}

		function updateResultForModuleDeclaration(moduleDecl: ts.ModuleDeclaration, currentModule: ModuleInfo): void {
			if (moduleDecl.body === undefined || !ts.isModuleBlock(moduleDecl.body)) {
				return;
			}

			const referencedModuleInfo = getReferencedModuleInfo(moduleDecl, criteria, typeChecker);
			if (referencedModuleInfo === null) {
				return;
			}

			// if we have declaration of external module inside internal one
			if (!currentModule.isExternal && referencedModuleInfo.isExternal) {
				// if it's allowed - we need to just add it to result without any processing
				if (outputOptions.inlineDeclareExternals) {
					collectionResult.statements.push(moduleDecl);
				}

				return;
			}

			updateResultForAnyModule(moduleDecl.body.statements, referencedModuleInfo);
		}

		function addTypesReference(library: string): void {
			if (!collectionResult.typesReferences.has(library)) {
				normalLog(`Library "${library}" will be added via reference directive`);
				collectionResult.typesReferences.add(library);
			}
		}

		function updateImportsForStatement(statement: ts.Statement | ts.SourceFile | ts.ExportSpecifier): void {
			const statementsToImport = ts.isVariableStatement(statement)
				? statement.declarationList.declarations
				: ts.isExportDeclaration(statement) && statement.exportClause !== undefined
					? ts.isNamespaceExport(statement.exportClause)
						? [statement.exportClause]
						: statement.exportClause.elements
					: [statement];

			for (const statementToImport of statementsToImport) {
				if (shouldNodeBeImported(statementToImport as ts.DeclarationStatement)) {
					addImport(statementToImport as ts.DeclarationStatement);

					// if we're going to add import of any statement in the bundle
					// we should check whether the library of that statement
					// could be referenced via triple-slash reference-types directive
					// because the project which will use bundled declaration file
					// can have `types: []` in the tsconfig and it'll fail
					// this is especially related to the types packages
					// which declares different modules in their declarations
					// e.g. @types/node has declaration for "packages" events, fs, path and so on
					const sourceFile = statementToImport.getSourceFile();
					const moduleInfo = getFileModuleInfo(sourceFile.fileName, criteria);
					if (moduleInfo.type === ModuleType.ShouldBeReferencedAsTypes) {
						addTypesReference(moduleInfo.typesLibraryName);
					}
				}
			}
		}

		// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
		function getDeclarationUsagesSourceFiles(declaration: ts.NamedDeclaration): Set<ts.SourceFile | ts.ModuleDeclaration> {
			return new Set(
				getExportedSymbolsUsingStatement(declaration)
					.map((symbol: ts.Symbol) => getDeclarationsForSymbol(symbol))
					.reduce((acc: ts.Declaration[], val: ts.Declaration[]) => acc.concat(val), [])
					.map(getClosestModuleLikeNode)
			);
		}

		function addImport(statement: ts.DeclarationStatement | ts.SourceFile): void {
			if (!ts.isSourceFile(statement) && statement.name === undefined) {
				throw new Error(`Import/usage unnamed declaration: ${statement.getText()}`);
			}

			getDeclarationUsagesSourceFiles(statement).forEach((sourceFile: ts.SourceFile | ts.ModuleDeclaration) => {
				const sourceFileStatements = ts.isSourceFile(sourceFile)
					? sourceFile.statements
					: (sourceFile.body as ts.ModuleBlock).statements;

				sourceFileStatements.forEach((st: ts.Statement) => {
					if (!ts.isImportEqualsDeclaration(st) && !ts.isImportDeclaration(st)) {
						return;
					}

					const importModuleSpecifier = getImportModuleName(st);
					if (importModuleSpecifier === null) {
						return;
					}

					const referencedModuleInfo = getReferencedModuleInfo(st, criteria, typeChecker);
					// if a referenced module should be inlined we can just ignore it
					if (referencedModuleInfo === null || referencedModuleInfo.type !== ModuleType.ShouldBeImported) {
						return;
					}

					let importItem = collectionResult.imports.get(importModuleSpecifier);
					if (importItem === undefined) {
						importItem = {
							defaultImports: new Set(),
							namedImports: new Set(),
							starImports: new Set(),
							requireImports: new Set(),
						};

						collectionResult.imports.set(importModuleSpecifier, importItem);
					}

					if (ts.isImportEqualsDeclaration(st)) {
						if (areDeclarationSame(statement, st)) {
							importItem.requireImports.add(collisionsResolver.addTopLevelIdentifier(st.name));
						}

						return;
					}

					const importClause = st.importClause as ts.ImportClause;
					if (importClause.name !== undefined && areDeclarationSame(statement, importClause)) {
						// import name from 'module';
						importItem.defaultImports.add(collisionsResolver.addTopLevelIdentifier(importClause.name));
					}

					if (importClause.namedBindings !== undefined) {
						if (ts.isNamedImports(importClause.namedBindings)) {
							// import { El1, El2 as ImportedName } from 'module';
							importClause.namedBindings.elements
								.filter(areDeclarationSame.bind(null, statement))
								.forEach((specifier: ts.ImportSpecifier) => {
									const newLocalName = collisionsResolver.addTopLevelIdentifier(specifier.name);
									const importedName = (specifier.propertyName || specifier.name).text;
									// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
									importItem!.namedImports.add(newLocalName === importedName ? importedName : `${importedName} as ${newLocalName}`);
								});
						} else {
							// import * as name from 'module';
							importItem.starImports.add(collisionsResolver.addTopLevelIdentifier(importClause.namedBindings.name));
						}
					}
				});
			});
		}

		// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
		function getGlobalSymbolsUsingSymbol(symbol: ts.Symbol): ts.Symbol[] {
			return Array.from(typesUsageEvaluator.getSymbolsUsingSymbol(symbol) ?? []).filter((usedInSymbol: ts.Symbol) => {
				if (usedInSymbol.escapedName !== ts.InternalSymbolName.Global) {
					return false;
				}

				return getDeclarationsForSymbol(usedInSymbol).some((decl: ts.Declaration) => {
					const closestModuleLike = getClosestSourceFileLikeNode(decl);
					const moduleInfo = getModuleLikeModuleInfo(closestModuleLike, criteria, typeChecker);
					return moduleInfo.type === ModuleType.ShouldBeInlined;
				});
			});
		}

		function isNodeUsed(node: ts.Node): boolean {
			if (isNodeNamedDeclaration(node) || ts.isSourceFile(node)) {
				const nodeSymbol = getNodeSymbol(node, typeChecker);
				if (nodeSymbol === null) {
					return false;
				}

				const nodeUsedByDirectExports = rootFileExportSymbols.some((rootExport: ts.Symbol) => typesUsageEvaluator.isSymbolUsedBySymbol(nodeSymbol, rootExport));
				if (nodeUsedByDirectExports) {
					return true;
				}

				return inlineDeclareGlobals && getGlobalSymbolsUsingSymbol(nodeSymbol).length !== 0;
			} else if (ts.isVariableStatement(node)) {
				return node.declarationList.declarations.some((declaration: ts.VariableDeclaration) => {
					return isNodeUsed(declaration);
				});
			} else if (ts.isExportDeclaration(node) && node.exportClause !== undefined && ts.isNamespaceExport(node.exportClause)) {
				return isNodeUsed(node.exportClause);
			}

			return false;
		}

		function shouldNodeBeImported(node: ts.NamedDeclaration): boolean {
			const nodeSymbol = getNodeSymbol(node, typeChecker);
			if (nodeSymbol === null) {
				return false;
			}

			const isSymbolDeclaredInDefaultLibrary = getDeclarationsForSymbol(nodeSymbol).some(
				(declaration: ts.Declaration) => program.isSourceFileDefaultLibrary(declaration.getSourceFile())
			);
			if (isSymbolDeclaredInDefaultLibrary) {
				// we shouldn't import a node declared in the default library (such dom, es2015)
				// yeah, actually we should check that node is declared only in the default lib
				// but it seems we can check that at least one declaration is from default lib
				// to treat the node as un-importable
				// because we can't re-export declared somewhere else node with declaration merging

				// also, if some lib file will not be added to the project
				// for example like it is described in the react declaration file (e.g. React Native)
				// then here we still have a bug with "importing global declaration from a package"
				// (see https://github.com/timocov/dts-bundle-generator/issues/71)
				// but I don't think it is a big problem for now
				// and it's possible that it will be fixed in https://github.com/timocov/dts-bundle-generator/issues/59
				return false;
			}

			const symbolsDeclarations = getDeclarationsForSymbol(nodeSymbol);

			// if all declarations of the symbol are in modules that should be inlined then this symbol must be inlined, not imported
			const shouldSymbolBeInlined = symbolsDeclarations.every(
				(decl: ts.Declaration) => getModuleLikeModuleInfo(
					getClosestSourceFileLikeNode(decl),
					criteria,
					typeChecker
				).type === ModuleType.ShouldBeInlined
			);
			if (shouldSymbolBeInlined) {
				return false;
			}

			return getExportedSymbolsUsingSymbol(nodeSymbol).length !== 0;
		}

		function getExportedSymbolsUsingStatement(node: ts.NamedDeclaration): readonly ts.Symbol[] {
			const nodeSymbol = getNodeSymbol(node, typeChecker);
			if (nodeSymbol === null) {
				return [];
			}

			return getExportedSymbolsUsingSymbol(nodeSymbol);
		}

		function getExportedSymbolsUsingSymbol(nodeSymbol: ts.Symbol): readonly ts.Symbol[] {
			const symbolsUsingNode = typesUsageEvaluator.getSymbolsUsingSymbol(nodeSymbol);
			if (symbolsUsingNode === null) {
				throw new Error(`Something went wrong - getSymbolsUsingSymbol returned null but expected to be a set of symbols (symbol=${nodeSymbol.name})`);
			}

			return [
				// symbols which are used in types directly
				...Array.from(symbolsUsingNode).filter((symbol: ts.Symbol) => {
					const symbolsDeclarations = getDeclarationsForSymbol(symbol);
					if (symbolsDeclarations.length === 0 || symbolsDeclarations.every((decl: ts.Declaration) => {
						// we need to make sure that at least 1 declaration is inlined
						return getModuleLikeModuleInfo(getClosestSourceFileLikeNode(decl), criteria, typeChecker).type !== ModuleType.ShouldBeInlined;
					})) {
						return false;
					}

					return rootFileExportSymbols.some((rootSymbol: ts.Symbol) => typesUsageEvaluator.isSymbolUsedBySymbol(symbol, rootSymbol));
				}),
				// symbols which are used in global types i.e. in `declare global`s
				...(inlineDeclareGlobals ? getGlobalSymbolsUsingSymbol(nodeSymbol) : []),
			];
		}

		function areDeclarationSame(left: ts.NamedDeclaration, right: ts.NamedDeclaration): boolean {
			const leftSymbols = splitTransientSymbol(getNodeSymbol(left, typeChecker) as ts.Symbol, typeChecker);
			const rightSymbols = splitTransientSymbol(getNodeSymbol(right, typeChecker) as ts.Symbol, typeChecker);

			for (const leftSymbol of leftSymbols) {
				if (rightSymbols.has(leftSymbol)) {
					return true;
				}
			}

			return false;
		}

		function getDeclarationsForExportedValues(exp: ts.ExportAssignment | ts.ExportDeclaration): ts.Declaration[] {
			const nodeForSymbol = ts.isExportAssignment(exp) ? exp.expression : exp.moduleSpecifier;
			if (nodeForSymbol === undefined) {
				return [];
			}

			const symbolForExpression = typeChecker.getSymbolAtLocation(nodeForSymbol);
			if (symbolForExpression === undefined) {
				return [];
			}

			const symbol = getActualSymbol(symbolForExpression, typeChecker);
			return getDeclarationsForSymbol(symbol);
		}

		function syncExportsWithRenames(): void {
			for (const exp of rootFileExports) {
				if (exp.type === ExportType.CommonJS) {
					// commonjs will be handled separately where we handle root source files
					// as the only way of adding it is to add an explicit export statement in the root source file
					continue;
				}

				const symbolKnownNames = collisionsResolver.namesForSymbol(exp.symbol);
				if (symbolKnownNames.size === 0) {
					// that's fine if a symbol doesn't exists in collisions resolver because it operates on top-level symbols only
					// in some cases a symbol can be exported but not added to the top-level scope
					// for instance in case of re-export from a library `export { Foo } from 'bar'`
					// in this case we'll add this re-export differently
					continue;
				}

				if (symbolKnownNames.has(exp.exportedName)) {
					// an exported symbol is already known with its "exported" name so nothing to do at this point
					continue;
				}

				// in case if this symbol isn't known yet we need to add it via renamed export
				// we assume that all known names are equal so we can use any (first)
				// usually all "local" names should have only one known name
				// but having multiple names is possible with imports - you can import the same node with different names
				// and we want to preserve the source input as much as we can that's why we re-use them
				const symbolName = Array.from(symbolKnownNames)[0];
				collectionResult.renamedExports.push(`${symbolName} as ${exp.exportedName}`);
			}
		}

		for (const sourceFile of sourceFiles) {
			verboseLog(`\n\n======= Preparing file: ${sourceFile.fileName} =======`);

			const updateFn = sourceFile === rootSourceFile ? updateResultForRootModule : updateResultForAnyModule;
			const currentModule = getFileModuleInfo(sourceFile.fileName, criteria);

			updateFn(sourceFile.statements, currentModule);

			// handle `import * as module` usage if it's used as whole module
			if (currentModule.type === ModuleType.ShouldBeImported && isNodeUsed(sourceFile)) {
				updateImportsForStatement(sourceFile);
			}
		}

		if (entryConfig.failOnClass) {
			const classes = collectionResult.statements.filter(ts.isClassDeclaration);
			if (classes.length !== 0) {
				const classesNames = classes.map((c: ts.ClassDeclaration) => c.name === undefined ? 'anonymous class' : c.name.text);
				throw new Error(`${classes.length} class statement(s) are found in generated dts: ${classesNames.join(', ')}`);
			}
		}

		syncExportsWithRenames();

		// by default this option should be enabled
		const exportReferencedTypes = outputOptions.exportReferencedTypes !== false;

		return generateOutput(
			{
				...collectionResult,
				resolveIdentifierName: (identifier: ts.Identifier | ts.QualifiedName | ts.PropertyAccessEntityNameExpression): string | null => {
					if (ts.isIdentifier(identifier)) {
						return collisionsResolver.resolveReferencedIdentifier(identifier);
					} else {
						return collisionsResolver.resolveReferencedQualifiedName(identifier);
					}
				},
				shouldStatementHasExportKeyword: (statement: ts.Statement) => {
					const statementExports = getExportsForStatement(rootFileExports, typeChecker, statement);

					// If true, then no direct export was found. That means that node might have
					// an export keyword (like interface, type, etc) otherwise, if there are
					// only re-exports with renaming (like export { foo as bar }) we don't need
					// to put export keyword for this statement because we'll re-export it in the way
					// const hasStatementDefaultKeyword = hasNodeModifier(statement, ts.SyntaxKind.DefaultKeyword);
					let result = statementExports.length === 0 || statementExports.find((exp: SourceFileExport) => {
						if (ts.isVariableStatement(statement)) {
							for (const variableDeclaration of statement.declarationList.declarations) {
								if (ts.isIdentifier(variableDeclaration.name)) {
									const resolvedName = collisionsResolver.resolveReferencedIdentifier(variableDeclaration.name);
									if (exp.exportedName === resolvedName) {
										return true;
									}
								}

								// it seems that the compiler doesn't produce anything else (e.g. binding elements) in declaration files
								// but it is still possible to write such code manually
								// this feels like quite rare case so no support for now
							}

							return false;
						}

						if (isNodeNamedDeclaration(statement)) {
							const nodeName = getNodeName(statement);
							if (nodeName === undefined) {
								throw new Error(`Cannot find node name ${statement.getText()}`);
							}

							const resolvedName = collisionsResolver.resolveReferencedIdentifier(nodeName as ts.Identifier);
							return exp.exportedName === resolvedName;
						}

						return false;
					}) !== undefined;

					// "direct export" means export from the root source file
					// e.g. classes/functions/etc must be exported from the root source file to have an "export" keyword
					// by default interfaces/types are exported even if they aren't directly exported (e.g. when they are referenced by other types)
					// but if `exportReferencedTypes` option is disabled we have to check direct export for them either
					const onlyDirectlyExportedShouldBeExported = !exportReferencedTypes
						|| ts.isClassDeclaration(statement)
						|| (ts.isEnumDeclaration(statement) && !hasNodeModifier(statement, ts.SyntaxKind.ConstKeyword))
						|| ts.isFunctionDeclaration(statement)
						|| ts.isVariableStatement(statement)
						|| ts.isModuleDeclaration(statement);

					if (onlyDirectlyExportedShouldBeExported) {
						// "valuable" statements must be re-exported from root source file
						// to having export keyword in declaration file
						result = result && statementExports.length !== 0;
					} else if (isAmbientModule(statement) || ts.isExportDeclaration(statement)) {
						result = false;
					}

					return result;
				},
				needStripConstFromConstEnum: (constEnum: ts.EnumDeclaration) => {
					if (!program.getCompilerOptions().preserveConstEnums || !outputOptions.respectPreserveConstEnum) {
						return false;
					}

					const enumSymbol = getNodeSymbol(constEnum, typeChecker);
					if (enumSymbol === null) {
						return false;
					}

					return rootFileExportSymbols.includes(enumSymbol);
				},
				needStripImportFromImportTypeNode: (node: ts.ImportTypeNode) => {
					if (node.qualifier === undefined) {
						return false;
					}

					if (!ts.isLiteralTypeNode(node.argument) || !ts.isStringLiteral(node.argument.literal)) {
						return false;
					}

					return getReferencedModuleInfo(node, criteria, typeChecker)?.type === ModuleType.ShouldBeInlined;
				},
			},
			{
				sortStatements: outputOptions.sortNodes,
				umdModuleName: outputOptions.umdModuleName,
				noBanner: outputOptions.noBanner,
			}
		);
	});
}
