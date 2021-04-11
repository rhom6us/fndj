/**
 * Helper to create a tick layer. Can be seen as a grid axis with user defined data
 * or as a marker layer with entity based data.
 */
export default class TickLayer<T> extends Layer<T> {
    /**
     * @param {Array} data - The data to render.
     * @param {Object} options - An object to configure the layer.
     * @param {Object} accessors - The accessors to configure the mapping
     *    between shapes and data.
     */
    constructor(data: T, options: any, accessors: TicksAccessor<Datum<T>>);
}
import Layer, { Datum } from "../core/layer";
import { TicksAccessor } from '../shapes/ticks';
//# sourceMappingURL=tick-layer.d.ts.map
