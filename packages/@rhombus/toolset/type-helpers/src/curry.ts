import { Length, PartialList, Skip } from './array';
import { Inc } from './counter';

type _CurryBasic<TArgs extends any[], TReturn> =
    <T extends PartialList<TArgs>>(...args: T) =>
        Skip<Length<T>, TArgs> extends [] ? TReturn : _CurryBasic<Skip<Length<T>, TArgs>, TReturn>;

type CurryBasic<TFn extends (...args: any) => any> = _CurryBasic<Parameters<TFn>, ReturnType<TFn>>;


// eslint-disable-next-line @typescript-eslint/no-namespace
namespace R {
    export const __: unique symbol = Symbol('__');
};
type __ = typeof R.__;





type GapOf<TProvided extends any[], TTarget extends any[], TGapped extends any[], i extends number> =
    TProvided[i] extends __
    ? [...TGapped, TTarget[i]]
    : TGapped;
type GapsOf<TProvided extends any[], TTarget extends any[], TGapped extends any[] = [], i extends number = 0> =
    i extends Length<TProvided>
    ? [...TGapped, ...Skip<i, TTarget>]
    : GapsOf<TProvided, TTarget, GapOf<TProvided, TTarget, TGapped, i>, Inc<i>>;

type PartialGaps<T extends any[]> =
    T extends [infer X, ...infer Y] ? [X | __, ...PartialGaps<Y>] : [];
type Gaps<T extends any[]> = PartialList<PartialGaps<T>>;
type _CurryWithGaps<TArgs extends any[], TReturn> =
    <T extends Gaps<TArgs>>(...args: T) =>
        GapsOf<T, TArgs> extends [any, ...any[]]
        ? _CurryWithGaps<GapsOf<T, TArgs>, TReturn>
        : TReturn;
type CurryWithGaps<F extends ((...args: any) => any)> = _CurryWithGaps<Parameters<F>, ReturnType<F>>;

export type Curry<T extends ((...args: any) => any)> = CurryWithGaps<T>;

function _curry(fn: (...args: any) => any, ...args: any): any {
    if (args.length < fn.length) {
        return (...subargs: any) => _curry(fn, ...args, ...subargs);
    }
    return fn(...args);
}

function _curry2<F extends (...args: any) => any>(f: F): any/*Curry<F>*/ {
    const _args = Array(f.length).fill(R.__);
    if (!_args.length) {
        return f();
    }
    let argIndex = 0;
    return function doit(...args: any) {
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
            return function fillGaps(...gaps: any) {
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

export function curry<TFn extends (...args: any) => any>(fn: TFn): Curry<TFn> {
    return _curry(fn);
}
function test(a: "asdf", b: true, c: Date) {
    return 44;
}

const testc = curry(test);

const testr = testc('asdf', true);//("asdf");//(new Date());
