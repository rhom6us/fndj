export type Opaque<T> = T & { readonly __opaque: unique symbol; };
type InferOpaqueType<T extends Opaque<any>> = T extends Opaque<infer V> ? V : never;

const OpaqueFactory = <T extends Opaque<any>>() => (value: InferOpaqueType<T>) => value as T;


type SongId = Opaque<number>;
const SongId = OpaqueFactory<SongId>();
/** The set of numeric operations required to fully represent a `GenericMeasure` for a given numeric type */
export interface NumericOperations<N> {
    /** Returns the multiplicative identity for numbers of type N */
    one(): N;
    /** Returns the negative of a number of type N */
    neg(value: N): N;
    /** Returns the sum of two numbers of type N */
    add(left: N, right: N): N;
    /** Returns the difference of two numbers of type N */
    sub(left: N, right: N): N;
    /** Returns the product of two numbers of type N */
    mult(left: N, right: N): N;
    /** Returns the quotient of two numbers of type N */
    div(left: N, right: N): N;
    /** Returns the base raised to the exponent for numbers of type N */
    pow(base: N, exponent: number): N;
    /** Compares two numbers returning a negative, zero, or positive value. */
    compare(left: N, right: N): number;
    /** Formats a number for display */
    format(value: N): string;
}
const numericOps: NumericOperations<number> = {
    one: () => 1,
    neg: x => -x,
    add: (x, y) => x + y,
    sub: (x, y) => x - y,
    mult: (x, y) => x * y,
    div: (x, y) => x / y,
    pow: (x, y) => x ** y,
    compare: (x, y) => x - y,
    format: x => `${x}`,
};

import {createMeasureClass} from 'safe-units/src/measure/genericMeasureClass';
import { Unit, UnitWithSymbols, seconds } from 'safe-units';
const Measure = createMeasureClass(numericOps);
class omg<U extends Unit> extends Measure<U> {
    constructor(value: number, unit: UnitWithSymbols<U>, symbol?: string | undefined) {
        super(value, unit, symbol);
    }
}

var ooh = new omg(3, seconds.unit);