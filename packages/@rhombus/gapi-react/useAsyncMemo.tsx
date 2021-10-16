import { useEffect, useMemo, useState } from 'react';
import { AsyncFunc } from '@rhombus/func';

export function useAsyncMemo<T>(factory: AsyncFunc<[], T>, deps: any[]) {

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const promise = useMemo(() => factory(), deps);

    const [ready, result] = usePromise(promise);
    return result;

    // const [result, setResult] = useState<T>();
    // useEffect(() => {
    //     factory().then(setResult);
    // }, deps);
    // if (!result) {
    //     return [undefined, false] as const;
    // }
    // return result;
}
export function usePromise<T>(promise: PromiseLike<T>): [false] | [true, T] {
    const [result, setResult] = useState<T>();
    const [ready, setReady] = useState(false);
    useEffect(() => {
        promise.then(result => {
            setResult(result);
            setReady(true);
        });
    }, [promise]);

    if (ready) {
        return [true, result!];
    }
    return [false];
};
