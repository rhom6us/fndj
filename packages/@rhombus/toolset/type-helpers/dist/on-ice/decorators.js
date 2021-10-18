export function enumerable(value) {
    return function (target, propertyKey, descriptor) {
        descriptor.enumerable = value;
    };
}
export function final(value = true) {
    return function (target, propertyKey, descriptor) {
        descriptor.writable = value;
    };
}
export function readonly(target) {
    target.descriptor.writable = false;
    return target;
}
//# sourceMappingURL=decorators.js.map