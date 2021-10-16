import { Func } from '@rhombus/func';



export function* iterate(start: number, length = Infinity): Iterable<number> {
    let i = 0;
    while (i < length) {
        yield i++ + start;
    }
}

export function* filter<TSource>(source: Iterable<TSource>, predicate: (source: TSource) => boolean): Iterable<TSource> {
    for (const item of source) {
        if (predicate(item)) {
            yield item;
        }
    }
}
export function* map<TSource, TResult>(source: Iterable<TSource>, selector: (source: TSource) => TResult): Iterable<TResult> {
    for (const item of source) {
        yield selector(item);
    }
}
export function* flatMap<TSource, TResult>(source: Iterable<Iterable<TSource>>, selector: (source: TSource) => TResult): Iterable<TResult> {
    for (const sublist of source) {
        for (const item of sublist) {
            yield selector(item);
        }
    }
}
export function* take<TSource>(source: Iterable<TSource>, count: number) {
    let i = 0;
    for (const item of source) {
        if (i++ >= count) {
            break;
        }
        yield item;
    }
}

interface Grouping<T, TKey> extends Iterable<T> {
    key: TKey;
}


// export function groupBy<TSource, TKey>(source: Iterable<TSource>, keySelector: (item: TSource) => TKey): Array<Grouping<TSource, TKey>> {
//     const keys: Generator<Grouping<TSource, TKey>>[] = [];
//     for (const item of source) {
//         const key = keySelector(item);

//     }
//     throw 'asdf';
// }
