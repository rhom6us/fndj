export function keys(obj) {
    return Object.keys(obj);
}
export function entries(obj) {
    return Object.entries(obj);
}
export function values(obj) {
    return Object.values(obj);
}
export function fromEntries(entries) {
    return Object.fromEntries(entries);
}
// eslint-disable-next-line @typescript-eslint/ban-types
export function assign(target, ...sources) {
    return Object.assign(target, ...sources);
}
export function assignDeep(target, stuff) {
    if (!(target instanceof Object)) {
        throw new RangeError('this function only useful on things with an Object prototype');
    }
    let current = target;
    while (Reflect.getPrototypeOf(current)?.constructor && Reflect.getPrototypeOf(current).constructor !== Object) {
        current = Reflect.getPrototypeOf(current);
    }
    Reflect.setPrototypeOf(current, Reflect.getPrototypeOf(stuff));
    return Object.assign(target, stuff);
}
//# sourceMappingURL=obj.js.map