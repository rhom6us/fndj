import { useQuery, QueryKey } from 'react-query';
import { fetchWithThrow } from '../api/fetch-with-throw';


export function useFetchQuery<TQueryKey extends QueryKey = QueryKey>(key: TQueryKey, ...args: Parameters<typeof fetch>) {
    return useQuery<Response, Error>(key, () => fetchWithThrow(...args));
}
export function useJsonQuery<T, TQueryKey extends QueryKey = QueryKey>(key: TQueryKey, ...args: Parameters<typeof fetch>) {
    return useQuery<T, Error>(key, () => fetchWithThrow(...args).then(p => p.json<T>()));
}

export function useFn(fn: (...args: any[]) => Promise<any>, ...args: Parameters<typeof fn>) {
    return useQuery(args, fn);
}
type Q<T extends any[]> = { queryKey: [string, ...T]; };

/**
 * @example
 * function test(id: number, d: Date) {
 *
 * }
 * const tt = withQueryKey(test)({ queryKey: ['key', 3, new Date()] });
 */
export function withQueryKey<T extends any[]>(fn: (...args: T) => any) {
    return ({ queryKey: [, ...args] }: Q<T>) => fn(...args);
}
