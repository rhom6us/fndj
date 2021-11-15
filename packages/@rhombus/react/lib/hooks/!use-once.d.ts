import { Action, Func } from '@rhombus/func';
export declare function useDoOnce(fn: Action<[]>): void;
export declare function useInitOnce<T>(fn: Func<[], T>, ...deps: any[]): T | undefined;
export declare function useOnceReady(fn: Action<[]>, deps: any[]): void;
//# sourceMappingURL=!use-once.d.ts.map