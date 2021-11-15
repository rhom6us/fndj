export declare function setTimeoutAsync(timeout: number): Promise<void>;
export declare function setTimeoutAsync(timeout: number, signal: AbortSignal): Promise<void>;
export declare function setTimeoutAsync<T>(timeout: number, arg: T): Promise<T>;
export declare function setTimeoutAsync<T>(timeout: number, signal: AbortSignal, arg: T): Promise<T>;
export declare function setTimeoutAsync<T extends any[]>(timeout: number, ...args: T): Promise<T>;
export declare function setTimeoutAsync<T extends any[]>(timeout: number, signal: AbortSignal, ...args: T): Promise<T>;
//# sourceMappingURL=setTimeoutAsync.d.ts.map