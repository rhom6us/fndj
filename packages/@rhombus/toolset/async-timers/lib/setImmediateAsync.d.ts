export declare function setImmediateAsync(): Promise<void>;
export declare function setImmediateAsync(signal: AbortSignal): Promise<void>;
export declare function setImmediateAsync<T>(arg: T): Promise<T>;
export declare function setImmediateAsync<T>(signal: AbortSignal, arg: T): Promise<T>;
export declare function setImmediateAsync<T extends any[]>(...args: T): Promise<T>;
export declare function setImmediateAsync<T extends any[]>(signal: AbortSignal, ...args: T): Promise<T>;
//# sourceMappingURL=setImmediateAsync.d.ts.map