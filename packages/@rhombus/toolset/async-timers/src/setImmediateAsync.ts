import { clearImmediate, setImmediate } from "@rhombus-toolkit/set-immediate";

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