export declare const enum ModuleType {
    ShouldBeInlined = 0,
    ShouldBeImported = 1,
    ShouldBeReferencedAsTypes = 2,
    ShouldBeUsedForModulesOnly = 3
}
export interface UsedModuleInfoCommon {
    fileName: string;
    isExternal: boolean;
}
export interface InlinedModuleInfo extends UsedModuleInfoCommon {
    type: ModuleType.ShouldBeInlined;
}
export interface ImportedModuleInfo extends UsedModuleInfoCommon {
    type: ModuleType.ShouldBeImported;
    isExternal: true;
}
export interface ReferencedModuleInfo extends UsedModuleInfoCommon {
    type: ModuleType.ShouldBeReferencedAsTypes;
    typesLibraryName: string;
    isExternal: true;
}
export interface UsedForModulesModuleInfo extends UsedModuleInfoCommon {
    type: ModuleType.ShouldBeUsedForModulesOnly;
    isExternal: true;
}
export declare type ModuleInfo = InlinedModuleInfo | ImportedModuleInfo | ReferencedModuleInfo | UsedForModulesModuleInfo;
export interface ModuleCriteria {
    inlinedLibraries: string[];
    importedLibraries: string[] | undefined;
    allowedTypesLibraries: string[] | undefined;
    typeRoots?: string[];
}
export declare function getModuleInfo(fileName: string, criteria: ModuleCriteria): ModuleInfo;
