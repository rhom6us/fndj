import { DatumAccessor } from './base-shape';
import Marker, { MarkerAccessor, MarkerOptions } from "./marker";

export interface AnnotatedMarkerAccessor<T> extends MarkerAccessor<T> {
    text: DatumAccessor<T, string>;
}

export interface AnnotatedMarkerOptions extends MarkerOptions { }

/**
 * A shape to display a marker with annotation.
 *
 * [example usage](./examples/layer-marker.html)
 */
export default class AnnotatedMarker extends Marker {
    $label: Element;
}
