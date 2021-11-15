export function listenEventAsync(target, name, options = {}) {
    return new Promise(resolve => {
        const opts = typeof options === 'boolean' ? { capture: options } : options;
        target.addEventListener(name, p => resolve(p), { ...opts, once: true });
    });
}
//# sourceMappingURL=listenEventAsync.js.map