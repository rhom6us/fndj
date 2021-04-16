export function keys<T>(obj: T): Array<keyof T> {
    return Object.keys(obj) as any;
}
export function entry<T, K extends keyof T>(obj: T, key: K) {
    return [key, obj[key]] as const;
}
export function entries<T>(obj: T) {
    return keys(obj).map(key => entry(obj, key));
}
export function values<T>(obj: T) {
    return keys(obj).map(key => obj[key]);
    // return entries(obj).map(([, value]) => value);
}
