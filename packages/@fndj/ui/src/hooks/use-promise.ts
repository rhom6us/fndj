import { useCallback, useMemo } from 'react';
import { useState, useEffect } from 'react';

// export function usePromise<T>(asyncFn: () => Promise<T>, deps: any[]): T | undefined;
// export function usePromise<T>(asyncFn: () => Promise<T>, defaultValue: T, deps: any[]): T;
// // export function usePromise<T>(asyncFn: () => Promise<T>, defaultValue?: T, deps?: any[]): T {
// export function usePromise<T>(...args: [asyncFn: () => Promise<T>, deps: any[]] | [asyncFn: () => Promise<T>, defaultValue: T, deps: any[]]): any {
//     const [asyncFn, ...rest] = args;
//     if (rest.length === 1) {
//         rest.unshift(undefined as any);
//     }
//     const [defaultValue, deps] = rest;
//     const [result, setResult] = useState(defaultValue);
//     useEffect(() => {
//         asyncFn().then(setResult);
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, deps);//[asyncFn, ...deps!]);

//     return result;
// }
export function usePromise<T>(promise: Promise<T>): T;
// export function usePromise<T>(promise: () => Promise<T>): T;
export function usePromise<T, U>(promise: Promise<T>, defaultValue: U): T | U;
// export function usePromise<T, U>(promise: () => Promise<T>, defaultValue: U): T | U;
export function usePromise<T>(promise: Promise<T>/* | (() => Promise<T>)*/, defaultValue?: any) {

    const [result, setResult] = useState<T>(defaultValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const p = promise;// useMemo(() => typeof promise === 'function' ? promise() : promise, [typeof promise !== 'function' && promise].filter(Boolean));
    useEffect(() => {
        p.then(setResult);
    }, [p]);

    return result;
}
