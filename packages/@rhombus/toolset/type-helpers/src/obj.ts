
export type keys<T> = keyof T;
export function keys<T>(obj: T): keys<T>[] {
    return Object.keys(obj) as any;
}

export type entries<T> = {
    [K in keyof T]: readonly [K, T[K]]
}[keyof T]
export function entries<T>(obj: T): entries<T>[]{
    return Object.entries(obj) as any;
}

export type values<T> = T[keyof T];
export function values<T>(obj: T): values<T>[] {
    return Object.values(obj);
}


export type fromEntries<TUnion extends readonly [PropertyKey, any]> = {
    [Entry in TUnion as Entry[0]]: Entry[1]
}
export function fromEntries<TPair extends readonly [PropertyKey, any]>(entries: TPair[]): fromEntries<TPair> {
    return Object.fromEntries(entries) as any;
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
