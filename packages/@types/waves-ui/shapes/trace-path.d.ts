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
import BaseShape from "./base-shape";
//# sourceMappingURL=trace-path.d.ts.map