import { useState, useEffect } from 'react';

export function usePromise<T>(asyncFn: () => Promise<T>, deps: any[]): T | undefined;
export function usePromise<T>(asyncFn: () => Promise<T>, defaultValue: T, deps: any[]): T;
// export function usePromise<T>(asyncFn: () => Promise<T>, defaultValue?: T, deps?: any[]): T {
export function usePromise<T>(...args: [asyncFn: () => Promise<T>, deps: any[]] | [asyncFn: () => Promise<T>, defaultValue: T, deps: any[]]): any {
    const [asyncFn, ...rest] = args;
    if (rest.length === 1) {
        rest.unshift(undefined as any);
    }
    const [defaultValue, deps] = rest;
    const [result, setResult] = useState(defaultValue);
    useEffect(() => {
        asyncFn().then(setResult);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [asyncFn, ...deps!]);

    return result;
}
