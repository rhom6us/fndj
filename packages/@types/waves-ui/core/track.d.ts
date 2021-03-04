/**
 * Acts as a placeholder to organize the vertical layout of the visualization
 * and the horizontal alignement to an abscissa that correspond to a common
 * time reference. It basically offer a view on the overall timeline.
 *
 * Tracks are inserted into a given DOM element, allowing to create DAW like
 * representations. Each `Track` instance can host multiple `Layer` instances.
 * A track must be added to a timeline before being updated.
 *
 * ### A timeline with 3 tracks:
 *
 * ```
 * 0                 6                               16
 * +- - - - - - - - -+-------------------------------+- - - - - - -
 * |                 |x track 1 xxxxxxxxxxxxxxxxxxxxx|
 * +- - - - - - - - -+-------------------------------+- - - - - - -
 * |                 |x track 2 xxxxxxxxxxxxxxxxxxxxx|
 * +- - - - - - - - -+-------------------------------+- - - - - - -
 * |                 |x track 3 xxxxxxxxxxxxxxxxxxxxx|
 * +- - - - - - - - ---------------------------------+- - - - - - -
 * +----------------->
 * timeline.timeContext.timeToPixel(timeline.timeContext.offset)
 *
 *                   <------------------------------->
 *                   timeline's tracks defaults to 1000px
 *                   with a default pixelsPerSecond of 100px/s.
 *                   and a default `stretchRatio = 1`
 *                   track1 shows 10 seconds of the timeline
 * ```
 *
 * ### Track DOM structure
 *
 * ```html
 * <svg width="${visibleWidth}">
 *   <!-- background -->
 *   <rect><rect>
 *   <!-- main view -->
 *   <g class="offset" transform="translate(${offset}, 0)">
 *     <g class="layout">
 *       <!-- layers -->
 *     </g>
 *   </g>
 *   <g class="interactions"><!-- for feedback --></g>
 * </svg>
 * ```
 */
export default class Track {
    /**
     * @param {DOMElement} $el
     * @param {Number} [height = 100]
     */
    constructor($el: any, height?: number);
    _height: number;
    /**
     * The DOM element in which the track is created.
     * @type {Element}
     */
    $el: Element;
    /**
     * A placeholder to add shapes for interactions feedback.
     * @type {Element}
     */
    $interactions: Element;
    /** @type {Element} */
    $layout: Element;
    /** @type {Element} */
    $offset: Element;
    /** @type {Element} */
    $svg: Element;
    /** @type {Element} */
    $background: Element;
    /**
     * An array of all the layers belonging to the track.
     * @type {Array<Layer>}
     */
    layers: Array<any>;
    /**
     * The context used to maintain the DOM structure of the track.
     * @type {TimelineTimeContext}
     */
    renderingContext: any;
    /**
     * Sets the height of the track.
     *
     * @todo propagate to layers, keeping ratio? could be handy for vertical
     *    resize. This is why a set/get is implemented here.
     * @type {Number}
     */
    set height(arg: number);
    /**
     * Returns the height of the track.
     *
     * @type {Number}
     */
    get height(): number;
    /**
     * This method is called when the track is added to the timeline. The
     * track cannot be updated without being added to a timeline.
     *
     * @private
     * @param {TimelineTimeContext} renderingContext
     */
    private configure;
    /**
     * Destroy the track. The layers from this track can still be reused elsewhere.
     */
    destroy(): void;
    /**
     * Creates the DOM structure of the track.
     */
    _createContainer(): void;
    /**
     * Adds a layer to the track.
     *
     * @param {Layer} layer - the layer to add to the track.
     */
    add(layer: any): void;
    /**
     * Removes a layer from the track. The layer can be reused elsewhere.
     *
     * @param {Layer} layer - the layer to remove from the track.
     */
    remove(layer: any): void;
    /**
     * Tests if a given element belongs to the track.
     *
     * @param {Element} $el
     * @return {bool}
     */
    hasElement($el: Element): any;
    /**
     * Render all the layers added to the track.
     */
    render(): void;
    /**
     * Updates the track DOM structure and updates the layers.
     *
     * @param {Array<Layer>} [layers=null] - if not null, a subset of the layers to update.
     */
    update(layers?: Array<any>): void;
    /**
     * Updates the track DOM structure.
     */
    updateContainer(): void;
    /**
     * Updates the layers.
     *
     * @param {Array<Layer>} [layers=null] - if not null, a subset of the layers to update.
     */
    updateLayers(layers?: Array<any>): void;
    /**
     * Iterates through the added layers.
     */
    [Symbol.iterator](): Generator<any, void, undefined>;
}
//# sourceMappingURL=track.d.ts.map