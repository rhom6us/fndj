const Ξ = Symbol("⚡");
function mark(target) {
    Reflect.defineProperty(target, Ξ, {
        configurable: false,
        enumerable: false,
        writable: false,
        value: true,
    });
    return target;
}
export function restify(arg) {
    if (arg === undefined) {
        return mark([]);
    }
    if (Array.isArray(arg)) {
        return arg;
    }
    return mark([arg]);
}
export function unrestify(arg) {
    if (!arg[Ξ]) {
        return arg;
    }
    if (!Array.isArray(arg)) {
        throw new TypeError("Value must be an array");
    }
    switch (arg.length) {
        case 0:
            return;
        case 1:
            return arg[0];
        default:
            return [...arg]; //clear the marker symbol
    }
}
//# sourceMappingURL=restify.js.map