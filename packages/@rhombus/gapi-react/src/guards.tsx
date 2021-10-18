import { usePromise } from '@rhombus/react';
import React, { ComponentType, memo, ReactElement, ReactNode } from 'react';


export function GuardDefined<T>({ value, children: render, fallback }: { value: T | null | undefined; children: (value: Exclude<T, null | undefined>) => ReactElement; fallback?: ReactNode; }): ReactElement {
    if (isDefined(value)) {
        return <>{render(value)}</>;
    }

    return <>{fallback}</>;
}

type RequiredKeys<T> = { [K in keyof T]-?: Empty extends Pick<T, K> ? never : K }[keyof T];
type OptionalKeys<T> = { [K in keyof T]-?: Empty extends Pick<T, K> ? K : never }[keyof T];
type RequiredPart<T> = Pick<T, RequiredKeys<T>>;
type OptionalPart<T> = Pick<T, OptionalKeys<T>>;
// eslint-disable-next-line @typescript-eslint/ban-types
type Empty = {};
type NullableKeys<T, ConsiderNulls extends boolean = true> = {
    [K in keyof T]-?:
    undefined extends T[K] ? K :
    null extends T[K] ? (
        ConsiderNulls extends true ? K : never
    ) :
    never
}[keyof T];
type NonNullableKeys<T, IncludeNull extends boolean = true> = Exclude<keyof T, NullableKeys<T, IncludeNull>>;

type NullableRequiredValues<T> = {
    [K in RequiredKeys<T>]: T[K] | undefined | null
} & OptionalPart<T>;
type NullablePart<T, ConsiderNulls extends boolean = true> = Pick<T, NullableKeys<T, ConsiderNulls>>;
type NonNullablePart<T, ConsiderNulls extends boolean = true> = Pick<T, NonNullableKeys<T, ConsiderNulls>>;



interface GuardForProps<P, A> {

}
type LeftOvers<P, A> =
    A extends unknown ? P :
    Omit<P, keyof A>;
type PP<T> = Empty extends T ? T : {
    [P in keyof T]: Exclude<T[P], undefined>;
};

// function GuardFor<P>(props: GuardForProps<P> & NullableRequiredValues<P>): ReactElement;
export function GuardFor<P, A extends Partial<P>>({ target: Target, apply, children, ...props }: { target: ComponentType<P>; children?: ReactNode; apply: PP<A>; } & NullableRequiredValues<Omit<P, keyof A>>) {
    const Child = apply ? partialApply(Target, apply as any) : Target;
    if (Object.values(props).some(p => !p)) {
        return <>{children}</>;
    }
    return <Child {...props as any as P} />;
}
export function partialApply<P, Applied extends Partial<P>>(Target: ComponentType<P>, props: Applied) {
    return memo(function Partial(p: Omit<P, keyof Applied>) {
        return <Target {...{ ...props, ...p } as any as P} />;
    });
}
export function isDefined<T>(value: T | null | undefined): value is NonNullable<T> {
    return value !== null && value !== undefined;
}


export function Await<T>({ promise, children: render, fallback }: { promise: Promise<T>; children: (value: T) => ReactElement; fallback?: ReactNode; }): ReactElement {
    const [ready, result] = usePromise(promise);
    if (ready) {
        return <>{render(result!)}</>;
    }

    return <>{fallback}</>;
}
