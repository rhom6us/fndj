import { clearImmediate, setImmediate } from "@rhombus/set-immediate";
export function setImmediateAsync(...args) {
    const [first, ...rest] = args;
    const signal = first instanceof AbortSignal ? first : undefined;
    const params = signal ? rest : args;
    return new Promise((resolve, reject) => {
        let token;
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
export function setTimeoutAsync(timeout, ...args) {
    const [first, ...rest] = args;
    const signal = first instanceof AbortSignal ? first : undefined;
    const params = signal ? rest : args;
    return new Promise((resolve, reject) => {
        let token;
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
//# sourceMappingURL=index.js.map