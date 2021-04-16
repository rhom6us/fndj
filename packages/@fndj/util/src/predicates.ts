
export function notDefined<T>(p: T) {
    return p === undefined;
}
export function defined<T>(p: T) {
    return p !== undefined;
}
