declare const $CombinedState: unique symbol;
interface EmptyObject {
    readonly [$CombinedState]?: undefined;
}
export declare type CombinedState<S> = EmptyObject & S;
/**
 * Recursively makes combined state objects partial. Only combined state _root
 * objects_ (i.e. the generated higher level object with keys mapping to
 * individual reducers) are partial.
 */
export declare type PreloadedState<S> = Required<S> extends EmptyObject ? S extends CombinedState<infer S1> ? {
    [K in keyof S1]?: S1[K] extends object ? PreloadedState<S1[K]> : S1[K];
} : never : {
    [K in keyof S]: S[K] extends string | number | boolean | symbol ? S[K] : PreloadedState<S[K]>;
};
export {};
/**
 *
 * this function needs to:
 * take in a Record<string, CommandFnOrMap>
 * - keys in this record must correspond to State shape
 * - these command functions must take in and return the sliced state type
 *
 *
 */
//# sourceMappingURL=combine-commands.d.ts.map