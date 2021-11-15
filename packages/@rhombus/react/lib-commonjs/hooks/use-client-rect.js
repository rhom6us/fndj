"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useClientRect = void 0;
const react_1 = require("react");
function useClientRect(initialState) {
    const [rect, setRect] = (0, react_1.useState)(DOMRectReadOnly.fromRect(initialState));
    const ref = (0, react_1.useCallback)((node) => {
        if (node !== null) {
            setRect(node.getBoundingClientRect());
        }
    }, []);
    return [rect, ref];
}
exports.useClientRect = useClientRect;
//# sourceMappingURL=use-client-rect.js.map