"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypesUsageEvaluator = void 0;
const ts = require("typescript");
const typescript_1 = require("./helpers/typescript");
class TypesUsageEvaluator {
    constructor(files, typeChecker) {
        this.nodesParentsMap = new Map();
        this.typeChecker = typeChecker;
        this.computeUsages(files);
    }
    isSymbolUsedBySymbol(symbol, by) {
        return this.isSymbolUsedBySymbolImpl(this.getActualSymbol(symbol), this.getActualSymbol(by), new Set());
    }
    getSymbolsUsingSymbol(symbol) {
        return this.nodesParentsMap.get(this.getActualSymbol(symbol)) || null;
    }
    isSymbolUsedBySymbolImpl(fromSymbol, toSymbol, visitedSymbols) {
        if (fromSymbol === toSymbol) {
            return true;
        }
        const reachableNodes = this.nodesParentsMap.get(fromSymbol);
        if (reachableNodes !== undefined) {
            for (const symbol of Array.from(reachableNodes)) {
                if (visitedSymbols.has(symbol)) {
                    continue;
                }
                visitedSymbols.add(symbol);
                if (this.isSymbolUsedBySymbolImpl(symbol, toSymbol, visitedSymbols)) {
                    return true;
                }
            }
        }
        visitedSymbols.add(fromSymbol);
        return false;
    }
    computeUsages(files) {
        this.nodesParentsMap.clear();
        for (const file of files) {
            ts.forEachChild(file, this.computeUsageForNode.bind(this));
        }
    }
    computeUsageForNode(node) {
        if ((0, typescript_1.isDeclareModule)(node) && node.body !== undefined && ts.isModuleBlock(node.body)) {
            for (const statement of node.body.statements) {
                this.computeUsageForNode(statement);
            }
        }
        else if ((0, typescript_1.isNodeNamedDeclaration)(node) && node.name) {
            const childSymbol = this.getSymbol(node.name);
            this.computeUsagesRecursively(node, childSymbol);
        }
        else if (ts.isVariableStatement(node)) {
            for (const varDeclaration of node.declarationList.declarations) {
                this.computeUsageForNode(varDeclaration);
            }
        }
    }
    computeUsagesRecursively(parent, parentSymbol) {
        const queue = parent.getChildren();
        for (const child of queue) {
            if (child.kind === ts.SyntaxKind.JSDocComment) {
                continue;
            }
            queue.push(...child.getChildren());
            if (ts.isIdentifier(child)) {
                // identifiers in labelled tuples don't have symbols for their labels
                // so let's just skip them from collecting
                // since this feature is for TypeScript > 4, we have to check that a function exist before accessing it
                if ((0, typescript_1.isNamedTupleMember)(child.parent) && child.parent.name === child) {
                    continue;
                }
                const childSymbols = (0, typescript_1.splitTransientSymbol)(this.getSymbol(child), this.typeChecker);
                for (const childSymbol of childSymbols) {
                    let symbols = this.nodesParentsMap.get(childSymbol);
                    if (symbols === undefined) {
                        symbols = new Set();
                        this.nodesParentsMap.set(childSymbol, symbols);
                    }
                    // to avoid infinite recursion
                    if (childSymbol !== parentSymbol) {
                        symbols.add(parentSymbol);
                    }
                }
            }
        }
    }
    getSymbol(node) {
        const nodeSymbol = this.typeChecker.getSymbolAtLocation(node);
        if (nodeSymbol === undefined) {
            throw new Error(`Cannot find symbol for node: ${node.getText()}`);
        }
        return this.getActualSymbol(nodeSymbol);
    }
    getActualSymbol(symbol) {
        return (0, typescript_1.getActualSymbol)(symbol, this.typeChecker);
    }
}
exports.TypesUsageEvaluator = TypesUsageEvaluator;
//# sourceMappingURL=types-usage-evaluator.js.map