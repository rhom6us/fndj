// import React, { useCallback, useContext, useState } from 'react';
// import { logger } from '@rhombus/type-helpers';


// const LoggerContext = React.createContext<[logger: LoggerBase, enableLogging: (enabled?: boolean) => void]>([new ConsoleLogger(), (enabled?: boolean) => { }]);

// // eslint-disable-next-line @typescript-eslint/ban-types
// export const LoggerProvider = ({ children }: React.PropsWithChildren<{}>) => {
//     const [logger, setLogger] = useState<LoggerBase>(new ConsoleLogger());
//     const enableLogging = useCallback((enabled = true) => {

//         setLogger(lastLogger => {
//             if (enabled && lastLogger instanceof NoopLogger) {
//                 return new ConsoleLogger();
//             }
//             if (!enabled && lastLogger instanceof ConsoleLogger) {
//                 return new NoopLogger();
//             }
//             return lastLogger;
//         });
//     }, []);
//     return (
//         <LoggerContext.Provider value={[logger, enableLogging]}>
//             {children}
//         </LoggerContext.Provider>
//     );
// };

// export const useLogger = () => useContext(LoggerContext);
