import BaseShape, { Accessor, DatumAccessor } from "./base-shape";

export interface TracePathAccessor<T> extends Accessor<T> {
    x: DatumAccessor<T, number>;
    mean: DatumAccessor<T, number>;
    range: DatumAccessor<T, number>;
}
export interface TracePathOptions {

    rangeColor: string;
    meanColor: string;
    displayMean: boolean;
}
/**
 * A shape to display paths in a trace visualization (mean / range). (entity shape)
 *
 * [example usage](./examples/layer-trace.html)
 */
export default class TracePath extends BaseShape {
    $range: Element;
    $mean: Element;
    _buildMeanLine(renderingContext: any, data: any): string;
    _buildRangeZone(renderingContext: any, data: any): string;
}
