import * as ts from 'typescript';
export declare type NodesParents = Map<ts.Symbol, Set<ts.Symbol>>;
export declare class TypesUsageEvaluator {
    private readonly typeChecker;
    private readonly nodesParentsMap;
    constructor(files: ts.SourceFile[], typeChecker: ts.TypeChecker);
    isSymbolUsedBySymbol(symbol: ts.Symbol, by: ts.Symbol): boolean;
    getSymbolsUsingSymbol(symbol: ts.Symbol): Set<ts.Symbol> | null;
    private isSymbolUsedBySymbolImpl;
    private computeUsages;
    private computeUsageForNode;
    private computeUsagesRecursively;
    private getSymbol;
    private getActualSymbol;
}
