import BaseShape, { Accessor, DatumAccessor } from "./base-shape";

export interface TraceDotsAccessor<T> extends Accessor<T> {
    x: DatumAccessor<T, number>;
    mean: DatumAccessor<T, number>;
    range: DatumAccessor<T, number>;
}
export interface TraceDotsOptions {
    meanRadius: number,
    rangeRadius: number,
    meanColor: string,
    rangeColor: string;
}
/**
 * A shape to display dots in a trace visualization (mean / range).
 *
 * [example usage](./examples/layer-trace.html)
 */
export default class TraceDots extends BaseShape {
    $mean: Element;
    $max: Element;
    $min: Element;
}
