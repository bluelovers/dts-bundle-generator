"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompilerOptions = void 0;
const ts = require("typescript");
const path = require("path");
const get_absolute_path_1 = require("./helpers/get-absolute-path");
const fix_path_1 = require("./helpers/fix-path");
const check_diagnostics_errors_1 = require("./helpers/check-diagnostics-errors");
const logger_1 = require("./logger");
var Constants;
(function (Constants) {
    Constants[Constants["NoInputsWereFoundDiagnosticCode"] = 18003] = "NoInputsWereFoundDiagnosticCode";
})(Constants || (Constants = {}));
const parseConfigHost = {
    useCaseSensitiveFileNames: ts.sys.useCaseSensitiveFileNames,
    readDirectory: ts.sys.readDirectory,
    fileExists: ts.sys.fileExists,
    readFile: ts.sys.readFile,
};
function getCompilerOptions(inputFileNames, preferredConfigPath) {
    const configFileName = preferredConfigPath !== undefined ? preferredConfigPath : findConfig(inputFileNames);
    (0, logger_1.verboseLog)(`Using config: ${configFileName}`);
    const configParseResult = ts.readConfigFile(configFileName, ts.sys.readFile);
    (0, check_diagnostics_errors_1.checkDiagnosticsErrors)(configParseResult.error !== undefined ? [configParseResult.error] : [], 'Error while processing tsconfig file');
    const compilerOptionsParseResult = ts.parseJsonConfigFileContent(configParseResult.config, parseConfigHost, path.resolve(path.dirname(configFileName)), undefined, (0, get_absolute_path_1.getAbsolutePath)(configFileName));
    // we don't want to raise an error if no inputs found in a config file
    // because this error is mostly for CLI, but we'll pass an inputs in createProgram
    const diagnostics = compilerOptionsParseResult.errors
        .filter((d) => d.code !== 18003 /* NoInputsWereFoundDiagnosticCode */);
    (0, check_diagnostics_errors_1.checkDiagnosticsErrors)(diagnostics, 'Error while processing tsconfig compiler options');
    return compilerOptionsParseResult.options;
}
exports.getCompilerOptions = getCompilerOptions;
function findConfig(inputFiles) {
    if (inputFiles.length !== 1) {
        throw new Error('Cannot find tsconfig for multiple files. Please specify preferred tsconfig file');
    }
    const searchPath = (0, fix_path_1.fixPath)(path.resolve(inputFiles[0]));
    const configFileName = ts.findConfigFile(searchPath, ts.sys.fileExists);
    if (!configFileName) {
        throw new Error(`Cannot find config file for file ${searchPath}`);
    }
    return configFileName;
}
//# sourceMappingURL=get-compiler-options.js.map