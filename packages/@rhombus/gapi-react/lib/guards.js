import React, { memo } from 'react';
export function GuardDefined({ value, children: render, fallback }) {
    if (isDefined(value)) {
        return React.createElement(React.Fragment, null, render(value));
    }
    return React.createElement(React.Fragment, null, fallback);
}
// function GuardFor<P>(props: GuardForProps<P> & NullableRequiredValues<P>): ReactElement;
export function GuardFor({ target: Target, apply, children, ...props }) {
    const Child = apply ? partialApply(Target, apply) : Target;
    if (Object.values(props).some(p => !p)) {
        return React.createElement(React.Fragment, null, children);
    }
    return React.createElement(Child, { ...props });
}
export function partialApply(Target, props) {
    return memo(function Partial(p) {
        return React.createElement(Target, { ...{ ...props, ...p } });
    });
}
export function isDefined(value) {
    return value != null;
}
// export function Await<T>({ promise, children: render, fallback }: { promise: Promise<T>; children: (value: T) => ReactElement; fallback?: ReactNode; }): ReactElement {
//     const [ready, result] = usePromise(promise);
//     if (ready) {
//         return <>{render(result!)}</>;
//     }
//     return <>{fallback}</>;
// }
//# sourceMappingURL=guards.js.map