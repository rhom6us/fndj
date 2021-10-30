

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

    if ('__promisify__' in setTimeout) {
        return (setTimeout as any).__promisify__(timeout, params.length === 1 ? params[0] : args);
    }

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