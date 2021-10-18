import { createLogger, createNoopLogger } from '@rhombus/logger';
import React, { useCallback, useContext, useMemo, useState } from 'react';
const LoggerContext = React.createContext(createNoopLogger());
export const useLogger = () => useContext(LoggerContext);
export const LoggerProvider = ({ children }) => {
    const defaultLogger = useMemo(() => {
        const [logger, enable] = createLogger();
        enable();
        return logger;
    }, []);
    const noopLogger = useMemo(() => createNoopLogger()[0], []);
    const [enabled, setEnabled] = useState(false);
    const logger = useMemo(() => enabled ? defaultLogger : noopLogger, [defaultLogger, enabled, noopLogger]);
    const enableLogging = useCallback((enabled = true) => setEnabled(enabled), [setEnabled]);
    return (React.createElement(LoggerContext.Provider, { value: useMemo(() => [logger, enableLogging], [enableLogging, logger]) }, children));
};
//# sourceMappingURL=use-logger.js.map