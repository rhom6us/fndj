import { createLogger, createNoopLogger } from '@rhombus-toolkit/logger';
import React, { FC, useCallback, useContext, useMemo, useState } from 'react';

const LoggerContext = React.createContext<ReturnType<typeof createLogger>>(createNoopLogger());


export const useLogger = () => useContext(LoggerContext);


export const LoggerProvider: FC = ({ children }) => {
    const defaultLogger = useMemo(() => {
        const [logger, enable] = createLogger();
        enable();
        return logger;
    }, []);
    const noopLogger = useMemo(() => createNoopLogger()[0], []);
    const [enabled, setEnabled] = useState(false);
    const logger = useMemo(() => enabled ? defaultLogger : noopLogger, [defaultLogger, enabled, noopLogger]);
    const enableLogging = useCallback((enabled = true) => setEnabled(enabled), [setEnabled]);
    return (
        <LoggerContext.Provider value={useMemo(()=>[logger, enableLogging] as const, [enableLogging, logger])}>
            {children}
        </LoggerContext.Provider>
    );
};
