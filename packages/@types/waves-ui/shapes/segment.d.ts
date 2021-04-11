import BaseShape, { Accessor, DatumAccessor } from "./base-shape";

export interface SegmentAccessor<T> extends Accessor<T> {
    x: DatumAccessor<T, number>;
    y: DatumAccessor<T, number>;
    width: DatumAccessor<T, number>;
    height: DatumAccessor<T, number>;
    color: DatumAccessor<T, string>;
    opacity: DatumAccessor<T, number>;
}
export interface SegmentOptions {
    displayHandlers: boolean;
    handlerWidth: number;
    handlerOpacity: number;
    opacity: number;
}
/**
 * A shape to display a segment.
 *
 * [example usage](./examples/layer-segment.html)
 */
export default class Segment extends BaseShape {
    $segment: Element;
    $leftHandler: Element;
    $rightHandler: Element;
}
