import events from 'events';
import ns from './namespace';
import scales from '../utils/scales';
import Segment, { SegmentAccessor, SegmentOptions } from '../shapes/segment';
import TimeContextBehavior from '../behaviors/time-context-behavior';

import BaseBehavior from '../behaviors/base-behavior';
import BaseShape, { Accessor } from '../shapes/base-shape';
import LayerTimeContext from './layer-time-context';
import Marker, { MarkerAccessor, MarkerOptions } from '../shapes/marker';
import AnnotatedMarker, { AnnotatedMarkerAccessor, AnnotatedMarkerOptions } from '../shapes/annotated-marker';
import AnnotatedSegment, { AnnotatedSegmentAccessor, AnnotatedSegmentOptions } from '../shapes/annotated-segment';
import Cursor, { CursorAccessor, CursorOptions } from '../shapes/cursor';
import Dot, { DotAccessor, DotOptions } from '../shapes/dot';
import Line, { LineAccessor, LineOptions } from '../shapes/line';
import Ticks, { TicksAccessor, TicksOptions } from '../shapes/ticks';
import Waveform, { WaveformAccessor, WaveformOptions } from '../shapes/waveform';
import TraceDots, { TraceDotsAccessor, TraceDotsOptions } from '../shapes/trace-dots';
import TracePath, { TracePathAccessor, TracePathOptions } from '../shapes/trace-path';

export type DataType = 'entity' | 'collection';
export type Datum<T> =
    T extends Array<infer R> ? R :
    T extends Float32Array ? number :
    T;

export type Domain = [min: number, max: number];
export interface LayerOptions {
    height: number;
    top: number;
    opacity: number;
    yDomain: Domain;
    className: string;
    selectedClassName: string;
    contextHandlerWidth: number;
    hittable: number;
    channel: number;
    color: string;
    renderingStrategy: 'svg' | 'canvas';
}

/**
 * The layer class is the main visualization class. It is mainly defines by its
 * related `LayerTimeContext` which determines its position in the overall
 * timeline (through the `start`, `duration`, `offset` and `stretchRatio`
 * attributes) and by it's registered Shape which defines how to display the
 * data associated to the layer. Each created layer must be inserted into a
 * `Track` instance in order to be displayed.
 *
 * _Note: in the context of the layer, an __item__ is the SVG element
 * returned by a `Shape` instance and associated with a particular __datum__._
 *
 * ### Layer DOM structure
 * ```
 * <g class="layer" transform="translate(${start}, 0)">
 *   <svg class="bounding-box" width="${duration}">
 *     <g class="offset" transform="translate(${offset, 0})">
 *       <!-- background -->
 *       <rect class="background"></rect>
 *       <!-- shapes and common shapes are inserted here -->
 *     </g>
 *     <g class="interactions"><!-- for feedback --></g>
 *   </svg>
 * </g>
 * ```
 */
