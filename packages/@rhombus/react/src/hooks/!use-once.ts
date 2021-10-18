import { Action, Func } from '@rhombus/func';
import { useEffect, useMemo } from 'react';

export function useDoOnce(fn: Action<[]>) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useEffect(fn, []);
}

export function useInitOnce<T>(fn: Func<[], T>, ...deps: any[]): T | undefined {
    // eslint-disable-next-line react-hooks/exhaustive-deps

    return useMemo(() => {
        if (deps.some(p => p === undefined || p === null)) {
            return undefined;
        }

        return fn();
    }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}

export function useOnceReady(fn: Action<[]>, deps: any[]) {
    useEffect(() => {
        if (deps.some(p => p === undefined)) {
            return;
        }
        fn();
    }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}
