
export type DatumAccessor<TData, TResult> = (d: TData, v?: TResult) => TResult;
export interface Accessor<TData> {
    [key: string]: DatumAccessor<TData, any>;
}
/**
 * Is an abstract class or interface to be overriden in order to define new
 * shapes. Shapes define the way a given datum should be rendered, they are
 * the smallest unit of rendering into a timeline.
 *
 * All the life cycle of `Shape` instances is handled into the `Layer` instance
 * they are attach to. As a consequence, they should be mainly considered as
 * private objects. The only place they should be interacted with is in `Behavior`
 * definitions, to test which element of the shape is the target of the
 * interaction and define the interaction according to that test.
 *
 * Depending of its implementation a `Shape` can be used along with `entity` or
 * `collection` data type. Some shapes are then created to use data considered
 * as a single entity (Waveform, TracePath, Line), while others are defined to
 * be used with data seen as a collection, each shape rendering a single entry
 * of the collection. The shapes working with entity type data should therefore
 * be used in an `entity` configured `Layer`. Note that if they are registered
 * as "commonShape" in a `collection` type `Layer`, they will behave the exact
 * same way. These kind of shapes are noted: "entity shape".
 *
 * ### Available `collection` shapes:
 * - Marker / Annotated Marker
 * - Segment / Annotated Segment
 * - Dot
 * - TraceDots
 *
 * ### Available `entity` shapes:
 * - Line
 * - Tick (for axis)
 * - Waveform
 * - TracePath
 */
export default abstract class BaseShape {
    /**
     * @param {Object} options - override default configuration
     */
    constructor(options?: any);
    /** @type {Element} - Svg element to be returned by the `render` method. */
    $el: SVGElement;
    /** @type {String} - Svg namespace. */
    ns: string;
    /** @type {Object} - Object containing the global parameters of the shape */
    params: any;
    /**
     * Destroy the shape and clean references. Interface method called from the `layer`.
     */
    destroy(): void;
    /**
     * Interface method to override when extending this base class. The method
     * is called by the `Layer~render` method. Returns the name of the shape,
     * used as a class in the element group (defaults to `'shape'`).
     *
     * @return {String}
     */
    getClassName(): string;
    /**
     * @todo not implemented
     * allow to install defs in the track svg element. Should be called w hen
     * adding the `Layer` to the `Track`.
     */
    /**
     * Returns the defaults for global configuration of the shape.
     * @protected
     * @return {Object}
     */
    protected _getDefaults(): any;
    /**
     * Returns an object where keys are the accessors methods names to create
     * and values are the default values for each given accessor.
     *
     * @protected
     * @todo rename ?
     * @return {Object}
     */
    protected _getAccessorList(): any;
    /**
     * Interface method called by Layer when creating a shape. Install the
     * given accessors on the shape, overriding the default accessors.
     *
     * @param {Object<String, function>} accessors
     */
    install(accessors: any): void;
    /**
     * Generic method to create accessors. Adds getters en setters to the
     * prototype if not already present.
     */
    _createAccessors(accessors: any): void;
    _accessors: {};
    /**
     * Create a function to be used as a default accessor for each accesors
     */
    _setDefaultAccessors(accessors: any): void;
    /**
     * Interface method called by `Layer~render`. Creates the DOM structure of
     * the shape.
     *
     * @param {Object} renderingContext - the renderingContext of the layer
     *    which owns this shape.
     * @return {Element} - the DOM element to insert in the item's group.
     */
    render(renderingContext: any): Element;
    /**
     * Interface method called by `Layer~update`. Updates the DOM structure of the shape.
     *
     * @param {Object} renderingContext - The `renderingContext` of the layer
     *    which owns this shape.
     * @param {Object|Array} datum - The datum associated to the shape.
     */
    update(renderingContext: any, datum: any | any[]): void;
    /**
     * Interface method to override called by `Layer~getItemsInArea`. Defines if
     * the shape is considered to be the given area. Arguments are passed in pixel domain.
     *
     * @param {Object} renderingContext - the renderingContext of the layer which
     *    owns this shape.
     * @param {Object|Array} datum - The datum associated to the shape.
     * @param {Number} x1 - The x component of the top-left corner of the area to test.
     * @param {Number} y1 - The y component of the top-left corner of the area to test.
     * @param {Number} x2 - The x component of the bottom-right corner of the area to test.
     * @param {Number} y2 - The y component of the bottom-right corner of the area to test.
     * @return {Boolean} - Returns `true` if the is considered to be in the given area, `false` otherwise.
     */
    inArea(renderingContext: any, datum: any | any[], x1: number, y1: number, x2: number, y2: number): boolean;
}
