import { AsyncFunc } from '@rhombus/func';
import { DependencyList, useDebugValue, useEffect, useMemo, useState } from 'react';



/**
 * @param promise make DAMN sure that the identity of the promise is stable
 */
export function usePromise<T>(factory: AsyncFunc<[], T>, deps: DependencyList | undefined): [false] | [true, T] {
// export function usePromise<T>(promise: PromiseLike<T>): [false] | [true, T];
// export function usePromise<T>(promise: PromiseLike<T> | AsyncFunc<[], T>, deps?: DependencyList | undefined) {
    const [result, setResult] = useState<T>();
    const [ready, setReady] = useState(false);
    useDebugValue(ready, ready => ready ? 'READY' : 'PENDING...');
    // const args = isPromiseLike(promise) ? [() => promise, [promise]] as const : [promise, deps] as const;
    // const p = useMemo<PromiseLike<T>>(...(args as [any, any])); // eslint-disable-line react-hooks/exhaustive-deps
    const p = useMemo(factory, deps); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        setReady(false);
        p.then(result => {
            setResult(result);
            setReady(true);
        });
    }, [p, ...(deps ?? [])]); // eslint-disable-line react-hooks/exhaustive-deps

    if (ready) {
        return [true, result!];
    }
    return [false];
}
