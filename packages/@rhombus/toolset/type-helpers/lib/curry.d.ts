import { Length, PartialList, Skip } from './array';
import { Inc } from './counter';
declare namespace R {
    const __: unique symbol;
}
declare type __ = typeof R.__;
declare type GapOf<TProvided extends any[], TTarget extends any[], TGapped extends any[], i extends number> = TProvided[i] extends __ ? [...TGapped, TTarget[i]] : TGapped;
declare type GapsOf<TProvided extends any[], TTarget extends any[], TGapped extends any[] = [], i extends number = 0> = i extends Length<TProvided> ? [...TGapped, ...Skip<i, TTarget>] : GapsOf<TProvided, TTarget, GapOf<TProvided, TTarget, TGapped, i>, Inc<i>>;
declare type PartialGaps<T extends any[]> = T extends [infer X, ...infer Y] ? [X | __, ...PartialGaps<Y>] : [];
declare type Gaps<T extends any[]> = PartialList<PartialGaps<T>>;
declare type _CurryWithGaps<TArgs extends any[], TReturn> = <T extends Gaps<TArgs>>(...args: T) => GapsOf<T, TArgs> extends [any, ...any[]] ? _CurryWithGaps<GapsOf<T, TArgs>, TReturn> : TReturn;
declare type CurryWithGaps<F extends ((...args: any) => any)> = _CurryWithGaps<Parameters<F>, ReturnType<F>>;
export declare type Curry<T extends ((...args: any) => any)> = CurryWithGaps<T>;
export declare function curry<TFn extends (...args: any) => any>(fn: TFn): Curry<TFn>;
export {};
//# sourceMappingURL=curry.d.ts.map