export default class Layer<TData = any, TOptions = LayerOptions> {
    /**
     * Allows to override default the `TimeContextBehavior` used to edit the layer.
     *
     * @param {Object} ctor
     */
    static configureTimeContextBehavior(ctor: typeof TimeContextBehavior): void;
    /**
     * @param {DataType} dataType - Defines how the layer should look at the data.
     *    Can be 'entity' or 'collection'.
     * @param {(Array|Object)} data - The data associated to the layer.
     * @param {Object} options - Configures the layer.
     * @param {Number} [options.height=100] - Defines the height of the layer.
     * @param {Number} [options.top=0] - Defines the top position of the layer.
     * @param {Number} [options.opacity=1] - Defines the opacity of the layer.
     * @param {Domain} [options.yDomain=[0,1]] - Defines boundaries of the data
     *    values in y axis (for exemple to display an audio buffer, this attribute
     *    should be set to [-1, 1].
     * @param {String} [options.className=null] - An optionnal class to add to each
     *    created shape.
     * @param {String} [options.selectedClassName='selected'] - The class to add to a shape
     *    when selected.
     * @param {Number} [options.contextHandlerWidth=2] - The width of the handlers
     *    displayed to edit the layer.
     * @param {Number} [options.hittable=false] - Defines if the layer can be interacted
     *    with. Basically, the layer is not returned by `BaseState.getHitLayers` when
     *    set to false (a common use case is a layer that contains a cursor)
     */
    constructor(dataType: DataType, data: TData, options?: Partial<TOptions>);
    /**
     * Parameters of the layers, `defaults` overrided with options.
     * @type {LayerOptions}
     */
    params: Partial<TOptions>;
    /**
     * Defines how the layer should look at the data (`'entity'` or `'collection'`).
     * @type {DataType}
     */
    dataType: DataType;
    /** @type {LayerTimeContext} */
    timeContext: LayerTimeContext;
    /** @type {Element} */
    $el: Element;
    /** @type {Element} */
    $background: Element;
    /** @type {Element} */
    $boundingBox: Element;
    /** @type {Element} */
    $offset: Element;
    /** @type {Element} */
    $interactions: Element;
    /**
     * A Segment instanciated to interact with the Layer itself.
     * @type {Segment}
     */
    contextShape: Segment;
    // _shapeConfiguration: {
    //     ctor: any;
    //     accessors: any;
    //     options: any;
    // };
    // _commonShapeConfiguration: {
    //     ctor: any;
    //     accessors: any;
    //     options: any;
    // };
    // _$itemShapeMap: Map<any, any>;
    // _$itemDataMap: Map<any, any>;
    // _$itemCommonShapeMap: Map<any, any>;
    // _isContextEditable: boolean;
    // _behavior: any;
    /**
     * Sets the data associated with the layer.
     *
     * @type {Object|Object[]}
     */
    set data(arg: TData);
    /**
     * Returns the data associated to the layer.
     *
     * @type {Object[]}
     */
    get data(): TData;
    // _valueToPixel: any;
    /**
     * Destroy the layer, clear all references.
     */
    destroy(): void;
    /**
     * Sets `LayerTimeContext`'s `start` time domain value.
     *
     * @type {Number}
     */
    set start(arg: number);
    /**
     * Returns `LayerTimeContext`'s `start` time domain value.
     *
     * @type {Number}
     */
    get start(): number;
    /**
     * Sets `LayerTimeContext`'s `offset` time domain value.
     *
     * @type {Number}
     */
    set offset(arg: number);
    /**
     * Returns `LayerTimeContext`'s `offset` time domain value.
     *
     * @type {Number}
     */
    get offset(): number;
    /**
     * Sets `LayerTimeContext`'s `duration` time domain value.
     *
     * @type {Number}
     */
    set duration(arg: number);
    /**
     * Returns `LayerTimeContext`'s `duration` time domain value.
     *
     * @type {Number}
     */
    get duration(): number;
    /**
     * Sets `LayerTimeContext`'s `stretchRatio` time domain value.
     *
     * @type {Number}
     */
    set stretchRatio(arg: number);
    /**
     * Returns `LayerTimeContext`'s `stretchRatio` time domain value.
     *
     * @type {Number}
     */
    get stretchRatio(): number;
    /**
     * Set the domain boundaries of the data for the y axis.
     *
     * @type {Domain}
     */
    set yDomain(arg: Domain);
    /**
     * Returns the domain boundaries of the data for the y axis.
     *
     * @type {Domain}
     */
    get yDomain(): Domain;
    /**
     * Sets the opacity of the whole layer.
     *
     * @type {Number}
     */
    set opacity(arg: number);
    /**
     * Returns the opacity of the whole layer.
     *
     * @type {Number}
     */
    get opacity(): number;
    /**
     * Returns the transfert function used to display the data in the x axis.
     *
     * @type {Number}
     */
    get timeToPixel(): number;
    /**
     * Returns the transfert function used to display the data in the y axis.
     *
     * @type {Number}
     */
    get valueToPixel(): number;
    /**
     * Returns an array containing all the displayed items.
     *
     * @type {Array<Element>}
     */
    get items(): Element[];
    private _data: TData;
    /**
     * Renders the DOM in memory on layer creation to be able to use it before
     * the layer is actually inserted in the DOM.
     */
    private _renderContainer(): void;
    /**
     * Sets the context of the layer, thus defining its `start`, `duration`,
     * `offset` and `stretchRatio`.
     *
     * @param {TimeContext} timeContext - The timeContext in which the layer is displayed.
     */
    setTimeContext(timeContext: LayerTimeContext): void;
    // _renderingContext: {};
    /**
     * Register a shape and its configuration to use in order to render the data.
     *
     * @param {BaseShape} ctor - The constructor of the shape to be used.
     * @param {Object} [accessors={}] - Defines how the shape should adapt to a particular data struture.
     * @param {Object} [options={}] - Global configuration for the shapes, is specific to each `Shape`.
     */
    configureShape(ctor: typeof AnnotatedMarker, accessors?: Partial<AnnotatedMarkerAccessor<Datum<TData>>>, options?: Partial<AnnotatedMarkerOptions>): void;
    configureShape(ctor: typeof AnnotatedSegment, accessors?: Partial<AnnotatedSegmentAccessor<Datum<TData>>>, options?: Partial<AnnotatedSegmentOptions>): void;
    configureShape(ctor: typeof Cursor, accessors?: Partial<CursorAccessor<Datum<TData>>>, options?: Partial<CursorOptions>): void;
    configureShape(ctor: typeof Dot, accessors?: Partial<DotAccessor<Datum<TData>>>, options?: Partial<DotOptions>): void;
    configureShape(ctor: typeof Line, accessors?: Partial<LineAccessor<Datum<TData>>>, options?: Partial<LineOptions>): void;
    configureShape(ctor: typeof Marker, accessors?: Partial<MarkerAccessor<Datum<TData>>>, options?: Partial<MarkerOptions>): void;
    configureShape(ctor: typeof Segment, accessors?: Partial<SegmentAccessor<Datum<TData>>>, options?: Partial<SegmentOptions>): void;
    configureShape(ctor: typeof Ticks, accessors?: Partial<TicksAccessor<Datum<TData>>>, options?: Partial<TicksOptions>): void;
    configureShape(ctor: typeof TraceDots, accessors?: Partial<TraceDotsAccessor<Datum<TData>>>, options?: Partial<TraceDotsOptions>): void;
    configureShape(ctor: typeof TracePath, accessors?: Partial<TracePathAccessor<Datum<TData>>>, options?: Partial<TracePathOptions>): void;
    configureShape(ctor: typeof Waveform, accessors?: Partial<WaveformAccessor<Datum<TData>>>, options?: Partial<WaveformOptions>): void;
    configureShape<T extends typeof BaseShape>(ctor: T, accessors?: Accessor<Datum<TData>>, options?: any): void;
    /**
     * Optionnaly register a shape to be used accros the entire collection.
     *
     * @param {BaseShape} ctor - The constructor of the shape to be used.
     * @param {Object} [accessors={}] - Defines how the shape should adapt to a particular data struture.
     * @param {Object} [options={}] - Global configuration for the shapes, is specific to each `Shape`.
     */
    configureCommonShape(ctor: typeof AnnotatedMarker, accessors?: Partial<AnnotatedMarkerAccessor<Datum<TData>>>, options?: Partial<AnnotatedMarkerOptions>): void;
    configureCommonShape(ctor: typeof AnnotatedSegment, accessors?: Partial<AnnotatedSegmentAccessor<Datum<TData>>>, options?: Partial<AnnotatedSegmentOptions>): void;
    configureCommonShape(ctor: typeof Cursor, accessors?: Partial<CursorAccessor<Datum<TData>>>, options?: Partial<CursorOptions>): void;
    configureCommonShape(ctor: typeof Dot, accessors?: Partial<DotAccessor<Datum<TData>>>, options?: Partial<DotOptions>): void;
    configureCommonShape(ctor: typeof Line, accessors?: Partial<LineAccessor<Datum<TData>>>, options?: Partial<LineOptions>): void;
    configureCommonShape(ctor: typeof Marker, accessors?: Partial<MarkerAccessor<Datum<TData>>>, options?: Partial<MarkerOptions>): void;
    configureCommonShape(ctor: typeof Segment, accessors?: Partial<SegmentAccessor<Datum<TData>>>, options?: Partial<SegmentOptions>): void;
    configureCommonShape(ctor: typeof Ticks, accessors?: Partial<TicksAccessor<Datum<TData>>>, options?: Partial<TicksOptions>): void;
    configureCommonShape(ctor: typeof TraceDots, accessors?: Partial<TraceDotsAccessor<Datum<TData>>>, options?: Partial<TraceDotsOptions>): void;
    configureCommonShape(ctor: typeof TracePath, accessors?: Partial<TracePathAccessor<Datum<TData>>>, options?: Partial<TracePathOptions>): void;
    configureCommonShape(ctor: typeof Waveform, accessors?: Partial<WaveformAccessor<Datum<TData>>>, options?: Partial<WaveformOptions>): void;
    configureCommonShape<T extends typeof BaseShape>(ctor: typeof T, accessors?: Accessor<TData>, options?: any): void;
    /**
     * Register the behavior to use when interacting with a shape.
     *
     * @param {BaseBehavior} behavior
     */
    setBehavior<T extends BaseBehavior>(behavior: T): void;
    /**
     * Updates the values stored int the `_renderingContext` passed  to shapes
     * for rendering and updating.
     */
    private _updateRenderingContext(): void;
    /**
     * Returns the items marked as selected.
     *
     * @type {Array<Element>}
     */
    get selectedItems(): Element[];
    /**
     * Mark item(s) as selected.
     *
     * @param {Element|Element[]} $items
     */
    select(...$items: Element[]): void;
    /**
     * Removes item(s) from selected items.
     *
     * @param {Element|Element[]} $items
     */
    unselect(...$items: Element[]): void;
    /**
     * Toggle item(s) selection state according to their current state.
     *
     * @param {Element|Element[]} $items
     */
    toggleSelection(...$items: Element[]): void;
    /**
     * Edit item(s) according to the `edit` defined in the registered `Behavior`.
     *
     * @param {Element|Element[]} $items - The item(s) to edit.
     * @param {Number} dx - The modification to apply in the x axis (in pixels).
     * @param {Number} dy - The modification to apply in the y axis (in pixels).
     * @param {Element} $target - The target of the interaction (for example, left
     *    handler DOM element in a segment).
     */
    edit($items: Element | Element[], dx: number, dy: number, $target: Element): void;
    /**
     * Defines if the `Layer`, and thus the `LayerTimeContext` is editable or not.
     *
     * @params {Boolean} [bool=true]
     */
    setContextEditable(bool?: boolean): void;
    /**
     * Edit the layer and thus its related `LayerTimeContext` attributes.
     *
     * @param {Number} dx - The modification to apply in the x axis (in pixels).
     * @param {Number} dy - The modification to apply in the y axis (in pixels).
     * @param {Element} $target - The target of the event of the interaction.
     */
    editContext(dx: number, dy: number, $target: Element): void;
    /**
     * Stretch the layer and thus its related `LayerTimeContext` attributes.
     *
     * @param {Number} dx - The modification to apply in the x axis (in pixels).
     * @param {Number} dy - The modification to apply in the y axis (in pixels).
     * @param {Element} $target - The target of the event of the interaction.
     */
    stretchContext(dx: number, dy: number, $target: Element): void;
    /**
     * Returns an item from a DOM element related to the shape, null otherwise.
     *
     * @param {Element} $el - the element to be tested
     * @return {Element|null}
     */
    getItemFromDOMElement($el: Element): Element | null;
    /**
     * Returns the datum associated to a specific item.
     *
     * @param {Element} $item
     * @return {Object|Array|null}
     */
    getDatumFromItem($item: Element): TData | null;
    /**
     * Returns the datum associated to a specific item from any DOM element
     * composing the shape. Basically a shortcut for `getItemFromDOMElement` and
     * `getDatumFromItem` methods.
     *
     * @param {Element} $el
     * @return {Object|Array|null}
     */
    getDatumFromDOMElement($el: Element): TData | null;
    /**
     * Tests if the given DOM element is an item of the layer.
     *
     * @param {Element} $item - The item to be tested.
     * @return {Boolean}
     */
    hasItem($item: Element): boolean;
    /**
     * Defines if a given element belongs to the layer. Is more general than
     * `hasItem`, can mostly used to check interactions elements.
     *
     * @param {Element} $el - The DOM element to be tested.
     * @return {bool}
     */
    hasElement($el: Element): boolean;
    /**
     * Retrieve all the items in a given area as defined in the registered `Shape~inArea` method.
     *
     * @param {Object} area - The area in which to find the elements
     * @param {Number} area.top
     * @param {Number} area.left
     * @param {Number} area.width
     * @param {Number} area.height
     * @return {Array} - list of the items presents in the area
     */
    getItemsInArea(area: {
        top: number;
        left: number;
        width: number;
        height: number;
    }): Element[];
    /**
     * Moves an item to the end of the layer to display it front of its
     * siblings (svg z-index...).
     *
     * @param {Element} $item - The item to be moved.
     */
    private _toFront($item: Element): void;
    /**
     * Create the DOM structure of the shapes according to the given data. Inspired
     * from the `enter` and `exit` d3.js paradigm, this method should be called
     * each time a datum is added or removed from the data. While the DOM is
     * created the `update` method must be called in order to update the shapes
     * attributes and thus place them where they should.
     */
    render(): void;
    /**
     * Updates the container of the layer and the attributes of the existing shapes.
     */
    update(): void;
    /**
     * Updates the container of the layer.
     */
    updateContainer(): void;
    /**
     * Updates the attributes of all the `Shape` instances rendered into the layer.
     *
     * @todo - allow to filter which shape(s) should be updated.
     */
    updateShapes(): void;
}

//# sourceMappingURL=layer.d.ts.map
