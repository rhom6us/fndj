import { Func } from '@rhombus-toolkit/func';

export function zip<T1, T2>(a: Iterable<T1>, b: Iterable<T2>): Iterable<readonly [T1, T2]>;
export function zip<T1, T2, T3>(a: Iterable<1>, b: Iterable<2>, c: Iterable<3>): Iterable<readonly [T1, T2, T3]>;
export function zip<T1, T2, T3, T4>(a: Iterable<1>, b: Iterable<2>, c: Iterable<3>, d: Iterable<4>): Iterable<readonly [T1, T2, T3, T4]>;
export function zip<T1, T2, T3, T4, T5>(a: Iterable<1>, b: Iterable<2>, c: Iterable<3>, d: Iterable<4>, e: Iterable<5>): Iterable<readonly [T1, T2, T3, T4, T5]>;
export function zip<T>(...lists: Iterable<T>[]): Iterable<readonly T[]>;
export function* zip(...lists: Iterable<any>[]): Iterable<readonly any[]> {
  const iters = lists.map(list => list[Symbol.iterator]());

  let current = iters.map(iter => iter.next());
  do {
    yield current.map(value => value.value);
    current = iters.map(iter => iter.next());
  } while (!current.some(value => value.done));
}

export function* map<TSource, TResult>(source: Iterable<TSource>, predicate: Func<[TSource], TResult>): Iterable<TResult>{
    for (const item of source) {
        yield predicate(item);
    }
}

export async function* mapAsync<TSource, TResult>(source: AsyncIterable<TSource>, predicate: Func<[TSource], TResult>): AsyncIterable<TResult>{
    for await (const item of source) {
        yield predicate(item);
    }
}

