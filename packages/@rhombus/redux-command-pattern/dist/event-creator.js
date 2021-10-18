// eslint-disable-next-line @typescript-eslint/no-empty-function
function defaultFn() { }
export function getEventCreator(type) {
    return new Proxy(defaultFn, {
        get(target, prop) {
            const ns = [type, prop].filter(Boolean).join('.');
            return getEventCreator(ns);
        },
        apply(target, thisArg, payload) {
            return {
                type,
                payload,
            };
        },
    });
}
//# sourceMappingURL=event-creator.js.map