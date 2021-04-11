import BaseShape, { Accessor, DatumAccessor } from "./base-shape";

export interface MarkerAccessor<T> extends Accessor<T> {
    x: DatumAccessor<T, number>;
    color: DatumAccessor<T, string>;
}
export interface MarkerOptions {
    handlerWidth: number;
    handlerHeight: number;
    displayHandlers: boolean;
    opacity: number;
    color: string;
}
/**
 * A shape to display a marker.
 *
 * [example usage](./examples/layer-marker.html)
 */
export default class Marker extends BaseShape {
    $line: Element;
    $handler: Element;
    constructor(options?: MarkerOptions);
}
