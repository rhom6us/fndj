/**
 * Is the main entry point to create a temporal visualization.
 *
 * A `timeline` instance mainly provides the context for any visualization of
 * temporal data and maintains the hierarchy of `Track`, `Layer` and `Shape`
 * over the entiere visualisation.
 *
 * Its main responsabilites are:
 * - maintaining the temporal consistency accross the visualisation through
 *   its `timeContext` property (instance of `TimelineTimeContext`).
 * - handling interactions to its current state (acting here as a simple
 *   state machine).
 *
 * @TODO insert figure
 *
 * It also contains a reference to all the register track allowing to `render`
 * or `update` all the layer from a single entry point.
 *
 * ## Example Usage
 *
 * ```js
 * const visibleWidth = 500; // default width in pixels for all created `Track`
 * const duration = 10; // the visible area represents 10 seconds
 * const pixelsPerSeconds = visibleWidth / duration;
 * const timeline = new ui.core.Timeline(pixelsPerSecond, width);
 * ```
 */
export default class Timeline extends EventEmitter {
    /**
     * @param {Number} [pixelsPerSecond=100] - the default scaling between time and pixels.
     * @param {Number} [visibleWidth=1000] - the default visible area for all registered tracks.
     */
    constructor(pixelsPerSecond?: number, visibleWidth?: number, { registerKeyboard }?: {
        registerKeyboard?: boolean;
    });
    // private _tracks: TrackCollection;
    // private _state: any;
    // private _surfaceCtor: typeof Surface;
    // private _trackById: {};
    // private _groupedLayers: {};
    /** @type {TimelineTimeContext} - master time context for the visualization. */
    timeContext: TimelineTimeContext;
    /**
     * Updates `TimelineTimeContext`'s `offset` time domain value.
     *
     * @type {Number} [offset=0]
     */
    set offset(arg: number);
    /**
     * Returns `TimelineTimeContext`'s `offset` time domain value.
     *
     * @type {Number} [offset=0]
     */
    get offset(): number;
    /**
     * Updates the `TimelineTimeContext`'s `zoom` value.
     *
     * @type {Number} [offset=0]
     */
    set zoom(arg: number);
    /**
     * Returns the `TimelineTimeContext`'s `zoom` value.
     *
     * @type {Number} [offset=0]
     */
    get zoom(): number;
    /**
     * Updates the `TimelineTimeContext`'s `pixelsPerSecond` ratio.
     *
     * @type {Number} [offset=0]
     */
    set pixelsPerSecond(arg: number);
    /**
     * Returns the `TimelineTimeContext`'s `pixelsPerSecond` ratio.
     *
     * @type {Number} [offset=0]
     */
    get pixelsPerSecond(): number;
    /**
     * Updates the `TimelineTimeContext`'s `visibleWidth` pixel domain value.
     *
     * @type {Number} [offset=0]
     */
    set visibleWidth(arg: number);
    /**
     * Returns the `TimelineTimeContext`'s `visibleWidth` pixel domain value.
     *
     * @type {Number} [offset=0]
     */
    get visibleWidth(): number;
    /**
     * Returns `TimelineTimeContext`'s `timeToPixel` transfert function.
     *
     * @type {Function}
     */
    get timeToPixel(): (time: number) => number;
    /**
     * Returns `TimelineTimeContext`'s `visibleDuration` helper value.
     *
     * @type {Number}
     */
    get visibleDuration(): number;
    /**
     * Updates the `TimelineTimeContext`'s `maintainVisibleDuration` value.
     * Defines if the duration of the visible area should be maintain when
     * the `visibleWidth` attribute is updated.
     *
     * @type {Boolean}
     */
    set maintainVisibleDuration(arg: boolean);
    /**
     * Returns `TimelineTimeContext`'s `maintainVisibleDuration` current value.
     *
     * @type {Boolean}
     */
    get maintainVisibleDuration(): boolean;
    /**
     * Object maintaining arrays of `Layer` instances ordered by their `groupId`.
     * Is used internally by the `TrackCollection` instance.
     *
     * @type {Object}
     */
    get groupedLayers(): any;
    /**
     * Overrides the default `Surface` that is instanciated on each `Track`
     * instance. This methos should be called before adding any `Track` instance
     * to the current `timeline`.
     *
     * @param {EventSource} ctor - The constructor to use in order to catch mouse
     *    events on each `Track` instances.
     */
    configureSurface(ctor: EventSource): void;
    /**
     * Factory method to add interaction modules the timeline should listen to.
     * By default, the timeline instanciate a global `Keyboard` instance and a
     * `Surface` instance on each container.
     * Should be used to install new interactions implementing the `EventSource` interface.
     *
     * @param {EventSource} ctor - The contructor of the interaction module to instanciate.
     * @param {Element} $el - The DOM element which will be binded to the `EventSource` module.
     * @param {Object} [options={}] - Options to be applied to the `ctor`.
     */
    createInteraction(ctor: EventSource, $el: Element, options?: any): void;
    /**
     * Returns a list of the layers situated under the position of a `WaveEvent`.
     *
     * @param {WavesEvent} e - An event triggered by a `WaveEvent`
     * @return {Array} - Matched layers
     */
    getHitLayers(e: any): any[];
    /**
     * The callback that is used to listen to interactions modules.
     *
     * @param {WaveEvent} e - An event generated by an interaction modules (`EventSource`).
     */
    // _handleEvent(e: any): void;
    /**
     * Updates the state of the timeline.
     *
     * @type {BaseState}
     */
    set state(arg: any);
    /**
     * Returns the current state of the timeline.
     *
     * @type {BaseState}
     */
    get state(): any;
    /**
     * Returns the `TrackCollection` instance.
     *
     * @type {TrackCollection}
     */
    get tracks(): TrackCollection;
    /**
     * Returns the list of all registered layers.
     *
     * @type {Array}
     */
    get layers(): Layer[];
    /**
     * Adds a new track to the timeline.
     *
     * @param {Track} track - The new track to be registered in the timeline.
     * @param {String} [trackId=null] - Optionnal unique id to associate with
     *    the track, this id only exists in timeline's context and should be used
     *    in conjonction with `addLayer` method.
     */
    add(track: Track, trackId?: string): void;
    /**
     * Removes a track from the timeline.
     *
     * @param {Track} track - the track to remove from the timeline.
     * @todo not implemented.
     */
    remove(track: Track): void;
    /**
     * Helper to create a new `Track` instance. The `track` is added,
     * rendered and updated before being returned.
     *
     * @param {Element} $el - The DOM element where the track should be inserted.
     * @param {Number} trackHeight - The height of the newly created track.
     * @param {String} [trackId=null] - Optionnal unique id to associate with
     *    the track, this id only exists in timeline's context and should be used in
     *    conjonction with `addLayer` method.
     * @return {Track}
     */
    createTrack($el: Element, trackHeight?: number, trackId?: string): Track;
    /**
     * If track id is defined, associate a track with a unique id.
     */
    // _registerTrackId(track: any, trackId: any): void;
    /**
     * Helper to add a `Layer` instance into a given `Track`. Is designed to be
     * used in conjonction with the `Timeline~getLayersByGroup` method. The
     * layer is internally rendered and updated.
     *
     * @param {Layer} layer - The `Layer` instance to add into the visualization.
     * @param {(Track|String)} trackOrTrackId - The `Track` instance (or its `id`
     *    as defined in the `createTrack` method) where the `Layer` instance should be inserted.
     * @param {String} [groupId='default'] - An optionnal group id in which the
     *    `Layer` should be inserted.
     * @param {Boolean} [isAxis] - Set to `true` if the added `layer` is an
     *    instance of `AxisLayer` (these layers shares the `TimlineTimeContext` instance
     *    of the timeline).
     */
    addLayer(layer: Layer | AxisLayer, trackOrTrackId: (Track | string), groupId?: string, isAxis?: boolean): void;
    /**
     * Removes a layer from its track. The layer is detatched from the DOM but
     * can still be reused later.
     *
     * @param {Layer} layer - The layer to remove.
     */
    removeLayer(layer: Layer): void;
    /**
     * Returns a `Track` instance from it's given id.
     *
     * @param {String} trackId
     * @return {Track}
     */
    getTrackById(trackId: string): Track;
    /**
     * Returns the track containing a given DOM Element, returns null if no match found.
     *
     * @param {Element} $el - The DOM Element to be tested.
     * @return {Track}
     */
    getTrackFromDOMElement($el: Element): Track;
    /**
     * Returns an array of layers from their given group id.
     *
     * @param {String} groupId - The id of the group as defined in `addLayer`.
     * @return {(Array|undefined)}
     */
    getLayersByGroup(groupId: string): (any[] | undefined);
    /**
     * Iterates through the added tracks.
     */
    [Symbol.iterator](): Generator<any, void, undefined>;
}
import TrackCollection from "./track-collection";
import Surface from "../interactions/surface";
import TimelineTimeContext from "./timeline-time-context";
import Track from "./track";
import EventEmitter from 'node:events';
import Layer from './layer';
import AxisLayer from '../axis/axis-layer';
//# sourceMappingURL=timeline.d.ts.map
