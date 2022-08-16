import { useCallback, useEffect, useState } from 'react';
import {} from '@rhombus-toolkit/async-timers';
console.log('defining');
export function useThrottledState<T>(initialValue: T, ms: number) {
    const [value, setValue] = useState(initialValue);
    const [throttledValue, setThrottledValue] = useState(value);
    const [, setToken] = useState<number | void>();
    const cancelUpdate = useCallback((token: number | void) => clearTimeout(token!), []);
    const updateValue = useCallback(() => {
        setThrottledValue(value);
        setToken(cancelUpdate);
    }, [cancelUpdate, value]);
    useEffect(() => {
        setToken(window.setTimeout(updateValue, ms));
        return () => setToken(cancelUpdate);

    }, [cancelUpdate, updateValue, ms]);
    return [value, setValue, throttledValue, () => updateValue()] as const;
}
