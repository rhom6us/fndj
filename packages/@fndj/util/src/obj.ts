export function keys<T>(obj: T): Array<keyof T> {
    return Object.keys(obj) as any;
}

export function entries<T>(obj: T): Array<readonly [keyof T, T[keyof T]]> {
    return Object.entries(obj) as any;
}
export function values<T>(obj: T): Array<T[keyof T]> {
    return Object.values(obj);
}

type MergeTarget<Target, Source> =
    Source extends Partial<Target> ? Target : Target & Source;
type CompileArray<Target, Sources extends any[]> =
    Sources extends [...infer Rest, infer Source] ? CompileArray<MergeTarget<Target, Source>, Rest> :
    Sources extends [infer Source] ? MergeTarget<Target, Source> :
    Sources extends [] ? Target :
    Target;
// eslint-disable-next-line @typescript-eslint/ban-types
export function assign<T extends object, A extends any[]>(target: T, ...sources: A): CompileArray<T, A> {
    return Object.assign(target, ...sources);
}
