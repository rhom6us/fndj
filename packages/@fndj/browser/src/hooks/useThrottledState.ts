import { useCallback, useEffect, useState } from 'react';
console.log('defining');
export function useThrottledState<T>(initialValue: T, ms: number) {
    console.log('enter');
    const [value, setValue] = useState(initialValue);
    const [throttledValue, setThrottledValue] = useState(value);
    const [token, setToken] = useState<number | void>();
    const cancelUpdate = useCallback((token: number | void) => clearTimeout(token!), []);
    const updateValue = useCallback((forced = false) => {
        console.log('updatevalue');
        setThrottledValue(value);
        setToken(cancelUpdate);
    }, [cancelUpdate, value]);
    useEffect(() => {
        console.log('useEffect');
        setToken(setTimeout(updateValue, ms));
        return () => setToken(cancelUpdate);

    }, [cancelUpdate, updateValue, ms]);
    console.log('returning');
    return [value, setValue, throttledValue, () => updateValue(true)] as const;
}
console.log('defined');
