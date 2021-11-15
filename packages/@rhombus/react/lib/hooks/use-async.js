import { useCallback, useEffect, useState } from 'react';
import { VALUE_NOT_SET } from './VALUE_NOT_SET';
export const useAsync = (asyncFunction, deps) => {
    const [status, setStatus] = useState('idle');
    const [value, setValue] = useState(VALUE_NOT_SET);
    const [error, setError] = useState(VALUE_NOT_SET);
    // The execute function wraps asyncFunction and
    // handles setting state for pending, value, and error.
    // useCallback ensures the below useEffect is not called
    // on every render, but only if asyncFunction changes.
    const execute = useCallback(async () => {
        setStatus('pending');
        setValue(VALUE_NOT_SET);
        setError(VALUE_NOT_SET);
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
    useEffect(() => {
        execute();
    }, [execute,]);
    return [status, value, error];
};
//# sourceMappingURL=use-async.js.map