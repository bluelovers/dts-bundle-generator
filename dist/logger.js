"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enableNormalLog = exports.enableVerbose = exports.errorLog = exports.warnLog = exports.normalLog = exports.verboseLog = void 0;
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["Verbose"] = 0] = "Verbose";
    LogLevel[LogLevel["Normal"] = 1] = "Normal";
    LogLevel[LogLevel["Warning"] = 2] = "Warning";
    LogLevel[LogLevel["Error"] = 3] = "Error";
})(LogLevel || (LogLevel = {}));
function verboseLog(message) {
    logMessage(message, 0 /* Verbose */);
}
exports.verboseLog = verboseLog;
function normalLog(message) {
    logMessage(message, 1 /* Normal */);
}
exports.normalLog = normalLog;
function warnLog(message) {
    logMessage(message, 2 /* Warning */);
}
exports.warnLog = warnLog;
function errorLog(message) {
    logMessage(message, 3 /* Error */);
}
exports.errorLog = errorLog;
let currentLogLevel = 3 /* Error */;
function enableVerbose() {
    currentLogLevel = 0 /* Verbose */;
    normalLog('Verbose log enabled');
}
exports.enableVerbose = enableVerbose;
function enableNormalLog() {
    currentLogLevel = 1 /* Normal */;
}
exports.enableNormalLog = enableNormalLog;
function logMessage(message, level = 0 /* Verbose */) {
    if (level < currentLogLevel) {
        return;
    }
    switch (level) {
        case 3 /* Error */:
            // print red
            // eslint-disable-next-line no-console
            console.error(`\x1b[0;31m${message}\x1b[0m`);
            break;
        case 2 /* Warning */:
            // eslint-disable-next-line no-console
            console.warn(`\x1b[1;33m${message}\x1b[0m`);
            break;
        case 1 /* Normal */:
        case 0 /* Verbose */:
            // eslint-disable-next-line no-console
            console.log(message);
    }
}
//# sourceMappingURL=logger.js.map