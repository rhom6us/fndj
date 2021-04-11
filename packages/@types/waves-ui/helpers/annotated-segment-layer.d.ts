/**
 * Helper to create a annotated segment layer.
 *
 * [example usage](./examples/layer-segment.html)
 */
export default class AnnotatedSegmentLayer<T extends any[]> extends Layer<T> {
    /**
     * @param {Array} data - The data to render.
     * @param {Object} options - An object to configure the layer.
     * @param {Object} accessors - The accessors to configure the mapping
     *    between shapes and data.
     */
    constructor(data: T, options?: any, accessors?: any);
}
import Layer from "../core/layer";
//# sourceMappingURL=annotated-segment-layer.d.ts.map
