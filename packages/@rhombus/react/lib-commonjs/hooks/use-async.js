"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAsync = void 0;
const react_1 = require("react");
const VALUE_NOT_SET_1 = require("./VALUE_NOT_SET");
const useAsync = (asyncFunction, deps) => {
    const [status, setStatus] = (0, react_1.useState)('idle');
    const [value, setValue] = (0, react_1.useState)(VALUE_NOT_SET_1.VALUE_NOT_SET);
    const [error, setError] = (0, react_1.useState)(VALUE_NOT_SET_1.VALUE_NOT_SET);
    // The execute function wraps asyncFunction and
    // handles setting state for pending, value, and error.
    // useCallback ensures the below useEffect is not called
    // on every render, but only if asyncFunction changes.
    const execute = (0, react_1.useCallback)(async () => {
        setStatus('pending');
        setValue(VALUE_NOT_SET_1.VALUE_NOT_SET);
        setError(VALUE_NOT_SET_1.VALUE_NOT_SET);
        try {
            const response = await asyncFunction();
            setValue(response);
            setStatus('success');
        }
        catch (error) {
            setError(error);
            setStatus('error');
        }
    }, deps); // eslint-disable-line react-hooks/exhaustive-deps
    // Call execute if we want to fire it right away.
    // Otherwise execute can be called later, such as
    // in an onClick handler.
    (0, react_1.useEffect)(() => {
        execute();
    }, [execute,]);
    return [status, value, error];
};
exports.useAsync = useAsync;
//# sourceMappingURL=use-async.js.map