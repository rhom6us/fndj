import { Observable } from './observable';
import { Thunk } from './thunk';
interface Thunk_Copy<T> extends Thunk<T> {
}
export declare type AnyTypeOf<T, TYield> = void | T | Thunk_Copy<AnyTypeOf<T, TYield>> | Observable<AnyTypeOf<T, TYield>> | PromiseLike<AnyTypeOf<T, TYield>> | Generator<AnyTypeOf<T, TYield>, AnyTypeOf<T, TYield>, TYield> | AsyncGenerator<AnyTypeOf<T, TYield>, AnyTypeOf<T, TYield>, TYield> | Iterable<AnyTypeOf<T, TYield>> | AsyncIterable<AnyTypeOf<T, TYield>>;
export {};
//# sourceMappingURL=any-type-of.d.ts.map