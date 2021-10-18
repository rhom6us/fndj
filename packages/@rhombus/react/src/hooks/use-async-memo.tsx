import { AsyncFunc } from '@rhombus/func';
import { DependencyList } from 'react';
import { usePromise } from './use-promise';

export function useAsyncMemo<T>(factory: AsyncFunc<[], T>, deps: DependencyList | undefined) : T | undefined;
export function useAsyncMemo<T, D>(factory: AsyncFunc<[], T>, defaultValue: D, deps: DependencyList | undefined): T | D;
export function useAsyncMemo<T, D>(factory: AsyncFunc<[], T>, ...args: [deps: DependencyList | undefined] | [defaultValue: D, deps: DependencyList | undefined]):T|D {
    const [defaultValue, deps] = args.length === 2 ? args : [undefined, args[0]];

    const [ready, result] = usePromise(factory, deps);
    return ready ? result! : defaultValue!;
}
