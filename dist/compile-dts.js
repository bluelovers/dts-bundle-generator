"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileDts = void 0;
const path = require("path");
// @ts-ignore
const ts = require("typescript");
const logger_1 = require("./logger");
const get_compiler_options_1 = require("./get-compiler-options");
const get_absolute_path_1 = require("./helpers/get-absolute-path");
const check_diagnostics_errors_1 = require("./helpers/check-diagnostics-errors");
function compileDts(rootFiles, preferredConfigPath, followSymlinks = true) {
    const compilerOptions = (0, get_compiler_options_1.getCompilerOptions)(rootFiles, preferredConfigPath);
    // currently we don't support these compiler options
    // and removing them shouldn't affect generated code
    // so let's just remove them for this run
    compilerOptions.outDir = undefined;
    compilerOptions.incremental = undefined;
    compilerOptions.tsBuildInfoFile = undefined;
    compilerOptions.declarationDir = undefined;
    compilerOptions.removeComments = false;
    compilerOptions.emitDeclarationOnly = true;
    compilerOptions.declaration = true;
    compilerOptions.noEmit = false;
    if (compilerOptions.composite) {
        (0, logger_1.warnLog)(`Composite projects aren't supported at the time. Prefer to use non-composite project to generate declarations instead or just ignore this message if everything works fine. See https://github.com/timocov/dts-bundle-generator/issues/93`);
        compilerOptions.composite = undefined;
    }
    const dtsFiles = getDeclarationFiles(rootFiles, compilerOptions);
    (0, logger_1.verboseLog)(`dts cache:\n  ${Object.keys(dtsFiles).join('\n  ')}\n`);
    const host = ts.createCompilerHost(compilerOptions);
    if (!followSymlinks) {
        host.realpath = (p) => p;
    }
    host.resolveModuleNames = (moduleNames, containingFile) => {
        return moduleNames.map((moduleName) => {
            const resolvedModule = ts.resolveModuleName(moduleName, containingFile, compilerOptions, host).resolvedModule;
            if (resolvedModule && !resolvedModule.isExternalLibraryImport && resolvedModule.extension !== ts.Extension.Dts) {
                resolvedModule.extension = ts.Extension.Dts;
                (0, logger_1.verboseLog)(`Change module from .ts to .d.ts: ${resolvedModule.resolvedFileName}`);
                resolvedModule.resolvedFileName = changeExtensionToDts(resolvedModule.resolvedFileName);
            }
            return resolvedModule;
        });
    };
    const originalGetSourceFile = host.getSourceFile;
    host.getSourceFile = (fileName, languageVersion, onError) => {
        const absolutePath = (0, get_absolute_path_1.getAbsolutePath)(fileName);
        const storedValue = dtsFiles.get(absolutePath);
        if (storedValue !== undefined) {
            (0, logger_1.verboseLog)(`dts cache match: ${absolutePath}`);
            return ts.createSourceFile(fileName, storedValue, languageVersion);
        }
        (0, logger_1.verboseLog)(`dts cache mismatch: ${absolutePath} (${fileName})`);
        return originalGetSourceFile(fileName, languageVersion, onError);
    };
    const rootFilesRemapping = new Map();
    const inputFiles = rootFiles.map((rootFile) => {
        const rootDtsFile = changeExtensionToDts(rootFile);
        rootFilesRemapping.set(rootFile, rootDtsFile);
        return rootDtsFile;
    });
    const program = ts.createProgram(inputFiles, compilerOptions, host);
    (0, check_diagnostics_errors_1.checkProgramDiagnosticsErrors)(program);
    warnAboutTypeScriptFilesInProgram(program);
    return { program, rootFilesRemapping };
}
exports.compileDts = compileDts;
function changeExtensionToDts(fileName) {
    if (fileName.slice(-5) === '.d.ts') {
        return fileName;
    }
    // .ts, .tsx
    const ext = path.extname(fileName);
    return fileName.slice(0, -ext.length) + '.d.ts';
}
/**
 * @description Compiles source files into d.ts files and returns map of absolute path to file content
 */
function getDeclarationFiles(rootFiles, compilerOptions) {
    // we must pass `declaration: true` and `noEmit: false` if we want to generate declaration files
    // see https://github.com/microsoft/TypeScript/issues/24002#issuecomment-550549393
    compilerOptions = {
        ...compilerOptions,
        noEmit: false,
        declaration: true,
    };
    const program = ts.createProgram(rootFiles, compilerOptions);
    const allFilesAreDeclarations = program.getSourceFiles().every((s) => s.isDeclarationFile);
    const declarations = new Map();
    if (allFilesAreDeclarations) {
        // if all files are declarations we don't need to compile the project twice
        // so let's just return empty map to speed up
        (0, logger_1.verboseLog)('Skipping compiling the project to generate d.ts because all files in it are d.ts already');
        return declarations;
    }
    (0, check_diagnostics_errors_1.checkProgramDiagnosticsErrors)(program);
    const emitResult = program.emit(undefined, (fileName, data) => declarations.set((0, get_absolute_path_1.getAbsolutePath)(fileName), data), undefined, true);
    (0, check_diagnostics_errors_1.checkDiagnosticsErrors)(emitResult.diagnostics, 'Errors while emitting declarations');
    return declarations;
}
function warnAboutTypeScriptFilesInProgram(program) {
    const nonDeclarationFiles = program.getSourceFiles().filter((file) => !file.isDeclarationFile);
    if (nonDeclarationFiles.length !== 0) {
        (0, logger_1.warnLog)(`WARNING: It seems that some files in the compilation still are not declaration files.
For more information see https://github.com/timocov/dts-bundle-generator/issues/53.
If you think this is a mistake, feel free to open new issue or just ignore this warning.
  ${nonDeclarationFiles.map((file) => file.fileName).join('\n  ')}
`);
    }
}
//# sourceMappingURL=compile-dts.js.map