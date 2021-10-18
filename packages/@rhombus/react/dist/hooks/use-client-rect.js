import { useState, useCallback } from 'react';
export function useClientRect(initialState) {
    const [rect, setRect] = useState(DOMRectReadOnly.fromRect(initialState));
    const ref = useCallback((node) => {
        if (node !== null) {
            setRect(node.getBoundingClientRect());
        }
    }, []);
    return [rect, ref];
}
//# sourceMappingURL=use-client-rect.js.map