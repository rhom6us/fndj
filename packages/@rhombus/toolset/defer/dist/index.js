export function defer() {
    const result = {
        [Symbol.toStringTag]: 'Defer'
    };
    result.promise = new Promise((resolve, reject) => {
        result.resolve = resolve;
        result.reject = reject;
    });
    return Object.freeze(result);
}
//# sourceMappingURL=index.js.map