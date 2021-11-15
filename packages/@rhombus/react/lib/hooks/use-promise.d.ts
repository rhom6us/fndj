import { AsyncFunc } from '@rhombus/func';
import { DependencyList } from 'react';
/**
 * @param promise make DAMN sure that the identity of the promise is stable
 */
export declare function usePromise<T>(factory: AsyncFunc<[], T>, deps: DependencyList | undefined): [false] | [true, T];
//# sourceMappingURL=use-promise.d.ts.map