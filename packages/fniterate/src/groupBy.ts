import { Grouping } from './iterables';


export function groupBy<TSource, TKey>(source: Iterable<TSource>, keySelector: (item: TSource) => TKey): Array<Grouping<TSource, TKey>> {
    const keys: Generator<Grouping<TSource, TKey>>[] = [];
    for (const item of source) {
        const key = keySelector(item);

    }
    throw 'asdf';
}
