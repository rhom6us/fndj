import { clearImmediate, setImmediate } from "@rhombus/set-immediate";

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
    return new Promise<any>((resolve, reject) => {
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

    return new Promise<any>((resolve, reject) => {
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

type NotNull<T> = Exclude<T, null>;
type Cast<T, R> = T extends R ? T : R;
type InferEventType<T extends EventTarget, N extends string> = Cast<Parameters<NotNull<T[Cast<`on${N}`, keyof T>]>>[0], Event>;

export function listenEventAsync<T extends EventTarget, N extends Parameters<T['addEventListener']>[0]>(target: T, name: N, options: Omit<AddEventListenerOptions, 'once'> | boolean = {}) {
    return new Promise<InferEventType<T, N>>(resolve => {
        const opts = typeof options === 'boolean' ? { capture: options } : options;
        target.addEventListener(name, p => resolve(p as any), {...opts, once:true});
    });
}
