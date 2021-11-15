"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerProvider = exports.useLogger = void 0;
const tslib_1 = require("tslib");
const logger_1 = require("@rhombus/logger");
const react_1 = (0, tslib_1.__importStar)(require("react"));
const LoggerContext = react_1.default.createContext((0, logger_1.createNoopLogger)());
const useLogger = () => (0, react_1.useContext)(LoggerContext);
exports.useLogger = useLogger;
const LoggerProvider = ({ children }) => {
    const defaultLogger = (0, react_1.useMemo)(() => {
        const [logger, enable] = (0, logger_1.createLogger)();
        enable();
        return logger;
    }, []);
    const noopLogger = (0, react_1.useMemo)(() => (0, logger_1.createNoopLogger)()[0], []);
    const [enabled, setEnabled] = (0, react_1.useState)(false);
    const logger = (0, react_1.useMemo)(() => enabled ? defaultLogger : noopLogger, [defaultLogger, enabled, noopLogger]);
    const enableLogging = (0, react_1.useCallback)((enabled = true) => setEnabled(enabled), [setEnabled]);
    return (react_1.default.createElement(LoggerContext.Provider, { value: (0, react_1.useMemo)(() => [logger, enableLogging], [enableLogging, logger]) }, children));
};
exports.LoggerProvider = LoggerProvider;
//# sourceMappingURL=use-logger.js.map