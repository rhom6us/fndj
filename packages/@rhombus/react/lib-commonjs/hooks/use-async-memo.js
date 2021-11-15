"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAsyncMemo = void 0;
const use_promise_1 = require("./use-promise");
function useAsyncMemo(factory, ...args) {
    const [defaultValue, deps] = args.length === 2 ? args : [undefined, args[0]];
    const [ready, result] = (0, use_promise_1.usePromise)(factory, deps);
    return ready ? result : defaultValue;
}
exports.useAsyncMemo = useAsyncMemo;
//# sourceMappingURL=use-async-memo.js.map