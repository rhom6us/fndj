import { usePromise } from './use-promise';
export function useAsyncMemo(factory, ...args) {
    const [defaultValue, deps] = args.length === 2 ? args : [undefined, args[0]];
    const [ready, result] = usePromise(factory, deps);
    return ready ? result : defaultValue;
}
//# sourceMappingURL=use-async-memo.js.map