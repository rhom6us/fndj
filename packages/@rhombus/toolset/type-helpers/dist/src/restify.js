export function restify(arg) {
    if (arg === undefined) {
        return [];
    }
    if (Array.isArray(arg)) {
        return arg;
    }
    return [arg];
}
export function unrestify(arg) {
    if (!Array.isArray(arg)) {
        throw new TypeError("Value must be an array");
    }
    switch (arg.length) {
        case 0:
            return;
        case 1:
            return arg[0];
        default:
            return arg;
    }
}
//# sourceMappingURL=restify.js.map