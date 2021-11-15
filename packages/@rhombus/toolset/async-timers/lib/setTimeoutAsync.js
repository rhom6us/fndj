export function setTimeoutAsync(timeout, ...args) {
    const [first, ...rest] = args;
    const signal = first instanceof AbortSignal ? first : undefined;
    const params = signal ? rest : args;
    if ('__promisify__' in setTimeout) {
        return setTimeout.__promisify__(timeout, params.length === 1 ? params[0] : args);
    }
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
//# sourceMappingURL=setTimeoutAsync.js.map