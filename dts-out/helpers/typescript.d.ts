import * as ts from 'typescript';
export declare function isNodeNamedDeclaration(node: ts.Node): node is ts.NamedDeclaration;
export declare function hasNodeModifier(node: ts.Node, modifier: ts.SyntaxKind): boolean;
export declare function getActualSymbol(symbol: ts.Symbol, typeChecker: ts.TypeChecker): ts.Symbol;
export declare function getDeclarationNameSymbol(name: ts.DeclarationName, typeChecker: ts.TypeChecker): ts.Symbol | null;
export declare function splitTransientSymbol(symbol: ts.Symbol, typeChecker: ts.TypeChecker): ts.Symbol[];
/**
 * Returns whether node is ambient module declaration (declare module "name" or declare global)
 * @see https://github.com/Microsoft/TypeScript/blob/f7c4fefeb62416c311077a699cc15beb211c25c9/src/compiler/utilities.ts#L588-L590
 */
export declare function isAmbientModule(node: ts.Node): boolean;
/**
 * Returns whether node is `declare module` ModuleDeclaration (not `declare global` or `namespace`)
 */
export declare function isDeclareModule(node: ts.Node): node is ts.ModuleDeclaration;
/**
 * Returns whether a node is `declare module` ModuleDeclaration with a relative path
 */
export declare function isRelativeDeclareModule(node: ts.Node): node is ts.ModuleDeclaration;
/**
 * Returns whether statement is `declare global` ModuleDeclaration
 */
export declare function isDeclareGlobalStatement(statement: ts.Statement): statement is ts.ModuleDeclaration;
/**
 * Returns whether node is `namespace` ModuleDeclaration
 */
export declare function isNamespaceStatement(node: ts.Node): node is ts.ModuleDeclaration;
export declare function getDeclarationsForSymbol(symbol: ts.Symbol): ts.Declaration[];
export declare function isDeclarationFromExternalModule(node: ts.Declaration): boolean;
export declare const enum ExportType {
    CommonJS = 0,
    ES6Named = 1,
    ES6Default = 2
}
export interface SourceFileExport {
    originalName: string;
    exportedName: string;
    symbol: ts.Symbol;
    type: ExportType;
}
export declare function getExportsForSourceFile(typeChecker: ts.TypeChecker, sourceFileSymbol: ts.Symbol): SourceFileExport[];
export declare function resolveIdentifier(typeChecker: ts.TypeChecker, identifier: ts.Identifier): ts.NamedDeclaration['name'];
export declare function getExportsForStatement(exportedSymbols: readonly SourceFileExport[], typeChecker: ts.TypeChecker, statement: ts.Statement): SourceFileExport[];
declare type NamedTupleMember = ts.NamedTupleMember;
declare type NamedTupleMemberCompat = unknown extends NamedTupleMember ? ts.Node & {
    name: ts.Identifier;
} : NamedTupleMember;
export declare function isNamedTupleMember(node: ts.Node): node is NamedTupleMemberCompat;
export {};
