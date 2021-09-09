export function keys<T>(obj: T): Array<keyof T> {
    return Object.keys(obj) as any;
}

export function entries<T>(obj: T): Array<readonly [keyof T, T[keyof T]]> {
    return Object.entries(obj) as any;
}
export function values<T>(obj: T): Array<T[keyof T]> {
    return Object.values(obj);
}
