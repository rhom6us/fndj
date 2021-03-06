export type Restify<T> =
    T extends void ? [] :
    T extends undefined ? [] :
    T extends any[] ? T :
    [T];
export function restify<T>(arg: T): Restify<T> {
    if (arg === undefined) {
        return [] as Restify<T>;
    }
    if (Array.isArray(arg)) {
        return arg as Restify<T>;
    }
    return [arg] as Restify<T>;
}

export type Unrestify<T extends any[]> =
    T extends [] ? void :
    T extends [infer R] | [infer Q] ? R | Q :
    T extends [infer R] ? R :
    T extends any[] ? T :
    never;

export function unrestify<T extends any[]>(arg: T): Unrestify<T>;
export function unrestify<T extends any[]>(arg: T) {
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
