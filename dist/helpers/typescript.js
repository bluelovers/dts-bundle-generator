"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNamedTupleMember = exports.getExportsForStatement = exports.resolveIdentifier = exports.getExportsForSourceFile = exports.ExportType = exports.getDeclarationsForSymbol = exports.isNamespaceStatement = exports.isDeclareGlobalStatement = exports.isDeclareModule = exports.isAmbientModule = exports.splitTransientSymbol = exports.getDeclarationNameSymbol = exports.getActualSymbol = exports.getNodeName = exports.hasNodeModifier = exports.isNodeNamedDeclaration = void 0;
const ts = require("typescript");
const namedDeclarationKinds = [
    ts.SyntaxKind.InterfaceDeclaration,
    ts.SyntaxKind.ClassDeclaration,
    ts.SyntaxKind.EnumDeclaration,
    ts.SyntaxKind.TypeAliasDeclaration,
    ts.SyntaxKind.ModuleDeclaration,
    ts.SyntaxKind.FunctionDeclaration,
    ts.SyntaxKind.VariableDeclaration,
    ts.SyntaxKind.PropertySignature,
];
function isNodeNamedDeclaration(node) {
    return namedDeclarationKinds.indexOf(node.kind) !== -1;
}
exports.isNodeNamedDeclaration = isNodeNamedDeclaration;
function hasNodeModifier(node, modifier) {
    return Boolean(node.modifiers && node.modifiers.some((nodeModifier) => nodeModifier.kind === modifier));
}
exports.hasNodeModifier = hasNodeModifier;
function getNodeName(node) {
    var _a;
    const nodeName = node.name;
    if (nodeName === undefined) {
        const defaultModifier = (_a = node.modifiers) === null || _a === void 0 ? void 0 : _a.find((mod) => mod.kind === ts.SyntaxKind.DefaultKeyword);
        if (defaultModifier !== undefined) {
            return defaultModifier;
        }
    }
    return nodeName;
}
exports.getNodeName = getNodeName;
function getActualSymbol(symbol, typeChecker) {
    if (symbol.flags & ts.SymbolFlags.Alias) {
        symbol = typeChecker.getAliasedSymbol(symbol);
    }
    return symbol;
}
exports.getActualSymbol = getActualSymbol;
function getDeclarationNameSymbol(name, typeChecker) {
    const symbol = typeChecker.getSymbolAtLocation(name);
    if (symbol === undefined) {
        return null;
    }
    return getActualSymbol(symbol, typeChecker);
}
exports.getDeclarationNameSymbol = getDeclarationNameSymbol;
function splitTransientSymbol(symbol, typeChecker) {
    // actually I think we even don't need to operate/use "Transient" symbols anywhere
    // it's kind of aliased symbol, but just merged
    // but it's hard to refractor everything to use array of symbols instead of just symbol
    // so let's fix it for some places
    if ((symbol.flags & ts.SymbolFlags.Transient) === 0) {
        return [symbol];
    }
    // "Transient" symbol is kinda "merged" symbol
    // I don't really know is this way to "split" is correct
    // but it seems that it works for now ¯\_(ツ)_/¯
    const declarations = getDeclarationsForSymbol(symbol);
    const result = [];
    for (const declaration of declarations) {
        if (!isNodeNamedDeclaration(declaration) || declaration.name === undefined) {
            continue;
        }
        const sym = typeChecker.getSymbolAtLocation(declaration.name);
        if (sym === undefined) {
            continue;
        }
        result.push(getActualSymbol(sym, typeChecker));
    }
    return result;
}
exports.splitTransientSymbol = splitTransientSymbol;
/**
 * @see https://github.com/Microsoft/TypeScript/blob/f7c4fefeb62416c311077a699cc15beb211c25c9/src/compiler/utilities.ts#L626-L628
 */
function isGlobalScopeAugmentation(module) {
    return Boolean(module.flags & ts.NodeFlags.GlobalAugmentation);
}
/**
 * Returns whether node is ambient module declaration (declare module "name" or declare global)
 * @see https://github.com/Microsoft/TypeScript/blob/f7c4fefeb62416c311077a699cc15beb211c25c9/src/compiler/utilities.ts#L588-L590
 */
function isAmbientModule(node) {
    return ts.isModuleDeclaration(node) && (node.name.kind === ts.SyntaxKind.StringLiteral || isGlobalScopeAugmentation(node));
}
exports.isAmbientModule = isAmbientModule;
/**
 * Returns whether node is `declare module` ModuleDeclaration (not `declare global` or `namespace`)
 */
function isDeclareModule(node) {
    // `declare module ""`, `declare global` and `namespace {}` are ModuleDeclaration
    // but here we need to check only `declare module` statements
    return ts.isModuleDeclaration(node) && !(node.flags & ts.NodeFlags.Namespace) && !isGlobalScopeAugmentation(node);
}
exports.isDeclareModule = isDeclareModule;
/**
 * Returns whether statement is `declare global` ModuleDeclaration
 */
function isDeclareGlobalStatement(statement) {
    return ts.isModuleDeclaration(statement) && isGlobalScopeAugmentation(statement);
}
exports.isDeclareGlobalStatement = isDeclareGlobalStatement;
/**
 * Returns whether node is `namespace` ModuleDeclaration
 */
