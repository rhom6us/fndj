import { setImmediate, clearImmediate } from "@rhombus/set-immediate";

declare class AbortSignal {
    addEventListener(name: string, cb: (ev: any) => void): void;
}

// export function setImmediateAsync(): Promise<void>;
export function setImmediateAsync(): Promise<void>;
export function setImmediateAsync(signal: AbortSignal): Promise<void>;
export function setImmediateAsync<T>(arg: T): Promise<T>;
export function setImmediateAsync<T>(signal: AbortSignal, arg: T): Promise<T>;
export function setImmediateAsync<T extends any[]>(...args: T): Promise<T>;
export function setImmediateAsync<T extends any[]>(signal: AbortSignal, ...args: T): Promise<T>;
export function setImmediateAsync(...args: any) {
    const [first, ...rest] = args;
    const signal = first instanceof AbortSignal ? first : undefined;
    const params = signal ? rest : args;
    return new Promise((resolve, reject) => {
        let token: any;
        signal?.addEventListener('abort', (ev) => {
            if (token) {
                clearImmediate(token);
                token = undefined;
            }
            reject('cancelled');
        });
        token = setImmediate(() => resolve(params.length === 1 ? params[0] : args));
    });
}

export function setTimeoutAsync(timeout: number): Promise<void>;
export function setTimeoutAsync(timeout: number, signal: AbortSignal): Promise<void>;
export function setTimeoutAsync<T>(timeout: number, arg: T): Promise<T>;
export function setTimeoutAsync<T>(timeout: number, signal: AbortSignal, arg: T): Promise<T>;
export function setTimeoutAsync<T extends any[]>(timeout: number, ...args: T): Promise<T>;
export function setTimeoutAsync<T extends any[]>(timeout: number, signal: AbortSignal, ...args: T): Promise<T>;
export function setTimeoutAsync(timeout: number, ...args: any) {
    const [first, ...rest] = args;
    const signal = first instanceof AbortSignal ? first : undefined;
    const params = signal ? rest : args;

    return new Promise((resolve, reject) => {
        let token: any;
        signal?.addEventListener('abort', (ev) => {
            if (token) {
                clearTimeout(token);
                token = undefined;
            }
            reject('cancelled');
        });
        token = setTimeout(() => resolve(params.length === 1 ? params[0] : args), timeout);
    });
}
