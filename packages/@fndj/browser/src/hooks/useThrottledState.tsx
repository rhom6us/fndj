import { useCallback, useEffect, useState } from 'react';

export function useThrottledState<T>(initialValue: T, ms: number) {
    const [value, setValue] = useState(initialValue);
    const [throttledValue, setThrottledValue] = useState(value);
    const [token, setToken] = useState<number | void>();
    const cancelUpdate = useCallback((token: number | void) => clearTimeout(token!), []);
    const updateValue = useCallback((forced = false) => {
        setThrottledValue(value);
        setToken(cancelUpdate);
    }, [cancelUpdate, value]);
    useEffect(() => {
        setToken(setTimeout(updateValue, ms));
        return () => setToken(cancelUpdate);

    }, [cancelUpdate, updateValue, ms]);

    return [value, setValue, throttledValue, () => updateValue(true)] as const;
}
