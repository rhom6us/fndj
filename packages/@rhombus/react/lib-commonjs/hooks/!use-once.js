"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOnceReady = exports.useInitOnce = exports.useDoOnce = void 0;
const react_1 = require("react");
function useDoOnce(fn) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return (0, react_1.useEffect)(fn, []);
}
exports.useDoOnce = useDoOnce;
function useInitOnce(fn, ...deps) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return (0, react_1.useMemo)(() => {
        if (deps.some(p => p === undefined || p === null)) {
            return undefined;
        }
        return fn();
    }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}
exports.useInitOnce = useInitOnce;
function useOnceReady(fn, deps) {
    (0, react_1.useEffect)(() => {
        if (deps.some(p => p === undefined)) {
            return;
        }
        fn();
    }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}
exports.useOnceReady = useOnceReady;
//# sourceMappingURL=!use-once.js.map