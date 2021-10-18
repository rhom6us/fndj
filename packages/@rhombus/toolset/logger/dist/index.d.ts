import { Action } from '@rhombus/func';
declare type RemapReturns<T> = {
    [K in keyof T]: T[K] extends Action ? <Args extends Parameters<T[K]>>(...args: Args) => (Args extends [...any[], infer Last] ? Last : T) : T[K];
};
export declare type LoggerBase = RemapReturns<Console>;
declare type CreateLoggerResult<T extends LoggerBase = LoggerBase> = readonly [logger: T, enableLogging: Action<[enable?: boolean]>];
export declare function createLogger(enabled?: boolean): CreateLoggerResult;
export declare function createNoopLogger(): CreateLoggerResult;
export declare const logger: RemapReturns<Console>, enableLogging: Action<[enable?: boolean | undefined]>;
export {};
