import * as ts from 'typescript';
export declare function checkProgramDiagnosticsErrors(program: ts.Program): void;
export declare function checkDiagnosticsErrors(diagnostics: readonly ts.Diagnostic[], failMessage: string): void;
