import BaseShape, { Accessor, DatumAccessor } from "./base-shape";

export interface CursorAccessor<T> extends Accessor<T> {
    x: DatumAccessor<T, number>;
}
export interface CursorOptions {
    color: string;
    opacity: number;
}
/**
 * A shape to display a cursor.
 *
 * [example usage](./examples/layer-cursor.html)
 */
export default class Cursor extends BaseShape {
}
