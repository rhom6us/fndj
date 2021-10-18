import { useState, useCallback } from 'react';

export function useClientRect(initialState?: DOMRectInit) {
    const [rect, setRect] = useState(DOMRectReadOnly.fromRect(initialState));
    const ref = useCallback((node: HTMLElement | null) => {
        if (node !== null) {
            setRect(node.getBoundingClientRect());
        }
    }, []);
    return [rect, ref] as const;
}
