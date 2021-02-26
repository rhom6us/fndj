export function enumerable(value: boolean) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        descriptor.enumerable = value;
    };
}
export function final(value = true) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        descriptor.writable = value;
    };
}
export function readonly(target: any) {
    target.descriptor.writable = false;
    return target;
}
