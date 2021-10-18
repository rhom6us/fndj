import React, { ComponentType, ReactElement, ReactNode } from 'react';
export declare function GuardDefined<T>({ value, children: render, fallback }: {
    value: T | null | undefined;
    children: (value: Exclude<T, null | undefined>) => ReactElement;
    fallback?: ReactNode;
}): ReactElement;
declare type RequiredKeys<T> = {
    [K in keyof T]-?: Empty extends Pick<T, K> ? never : K;
}[keyof T];
declare type OptionalKeys<T> = {
    [K in keyof T]-?: Empty extends Pick<T, K> ? K : never;
}[keyof T];
declare type OptionalPart<T> = Pick<T, OptionalKeys<T>>;
declare type Empty = {};
declare type NullableRequiredValues<T> = {
    [K in RequiredKeys<T>]: T[K] | undefined | null;
} & OptionalPart<T>;
declare type PP<T> = Empty extends T ? T : {
    [P in keyof T]: Exclude<T[P], undefined>;
};
export declare function GuardFor<P, A extends Partial<P>>({ target: Target, apply, children, ...props }: {
    target: ComponentType<P>;
    children?: ReactNode;
    apply: PP<A>;
} & NullableRequiredValues<Omit<P, keyof A>>): JSX.Element;
export declare function partialApply<P, Applied extends Partial<P>>(Target: ComponentType<P>, props: Applied): React.NamedExoticComponent<Omit<P, keyof Applied>>;
export declare function isDefined<T>(value: T | null | undefined): value is NonNullable<T>;
export declare function Await<T>({ promise, children: render, fallback }: {
    promise: Promise<T>;
    children: (value: T) => ReactElement;
    fallback?: ReactNode;
}): ReactElement;
export {};
