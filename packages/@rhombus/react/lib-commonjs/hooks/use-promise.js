"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePromise = void 0;
const react_1 = require("react");
/**
 * @param promise make DAMN sure that the identity of the promise is stable
 */
function usePromise(factory, deps) {
    // export function usePromise<T>(promise: PromiseLike<T>): [false] | [true, T];
    // export function usePromise<T>(promise: PromiseLike<T> | AsyncFunc<[], T>, deps?: DependencyList | undefined) {
    const [result, setResult] = (0, react_1.useState)();
    const [ready, setReady] = (0, react_1.useState)(false);
    (0, react_1.useDebugValue)(ready, ready => ready ? 'READY' : 'PENDING...');
    // const args = isPromiseLike(promise) ? [() => promise, [promise]] as const : [promise, deps] as const;
    // const p = useMemo<PromiseLike<T>>(...(args as [any, any])); // eslint-disable-line react-hooks/exhaustive-deps
    const p = (0, react_1.useMemo)(factory, deps); // eslint-disable-line react-hooks/exhaustive-deps
    (0, react_1.useEffect)(() => {
        setReady(false);
        p.then(result => {
            setResult(result);
            setReady(true);
        });
    }, [p, ...(deps ?? [])]); // eslint-disable-line react-hooks/exhaustive-deps
    if (ready) {
        return [true, result];
    }
    return [false];
}
exports.usePromise = usePromise;
//# sourceMappingURL=use-promise.js.map