import BaseShape, { Accessor, DatumAccessor } from "./base-shape";

export interface LineAccessor<T> extends Accessor<T> {
    cx: DatumAccessor<T, number>;
    cy: DatumAccessor<T, number>;
}
export interface LineOptions {
    color: string;
}

/**
 * A shape to display a line. Its main use is as common shape to create a
 * breakpoint visualization. (entity shape)
 *
 * [example usage](./examples/layer-breakpoint.html)
 */
export default class Line extends BaseShape {
    _buildLine(renderingContext: any, data: any): string;
}
