import { useState, useCallback, useEffect } from 'react';


export const useAsync = <T>(asyncFunction: () => Promise<T>, deps: any[]) => {
    const [status, setStatus] = useState("idle");
    const [value, setValue] = useState<T | null>(null);
    const [error, setError] = useState(null);
    // The execute function wraps asyncFunction and
    // handles setting state for pending, value, and error.
    // useCallback ensures the below useEffect is not called
    // on every render, but only if asyncFunction changes.
    const execute = useCallback(() => {
        setStatus("pending");
        setValue(null);
        setError(null);
        return asyncFunction()
            .then((response) => {
                setValue(response);
                setStatus("success");
            })
            .catch((error) => {
                setError(error);
                setStatus("error");
            });
    }, [asyncFunction, deps]);
    // Call execute if we want to fire it right away.
    // Otherwise execute can be called later, such as
    // in an onClick handler.
    useEffect(() => {
        execute();
    }, [execute, deps]);
    return [status, value, error];
};
