import BaseShape, { Accessor, DatumAccessor } from "./base-shape";

export interface DotAccessor<T> extends Accessor<T> {
    cx: DatumAccessor<T, number>;
    cy: DatumAccessor<T, number>;
    r: DatumAccessor<T, number>;
    color: DatumAccessor<T, number>;
}

export interface DotOptions { }
/**
 * A shape to display a dot.
 *
 * [example usage](./examples/layer-breakpoint.html)
 */
export default class Dot extends BaseShape {
}
