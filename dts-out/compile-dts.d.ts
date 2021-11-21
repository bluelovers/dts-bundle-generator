import * as ts from 'typescript';
export interface CompileDtsResult {
    program: ts.Program;
    rootFilesRemapping: Map<string, string>;
}
export declare function compileDts(rootFiles: readonly string[], preferredConfigPath?: string, followSymlinks?: boolean): CompileDtsResult;
