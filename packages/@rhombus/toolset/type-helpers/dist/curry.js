// eslint-disable-next-line @typescript-eslint/no-namespace
var R;
(function (R) {
    R.__ = Symbol('__');
})(R || (R = {}));
;
function _curry(fn, ...args) {
    if (args.length < fn.length) {
        return (...subargs) => _curry(fn, ...args, ...subargs);
    }
    return fn(...args);
}
function _curry2(f) {
    const _args = Array(f.length).fill(R.__);
    if (!_args.length) {
        return f();
    }
    let argIndex = 0;
    return function doit(...args) {
        for (let i = 0; i < args.length; i++) {
            _args[argIndex + i] = args[i];
        }
        argIndex += args.length;
        if (argIndex < f.length) {
            return doit;
        }
        return (function tryFillGaps() {
            const _gaps = _args.filter(p => p === R.__);
            if (!_gaps.length) {
                return f(..._args);
            }
            let gapIndex = 0;
            return function fillGaps(...gaps) {
                for (let i = 0; i < gaps.length; i++) {
                    _gaps[gapIndex + i] = gaps[i];
                }
                gapIndex += gaps.length;
                if (gapIndex < _gaps.length) {
                    return fillGaps;
                }
                while (_gaps.length) {
                    _args[_args.lastIndexOf(R.__)] = _gaps.pop();
                }
                return tryFillGaps();
            };
        }());
    };
}
export function curry(fn) {
    return _curry(fn);
}
function test(a, b, c) {
    return 44;
}
const testc = curry(test);
const testr = testc('asdf', true); //("asdf");//(new Date());
//# sourceMappingURL=curry.js.map