function isNamespaceStatement(node) {
    return ts.isModuleDeclaration(node) && Boolean(node.flags & ts.NodeFlags.Namespace);
}
exports.isNamespaceStatement = isNamespaceStatement;
function getDeclarationsForSymbol(symbol) {
    const result = [];
    // Disabling tslint is for backward compat with TypeScript < 3
    // tslint:disable-next-line:strict-type-predicates
    if (symbol.declarations !== undefined) {
        result.push(...symbol.declarations);
    }
    // Disabling tslint is for backward compat with TypeScript < 3
    // tslint:disable-next-line:strict-type-predicates
    if (symbol.valueDeclaration !== undefined) {
        // push valueDeclaration might be already in declarations array
        // so let's check first to avoid duplication nodes
        if (!result.includes(symbol.valueDeclaration)) {
            result.push(symbol.valueDeclaration);
        }
    }
    return result;
}
exports.getDeclarationsForSymbol = getDeclarationsForSymbol;
var ExportType;
(function (ExportType) {
    ExportType[ExportType["CommonJS"] = 0] = "CommonJS";
    ExportType[ExportType["ES6Named"] = 1] = "ES6Named";
    ExportType[ExportType["ES6Default"] = 2] = "ES6Default";
})(ExportType = exports.ExportType || (exports.ExportType = {}));
function getExportsForSourceFile(typeChecker, sourceFileSymbol) {
    if (sourceFileSymbol.exports !== undefined) {
        const commonJsExport = sourceFileSymbol.exports.get(ts.InternalSymbolName.ExportEquals);
        if (commonJsExport !== undefined) {
            const symbol = getActualSymbol(commonJsExport, typeChecker);
            return [
                {
                    symbol,
                    type: 0 /* ExportType.CommonJS */,
                    exportedName: '',
                    originalName: symbol.escapedName,
                },
            ];
        }
    }
    const result = typeChecker
        .getExportsOfModule(sourceFileSymbol)
        .map((symbol) => ({ symbol, exportedName: symbol.escapedName, type: 1 /* ExportType.ES6Named */, originalName: '' }));
    if (sourceFileSymbol.exports !== undefined) {
        const defaultExportSymbol = sourceFileSymbol.exports.get(ts.InternalSymbolName.Default);
        if (defaultExportSymbol !== undefined) {
            const defaultExport = result.find((exp) => exp.symbol === defaultExportSymbol);
            if (defaultExport !== undefined) {
                defaultExport.type = 2 /* ExportType.ES6Default */;
            }
            else {
                // it seems that default export is always returned by getExportsOfModule
                // but let's add it to be sure add if there is no such export
                result.push({
                    symbol: defaultExportSymbol,
                    type: 2 /* ExportType.ES6Default */,
                    exportedName: 'default',
                    originalName: '',
                });
            }
        }
    }
    result.forEach((exp) => {
        exp.symbol = getActualSymbol(exp.symbol, typeChecker);
        const resolvedIdentifier = resolveIdentifierBySymbol(exp.symbol);
        exp.originalName = resolvedIdentifier !== undefined ? resolvedIdentifier.getText() : exp.symbol.escapedName;
    });
    return result;
}
exports.getExportsForSourceFile = getExportsForSourceFile;
function resolveIdentifier(typeChecker, identifier) {
    const symbol = getDeclarationNameSymbol(identifier, typeChecker);
    if (symbol === null) {
        return undefined;
    }
    return resolveIdentifierBySymbol(symbol);
}
exports.resolveIdentifier = resolveIdentifier;
function resolveIdentifierBySymbol(identifierSymbol) {
    const declarations = getDeclarationsForSymbol(identifierSymbol);
    if (declarations.length === 0) {
        return undefined;
    }
    const decl = declarations[0];
    if (!isNodeNamedDeclaration(decl)) {
        return undefined;
    }
    return decl.name;
}
function getExportsForStatement(exportedSymbols, typeChecker, statement) {
    if (ts.isVariableStatement(statement)) {
        if (statement.declarationList.declarations.length === 0) {
            return [];
        }
        const firstDeclarationExports = getExportsForName(exportedSymbols, typeChecker, statement.declarationList.declarations[0].name);
        const allDeclarationsHaveSameExportType = statement.declarationList.declarations.every((variableDecl) => {
            var _a, _b;
            // all declaration should have the same export type
            // TODO: for now it's not supported to have different type of exports
            return ((_a = getExportsForName(exportedSymbols, typeChecker, variableDecl.name)[0]) === null || _a === void 0 ? void 0 : _a.type) === ((_b = firstDeclarationExports[0]) === null || _b === void 0 ? void 0 : _b.type);
        });
        if (!allDeclarationsHaveSameExportType) {
            // log warn?
            return [];
        }
        return firstDeclarationExports;
    }
    const nodeName = getNodeName(statement);
    if (nodeName === undefined) {
        return [];
    }
    return getExportsForName(exportedSymbols, typeChecker, nodeName);
}
exports.getExportsForStatement = getExportsForStatement;
function getExportsForName(exportedSymbols, typeChecker, name) {
    if (ts.isArrayBindingPattern(name) || ts.isObjectBindingPattern(name)) {
        // TODO: binding patterns in variable declarations are not supported for now
        // see https://github.com/microsoft/TypeScript/issues/30598 also
        return [];
    }
    const declarationSymbol = typeChecker.getSymbolAtLocation(name);
    return exportedSymbols.filter((rootExport) => rootExport.symbol === declarationSymbol);
}
function isNamedTupleMember(node) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const compatTs = ts;
    if (!compatTs.isNamedTupleMember) {
        return false;
    }
    return compatTs.isNamedTupleMember(node);
}
exports.isNamedTupleMember = isNamedTupleMember;
//# sourceMappingURL=typescript.js.map