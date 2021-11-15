export function flattenMap(map) {
    const result = {};
    const stack = Object.entries(map);
    while (stack.length) {
        const [prefix, mapOrFun] = stack.pop();
        if (typeof mapOrFun === 'function') {
            result[prefix] = mapOrFun;
        }
        else {
            for (const [key, p] of Object.entries(mapOrFun)) {
                stack.push([join(prefix, key), p]);
            }
        }
    }
    return result;
}
function join(...args) {
    return args.filter(Boolean).join(".");
}
//# sourceMappingURL=flattenMap.js.map