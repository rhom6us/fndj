import { isPromiseLike } from '@rhombus/type-guards';
import { useDebugValue, useEffect, useMemo, useState } from 'react';
export function usePromise(promise, deps) {
    const [result, setResult] = useState();
    const [ready, setReady] = useState(false);
    useDebugValue(ready, ready => ready ? 'READY' : 'PENDING...');
    const args = isPromiseLike(promise) ? [() => promise, [promise]] : [promise, deps];
    const p = useMemo(...args); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        p.then(result => {
            setResult(result);
            setReady(true);
        });
    }, [p]);
    if (ready) {
        return [true, result];
    }
    return [false];
}
//# sourceMappingURL=use-promise.js.map