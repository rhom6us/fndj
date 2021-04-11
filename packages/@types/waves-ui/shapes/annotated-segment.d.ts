
import { DatumAccessor } from './base-shape';
import Segment, { SegmentAccessor, SegmentOptions } from "./segment";


export interface AnnotatedSegmentAccessor<T> extends SegmentAccessor<T> {
    text: DatumAccessor<T, string>;
}
export interface AnnotatedSegmentOptions extends SegmentOptions { }

/**
 * A shape to display a segment with annotation.
 *
 * [example usage](./examples/layer-segment.html)
 */
export default class AnnotatedSegment extends Segment {
    $label: Element;
}
