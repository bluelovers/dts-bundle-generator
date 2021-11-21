"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDtsBundle = void 0;
const ts = require("typescript");
const path = require("path");
const compile_dts_1 = require("./compile-dts");
const types_usage_evaluator_1 = require("./types-usage-evaluator");
const typescript_1 = require("./helpers/typescript");
const fix_path_1 = require("./helpers/fix-path");
const module_info_1 = require("./module-info");
const generate_output_1 = require("./generate-output");
const logger_1 = require("./logger");
function generateDtsBundle(entries, options = {}) {
    (0, logger_1.normalLog)('Compiling input files...');
    const { program, rootFilesRemapping } = (0, compile_dts_1.compileDts)(entries.map((entry) => entry.filePath), options.preferredConfigPath, options.followSymlinks);
    const typeChecker = program.getTypeChecker();
    const typeRoots = ts.getEffectiveTypeRoots(program.getCompilerOptions(), {});
    const sourceFiles = program.getSourceFiles().filter((file) => {
        return !program.isSourceFileDefaultLibrary(file);
    });
    (0, logger_1.verboseLog)(`Input source files:\n  ${sourceFiles.map((file) => file.fileName).join('\n  ')}`);
    const typesUsageEvaluator = new types_usage_evaluator_1.TypesUsageEvaluator(sourceFiles, typeChecker);
    return entries.map((entry) => {
        (0, logger_1.normalLog)(`Processing ${entry.filePath}`);
        const newRootFilePath = rootFilesRemapping.get(entry.filePath);
        if (newRootFilePath === undefined) {
            throw new Error(`Cannot remap root source file ${entry.filePath}`);
        }
        const rootSourceFile = getRootSourceFile(program, newRootFilePath);
        const rootSourceFileSymbol = typeChecker.getSymbolAtLocation(rootSourceFile);
        if (rootSourceFileSymbol === undefined) {
            throw new Error(`Symbol for root source file ${newRootFilePath} not found`);
        }
        const librariesOptions = entry.libraries || {};
        const criteria = {
            allowedTypesLibraries: librariesOptions.allowedTypesLibraries,
            importedLibraries: librariesOptions.importedLibraries,
            inlinedLibraries: librariesOptions.inlinedLibraries || [],
            typeRoots,
        };
        const rootFileExports = (0, typescript_1.getExportsForSourceFile)(typeChecker, rootSourceFileSymbol);
        const rootFileExportSymbols = rootFileExports.map((exp) => exp.symbol);
        const collectionResult = {
            typesReferences: new Set(),
            imports: new Map(),
            statements: [],
            renamedExports: [],
        };
        const outputOptions = entry.output || {};
        const updateResultCommonParams = {
            isStatementUsed: (statement) => isNodeUsed(statement, rootFileExportSymbols, typesUsageEvaluator, typeChecker),
            shouldStatementBeImported: (statement) => {
                return shouldNodeBeImported(statement, rootFileExportSymbols, typesUsageEvaluator, typeChecker, program.isSourceFileDefaultLibrary.bind(program));
            },
            shouldDeclareGlobalBeInlined: (currentModule) => Boolean(outputOptions.inlineDeclareGlobals) && currentModule.type === 0 /* ShouldBeInlined */,
            shouldDeclareExternalModuleBeInlined: () => Boolean(outputOptions.inlineDeclareExternals),
            getModuleInfo: (fileName) => (0, module_info_1.getModuleInfo)(fileName, criteria),
            resolveIdentifier: (identifier) => (0, typescript_1.resolveIdentifier)(typeChecker, identifier),
            getDeclarationsForExportedAssignment: (exportAssignment) => {
                const symbolForExpression = typeChecker.getSymbolAtLocation(exportAssignment.expression);
                if (symbolForExpression === undefined) {
                    return [];
                }
                const symbol = (0, typescript_1.getActualSymbol)(symbolForExpression, typeChecker);
                return (0, typescript_1.getDeclarationsForSymbol)(symbol);
            },
            getDeclarationUsagesSourceFiles: (declaration) => {
                return getDeclarationUsagesSourceFiles(declaration, rootFileExportSymbols, typesUsageEvaluator, typeChecker);
            },
            areDeclarationSame: (left, right) => {
                const leftSymbols = (0, typescript_1.splitTransientSymbol)(getNodeSymbol(left, typeChecker), typeChecker);
                const rightSymbols = (0, typescript_1.splitTransientSymbol)(getNodeSymbol(right, typeChecker), typeChecker);
                return leftSymbols.some((leftSymbol) => rightSymbols.includes(leftSymbol));
            },
        };
        for (const sourceFile of sourceFiles) {
            (0, logger_1.verboseLog)(`\n\n======= Preparing file: ${sourceFile.fileName} =======`);
            const prevStatementsCount = collectionResult.statements.length;
            const updateFn = sourceFile === rootSourceFile ? updateResultForRootSourceFile : updateResult;
            const currentModule = (0, module_info_1.getModuleInfo)(sourceFile.fileName, criteria);
            const params = {
                ...updateResultCommonParams,
                currentModule,
                statements: sourceFile.statements,
            };
            updateFn(params, collectionResult);
            // handle `import * as module` usage if it's used as whole module
            if (currentModule.type === 1 /* ShouldBeImported */ && updateResultCommonParams.isStatementUsed(sourceFile)) {
                updateImportsForStatement(sourceFile, params, collectionResult);
            }
            if (collectionResult.statements.length === prevStatementsCount) {
                (0, logger_1.verboseLog)(`No output for file: ${sourceFile.fileName}`);
            }
        }
        if (entry.failOnClass) {
            const classes = collectionResult.statements.filter(ts.isClassDeclaration);
            if (classes.length !== 0) {
                const classesNames = classes.map((c) => c.name === undefined ? 'anonymous class' : c.name.text);
                throw new Error(`${classes.length} class statement(s) are found in generated dts: ${classesNames.join(', ')}`);
            }
        }
        // by default this option should be enabled
        const exportReferencedTypes = outputOptions.exportReferencedTypes !== false;
        return (0, generate_output_1.generateOutput)({
            ...collectionResult,
            needStripDefaultKeywordForStatement: (statement) => {
                const statementExports = (0, typescript_1.getExportsForStatement)(rootFileExports, typeChecker, statement);
                // if true - no direct export was found
                // that means that node might have an export keyword (like interface, type, etc)
                // otherwise, if there are only re-exports with renaming (like export { foo as bar })
                // we don't need to put export keyword for this statement
                // because we'll re-export it in the way
                return statementExports.find((exp) => exp.exportedName === 'default') === undefined;
            },
            shouldStatementHasExportKeyword: (statement) => {
                const statementExports = (0, typescript_1.getExportsForStatement)(rootFileExports, typeChecker, statement);
                // if true - no direct export was found
                // that means that node might have an export keyword (like interface, type, etc)
                // otherwise, if there are only re-exports with renaming (like export { foo as bar })
                // we don't need to put export keyword for this statement
                // because we'll re-export it in the way
                const hasStatementedDefaultKeyword = (0, typescript_1.hasNodeModifier)(statement, ts.SyntaxKind.DefaultKeyword);
                let result = statementExports.length === 0 || statementExports.find((exp) => {
                    // "directly" means "without renaming" or "without additional node/statement"
                    // for instance, `class A {} export default A;` - here `statement` is `class A {}`
                    // it's default exported by `export default A;`, but class' statement itself doesn't have `export` keyword
                    // so we shouldn't add this either
                    const shouldBeDefaultExportedDirectly = exp.exportedName === 'default' && hasStatementedDefaultKeyword;
                    return shouldBeDefaultExportedDirectly || exp.exportedName === exp.originalName;
                }) !== undefined;
                // "direct export" means export from the root source file
                // e.g. classes/functions/etc must be exported from the root source file to have an "export" keyword
                // by default interfaces/types are exported even if they aren't directly exported (e.g. when they are referenced by other types)
                // but if `exportReferencedTypes` option is disabled we have to check direct export for them either
                const onlyDirectlyExportedShouldBeExported = !exportReferencedTypes
                    || ts.isClassDeclaration(statement)
                    || (ts.isEnumDeclaration(statement) && !(0, typescript_1.hasNodeModifier)(statement, ts.SyntaxKind.ConstKeyword))
                    || ts.isFunctionDeclaration(statement)
                    || ts.isVariableStatement(statement);
                if (onlyDirectlyExportedShouldBeExported) {
                    // "valuable" statements must be re-exported from root source file
                    // to having export keyword in declaration file
                    result = result && statementExports.length !== 0;
                }
                else if ((0, typescript_1.isAmbientModule)(statement) || ts.isExportDeclaration(statement)) {
                    result = false;
                }
                return result;
            },
            needStripConstFromConstEnum: (constEnum) => {
                if (!program.getCompilerOptions().preserveConstEnums || !outputOptions.respectPreserveConstEnum) {
                    return false;
                }
                const enumSymbol = getNodeSymbol(constEnum, typeChecker);
                if (enumSymbol === null) {
                    return false;
                }
                return rootFileExportSymbols.includes(enumSymbol);
            },
            needStripImportFromImportTypeNode: (node) => {
                if (node.qualifier === undefined) {
                    return false;
                }
                if (!ts.isLiteralTypeNode(node.argument) || !ts.isStringLiteral(node.argument.literal)) {
                    return false;
                }
                // we don't need to specify exact file here since we need to figure out whether a file is external or internal one
                const moduleFileName = resolveModuleFileName(rootSourceFile.fileName, node.argument.literal.text);
                return !(0, module_info_1.getModuleInfo)(moduleFileName, criteria).isExternal;
            },
        }, {
            sortStatements: outputOptions.sortNodes,
            umdModuleName: outputOptions.umdModuleName,
            noBanner: outputOptions.noBanner,
        });
    });
}
exports.generateDtsBundle = generateDtsBundle;
const skippedNodes = [
    ts.SyntaxKind.ExportDeclaration,
    ts.SyntaxKind.ImportDeclaration,
    ts.SyntaxKind.ImportEqualsDeclaration,
];
// eslint-disable-next-line complexity
function updateResult(params, result) {
    for (const statement of params.statements) {
        // we should skip import and exports statements
        if (skippedNodes.indexOf(statement.kind) !== -1) {
            continue;
        }
        if ((0, typescript_1.isDeclareModule)(statement)) {
            updateResultForModuleDeclaration(statement, params, result);
            continue;
        }
        if (params.currentModule.type === 3 /* ShouldBeUsedForModulesOnly */) {
            continue;
        }
        if ((0, typescript_1.isDeclareGlobalStatement)(statement) && params.shouldDeclareGlobalBeInlined(params.currentModule, statement)) {
            result.statements.push(statement);
            continue;
        }
        if (ts.isExportAssignment(statement) && statement.isExportEquals && params.currentModule.isExternal) {
            updateResultForExternalEqExportAssignment(statement, params, result);
            continue;
        }
        if (!params.isStatementUsed(statement)) {
            (0, logger_1.verboseLog)(`Skip file member: ${statement.getText().replace(/(\n|\r)/g, '').slice(0, 50)}...`);
            continue;
        }
        switch (params.currentModule.type) {
            case 2 /* ShouldBeReferencedAsTypes */:
                addTypesReference(params.currentModule.typesLibraryName, result.typesReferences);
                break;
            case 1 /* ShouldBeImported */:
                updateImportsForStatement(statement, params, result);
                break;
            case 0 /* ShouldBeInlined */:
                result.statements.push(statement);
                break;
        }
    }
}
// eslint-disable-next-line complexity
function updateResultForRootSourceFile(params, result) {
    function isReExportFromImportableModule(statement) {
        if (!ts.isExportDeclaration(statement) || statement.moduleSpecifier === undefined || !ts.isStringLiteral(statement.moduleSpecifier)) {
            return false;
        }
        const moduleFileName = resolveModuleFileName(statement.getSourceFile().fileName, statement.moduleSpecifier.text);
        return params.getModuleInfo(moduleFileName).type === 1 /* ShouldBeImported */;
    }
    updateResult(params, result);
    // add skipped by `updateResult` exports
    for (const statement of params.statements) {
        // "export default" or "export ="
        const isExportAssignment = ts.isExportAssignment(statement);
        const isReExportFromImportable = isReExportFromImportableModule(statement);
        if (isExportAssignment || isReExportFromImportable) {
            result.statements.push(statement);
        }
        // export { foo, bar, baz as fooBar }
        if (ts.isExportDeclaration(statement) && statement.exportClause !== undefined && ts.isNamedExports(statement.exportClause)) {
            for (const exportItem of statement.exportClause.elements) {
                if (exportItem.name.getText() === 'default' && exportItem.propertyName === undefined) {
                    // export { default }
                    // return export { /get name of exportItem.name's symbol node/ as default };
                    // it seems unnecessary?
                    continue;
                }
                // export { default as name }
                if (exportItem.propertyName !== undefined && exportItem.propertyName.getText() === 'default') {
                    const resolvedIdentifier = params.resolveIdentifier(exportItem.propertyName);
                    const resolvedIdentifierText = (resolvedIdentifier === null || resolvedIdentifier === void 0 ? void 0 : resolvedIdentifier.getText()) || '';
                    const exportItemNameText = exportItem.name.getText();
                    // in case of re-export with the original name (e.g. through another module)
                    // we don't need to put that re-export to avoid duplicated identifiers error
                    if (resolvedIdentifierText !== exportItemNameText) {
                        result.renamedExports.push(`${resolvedIdentifierText} as ${exportItemNameText}`);
                    }
                    continue;
                }
                // export { baz as propertyName }
                if (exportItem.propertyName !== undefined) {
                    result.renamedExports.push(exportItem.getText());
                    continue;
                }
                // export { name }
                const resolvedIdentifier = params.resolveIdentifier(exportItem.name);
                if ((resolvedIdentifier === null || resolvedIdentifier === void 0 ? void 0 : resolvedIdentifier.getText()) !== exportItem.name.getText()) {
                    // exported "name" is different from "original" name
                    result.renamedExports.push(`${(resolvedIdentifier === null || resolvedIdentifier === void 0 ? void 0 : resolvedIdentifier.getText()) || ''} as ${exportItem.name.getText()}`);
                }
            }
        }
    }
}
function updateResultForExternalEqExportAssignment(exportAssignment, params, result) {
    const moduleDeclarations = params.getDeclarationsForExportedAssignment(exportAssignment)
        .filter(typescript_1.isNamespaceStatement)
        .filter((s) => s.getSourceFile() === exportAssignment.getSourceFile());
    // if we have `export =` somewhere so we can decide that every declaration of exported symbol in this way
    // is "part of the exported module" and we need to update result according every member of each declaration
    // but treat they as current module (we do not need to update module info)
    for (const moduleDeclaration of moduleDeclarations) {
        if (moduleDeclaration.body === undefined || !ts.isModuleBlock(moduleDeclaration.body)) {
            continue;
        }
        updateResult({
            ...params,
            statements: moduleDeclaration.body.statements,
        }, result);
    }
}
function updateResultForModuleDeclaration(moduleDecl, params, result) {
    if (moduleDecl.body === undefined || !ts.isModuleBlock(moduleDecl.body)) {
        return;
    }
    const moduleName = moduleDecl.name.text;
    const moduleFileName = resolveModuleFileName(params.currentModule.fileName, moduleName);
    const moduleInfo = params.getModuleInfo(moduleFileName);
    // if we have declaration of external module inside internal one
    if (!params.currentModule.isExternal && moduleInfo.isExternal) {
        // if it's allowed - we need to just add it to result without any processing
        if (params.shouldDeclareExternalModuleBeInlined()) {
            result.statements.push(moduleDecl);
        }
        return;
    }
    updateResult({
        ...params,
        currentModule: moduleInfo,
        statements: moduleDecl.body.statements,
    }, result);
}
function resolveModuleFileName(currentFileName, moduleName) {
    return moduleName.startsWith('.') ? (0, fix_path_1.fixPath)(path.join(currentFileName, '..', moduleName)) : `node_modules/${moduleName}/`;
}
function addTypesReference(library, typesReferences) {
    if (!typesReferences.has(library)) {
        (0, logger_1.normalLog)(`Library "${library}" will be added via reference directive`);
        typesReferences.add(library);
    }
}
function updateImportsForStatement(statement, params, result) {
    if (params.currentModule.type !== 1 /* ShouldBeImported */) {
        return;
    }
    const statementsToImport = ts.isVariableStatement(statement) ? statement.declarationList.declarations : [statement];
    for (const statementToImport of statementsToImport) {
        if (params.shouldStatementBeImported(statementToImport)) {
            addImport(statementToImport, params, result.imports);
            // if we're going to add import of any statement in the bundle
            // we should check whether the library of that statement
            // could be referenced via triple-slash reference-types directive
            // because the project which will use bundled declaration file
            // can have `types: []` in the tsconfig and it'll fail
            // this is especially related to the types packages
            // which declares different modules in their declarations
            // e.g. @types/node has declaration for "packages" events, fs, path and so on
            const sourceFile = statementToImport.getSourceFile();
            const moduleInfo = params.getModuleInfo(sourceFile.fileName);
            if (moduleInfo.type === 2 /* ShouldBeReferencedAsTypes */) {
                addTypesReference(moduleInfo.typesLibraryName, result.typesReferences);
            }
        }
    }
}
function getDeclarationUsagesSourceFiles(declaration, rootFileExports, typesUsageEvaluator, typeChecker) {
    return new Set(getExportedSymbolsUsingStatement(declaration, rootFileExports, typesUsageEvaluator, typeChecker)
        .map((symbol) => (0, typescript_1.getDeclarationsForSymbol)(symbol))
        .reduce((acc, val) => acc.concat(val), [])
        .map((decl) => decl.getSourceFile()));
}
function getImportModuleName(imp) {
    if (ts.isImportDeclaration(imp)) {
        const importClause = imp.importClause;
        if (importClause === undefined) {
            return null;
        }
        return imp.moduleSpecifier.text;
    }
    if (ts.isExternalModuleReference(imp.moduleReference)) {
        if (!ts.isStringLiteral(imp.moduleReference.expression)) {
            (0, logger_1.warnLog)(`Cannot handle non string-literal-like import expression: ${imp.moduleReference.expression.getText()}`);
            return null;
        }
        return imp.moduleReference.expression.text;
    }
    return null;
}
function addImport(statement, params, imports) {
    if (statement.name === undefined) {
        throw new Error(`Import/usage unnamed declaration: ${statement.getText()}`);
    }
    params.getDeclarationUsagesSourceFiles(statement).forEach((sourceFile) => {
        sourceFile.statements.forEach((st) => {
            if (!ts.isImportEqualsDeclaration(st) && !ts.isImportDeclaration(st)) {
                return;
            }
            const importModuleSpecifier = getImportModuleName(st);
            if (importModuleSpecifier === null) {
                return;
            }
            let importItem = imports.get(importModuleSpecifier);
            if (importItem === undefined) {
                importItem = {
                    defaultImports: new Set(),
                    namedImports: new Set(),
                    starImports: new Set(),
                    requireImports: new Set(),
                };
                imports.set(importModuleSpecifier, importItem);
            }
            if (ts.isImportEqualsDeclaration(st)) {
                if (params.areDeclarationSame(statement, st)) {
                    importItem.requireImports.add(st.name.text);
                }
                return;
            }
            const importClause = st.importClause;
            if (importClause.name !== undefined && params.areDeclarationSame(statement, importClause)) {
                // import name from 'module';
                importItem.defaultImports.add(importClause.name.text);
            }
            if (importClause.namedBindings !== undefined) {
                if (ts.isNamedImports(importClause.namedBindings)) {
                    // import { El1, El2 } from 'module';
                    importClause.namedBindings.elements
                        .filter(params.areDeclarationSame.bind(params, statement))
                        .forEach((specifier) => importItem.namedImports.add(specifier.getText()));
                }
                else {
                    // import * as name from 'module';
                    importItem.starImports.add(importClause.namedBindings.name.getText());
                }
            }
        });
    });
}
function getRootSourceFile(program, rootFileName) {
    if (program.getRootFileNames().indexOf(rootFileName) === -1) {
        throw new Error(`There is no such root file ${rootFileName}`);
    }
    const sourceFile = program.getSourceFile(rootFileName);
    if (sourceFile === undefined) {
        throw new Error(`Cannot get source file for root file ${rootFileName}`);
    }
    return sourceFile;
}
function isNodeUsed(node, rootFileExports, typesUsageEvaluator, typeChecker) {
    if ((0, typescript_1.isNodeNamedDeclaration)(node)) {
        const nodeSymbol = getNodeSymbol(node, typeChecker);
        if (nodeSymbol === null) {
            return false;
        }
        return rootFileExports.some((rootExport) => typesUsageEvaluator.isSymbolUsedBySymbol(nodeSymbol, rootExport));
    }
    else if (ts.isVariableStatement(node)) {
        return node.declarationList.declarations.some((declaration) => {
            return isNodeUsed(declaration, rootFileExports, typesUsageEvaluator, typeChecker);
        });
    }
    return false;
}
function shouldNodeBeImported(node, rootFileExports, typesUsageEvaluator, typeChecker, isDefaultLibrary) {
    const nodeSymbol = getNodeSymbol(node, typeChecker);
    if (nodeSymbol === null) {
        return false;
    }
    const symbolDeclarations = (0, typescript_1.getDeclarationsForSymbol)(nodeSymbol);
    const isSymbolDeclaredInDefaultLibrary = symbolDeclarations.some((declaration) => isDefaultLibrary(declaration.getSourceFile()));
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
    return getExportedSymbolsUsingStatement(node, rootFileExports, typesUsageEvaluator, typeChecker).length !== 0;
}
function getExportedSymbolsUsingStatement(node, rootFileExports, typesUsageEvaluator, typeChecker) {
    const nodeSymbol = getNodeSymbol(node, typeChecker);
    if (nodeSymbol === null) {
        return [];
    }
    const symbolsUsingNode = typesUsageEvaluator.getSymbolsUsingSymbol(nodeSymbol);
    if (symbolsUsingNode === null) {
        throw new Error('Something went wrong - value cannot be null');
    }
    // we should import only symbols which are used in types directly
    return Array.from(symbolsUsingNode).filter((symbol) => {
        const symbolsDeclarations = (0, typescript_1.getDeclarationsForSymbol)(symbol);
        if (symbolsDeclarations.length === 0 || symbolsDeclarations.every(typescript_1.isDeclarationFromExternalModule)) {
            return false;
        }
        return rootFileExports.some((rootSymbol) => typesUsageEvaluator.isSymbolUsedBySymbol(symbol, rootSymbol));
    });
}
function getNodeSymbol(node, typeChecker) {
    const nodeName = node.name;
    if (nodeName === undefined) {
        return null;
    }
    return (0, typescript_1.getDeclarationNameSymbol)(nodeName, typeChecker);
}
//# sourceMappingURL=bundle-generator.js.map