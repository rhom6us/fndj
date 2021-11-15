"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDefined = exports.partialApply = exports.GuardFor = exports.GuardDefined = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importStar)(require("react"));
function GuardDefined({ value, children: render, fallback }) {
    if (isDefined(value)) {
        return react_1.default.createElement(react_1.default.Fragment, null, render(value));
    }
    return react_1.default.createElement(react_1.default.Fragment, null, fallback);
}
exports.GuardDefined = GuardDefined;
// function GuardFor<P>(props: GuardForProps<P> & NullableRequiredValues<P>): ReactElement;
function GuardFor({ target: Target, apply, children, ...props }) {
    const Child = apply ? partialApply(Target, apply) : Target;
    if (Object.values(props).some(p => !p)) {
        return react_1.default.createElement(react_1.default.Fragment, null, children);
    }
    return react_1.default.createElement(Child, { ...props });
}
exports.GuardFor = GuardFor;
function partialApply(Target, props) {
    return (0, react_1.memo)(function Partial(p) {
        return react_1.default.createElement(Target, { ...{ ...props, ...p } });
    });
}
exports.partialApply = partialApply;
function isDefined(value) {
    return value != null;
}
exports.isDefined = isDefined;
// export function Await<T>({ promise, children: render, fallback }: { promise: Promise<T>; children: (value: T) => ReactElement; fallback?: ReactNode; }): ReactElement {
//     const [ready, result] = usePromise(promise);
//     if (ready) {
//         return <>{render(result!)}</>;
//     }
//     return <>{fallback}</>;
// }
//# sourceMappingURL=guards.js.map