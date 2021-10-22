import { Observable } from './observable';
import { Thunk } from './thunk';

interface Thunk_Copy<T> extends Thunk<T> { }
export type AnyTypeOf<T, TYield> =
  | T
  | Thunk_Copy<AnyTypeOf<T, TYield>>
  | Observable<AnyTypeOf<T, TYield>>
  | PromiseLike<AnyTypeOf<T, TYield>>
  | Generator<AnyTypeOf<T, TYield>, AnyTypeOf<T, TYield>|void, TYield>
  | AsyncGenerator<AnyTypeOf<T, TYield>, AnyTypeOf<T, TYield>|void, TYield>
  | Iterable<AnyTypeOf<T, TYield>>
  | AsyncIterable<AnyTypeOf<T, TYield>>
  ;
