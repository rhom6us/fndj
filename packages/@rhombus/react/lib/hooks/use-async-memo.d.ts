import { AsyncFunc } from '@rhombus/func';
import { DependencyList } from 'react';
export declare function useAsyncMemo<T>(factory: AsyncFunc<[], T>, deps: DependencyList | undefined): T | undefined;
export declare function useAsyncMemo<T, D>(factory: AsyncFunc<[], T>, defaultValue: D, deps: DependencyList | undefined): T | D;
//# sourceMappingURL=use-async-memo.d.ts.map