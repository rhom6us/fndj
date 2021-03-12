import { useEffect, useMemo } from 'react';

export function useDoOnce(fn: () => void) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useEffect(fn, []);
}

export function useInitOnce<T>(fn: () => T, ...deps: any[]): T | undefined {
    // eslint-disable-next-line react-hooks/exhaustive-deps

    return useMemo(() => {
        if (deps.some(p => p === undefined || p === null)) {
            return undefined;
        }

        return fn();
    }, deps);
}

export function useOnceReady(fn: Parameters<typeof useDoOnce>[0], deps: any[]) {
    useEffect(() => {
        if (deps.some(p => p === undefined)) {
            return;
        }
        fn();
    }, deps);
}
