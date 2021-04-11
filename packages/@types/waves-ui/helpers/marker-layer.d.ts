/**
 * Helper to create a marker layer.
 *
 * [example usage](./examples/layer-breakpoint.html)
 */
export default class MarkerLayer<T extends any[]> extends Layer<T> {
    /**
     * @param {Array} data - The data to render.
     * @param {Object} options - An object to configure the layer.
     * @param {Object} accessors - The accessors to configure the mapping
     *    between shapes and data.
     */
    constructor(data: T, options?: any, accessors?: MarkerAccessor<Datum<T>>);
}
import Layer, { Datum } from "../core/layer";
import { MarkerAccessor } from '../shapes/marker';
//# sourceMappingURL=marker-layer.d.ts.map
