
export function tuple<T extends any[]>(...args: T): Readonly<T> {
    return args;
}
