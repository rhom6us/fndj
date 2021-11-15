import { useEffect, useMemo } from 'react';
export function useDoOnce(fn) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useEffect(fn, []);
}
export function useInitOnce(fn, ...deps) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useMemo(() => {
        if (deps.some(p => p === undefined || p === null)) {
            return undefined;
        }
        return fn();
    }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}
export function useOnceReady(fn, deps) {
    useEffect(() => {
        if (deps.some(p => p === undefined)) {
            return;
        }
        fn();
    }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}
//# sourceMappingURL=!use-once.js.map