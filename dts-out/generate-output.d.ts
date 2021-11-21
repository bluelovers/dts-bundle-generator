import * as ts from 'typescript';
export interface ModuleImportsSet {
    defaultImports: Set<string>;
    starImports: Set<string>;
    namedImports: Set<string>;
    requireImports: Set<string>;
}
export interface OutputParams extends OutputHelpers {
    typesReferences: Set<string>;
    imports: Map<string, ModuleImportsSet>;
    statements: readonly ts.Statement[];
    renamedExports: string[];
}
export interface OutputHelpers {
    shouldStatementHasExportKeyword(statement: ts.Statement): boolean;
    needStripDefaultKeywordForStatement(statement: ts.Statement): boolean;
    needStripConstFromConstEnum(constEnum: ts.EnumDeclaration): boolean;
    needStripImportFromImportTypeNode(importType: ts.ImportTypeNode): boolean;
}
export interface OutputOptions {
    umdModuleName?: string;
    sortStatements?: boolean;
    noBanner?: boolean;
}
export declare function generateOutput(params: OutputParams, options?: OutputOptions): string;
