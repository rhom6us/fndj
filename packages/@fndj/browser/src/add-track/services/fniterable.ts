import { Func } from "@rhombus-toolkit/func";
import { assertNever, isIterable } from "@rhombus-toolkit/type-guards";
import { isBoolean, isNumber } from "util";

export function sequenceEquals<T>(a: Iterable<T>, b: Iterable<T>, comparer: EqualityComparer<T | undefined> = identityComparer) {
    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) {
            return false;
        }
    }
    return every(zip(a, b), ([p1, p2]) => comparer(p1, p2));
}

export function* zip<T>(a: Iterable<T>, b: Iterable<T>): Iterable<readonly [T?, T?]> {
    const iterA = a[Symbol.iterator]();
    const iterB = b[Symbol.iterator]();
    let itemA = iterA.next();
    let itemB = iterB.next();
    while (!itemA.done || !itemB.done) {
        yield [itemA.value, itemB.value] as const; //value will be undefined once it's done
        itemA = iterA.next();
        itemB = iterB.next();
    }
}
export function some<T>(source: Iterable<T>, predicate: Func<[T], boolean>) {
    for (const item of source) {
        if (predicate(item)) {
            return true;
        }
    }
    return false;
}
export function every<T>(source: Iterable<T>, predicate: Func<[T], boolean>) {
    return !some(source, inverse(predicate));
}

export function inverse<TArgs extends any[]>(fn: Func<TArgs, boolean>): Func<TArgs, boolean> {
    return (...args: TArgs) => !fn(...args);
}

export type EqualityComparer<T> = Func<[T, T], boolean>;
export function identityComparer<T>(a: T, b: T) {
    return a == b;
}

export function deepComparer<T>(a: T, b: T, comparer: EqualityComparer<Primitive> = identityComparer): boolean {
    if (typeof a !== typeof b) {
        return false;
    }
    if (isPrimitive(a)) {
        if (isPrimitive(b)) {
            return comparer(a, b);
        }
        return false;
    }
    if (isIterable(a)) {
        if (isIterable(b)) {
            return sequenceEquals(a, b, (a,b)=>deepComparer(a,b,comparer));
        }
        return false;
    }
    if (isObject(a)) {
        if(!isObject(b)){
            return false;
        }
        const compare = new Intl.Collator().compare;
        const aKeys = Object.keys(a).sort(compare) as (keyof T)[];
        const bKeys = Object.keys(b).sort(compare) as (keyof T)[];
        if (!sequenceEquals(aKeys, bKeys)) {
            return false;
        }
        return aKeys.every(key => deepComparer<any>(a[key], b[key], comparer));
    }
    assertNever(a);

}
function isObject(value: any): value is Record<any, any> {
    return typeof value === 'object';
}

export function includes<T>(source: Iterable<T>, value: T, comparer: EqualityComparer<T> = identityComparer) {
    return some(source, p => comparer(p, value));
}
type Primitive = number | boolean | string | symbol;
function isPrimitive(value: any): value is Primitive {
    return typeof value !== 'object';
}