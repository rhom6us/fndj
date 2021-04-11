import { Scale } from '../utils/scales';
import TimelineTimeContext from './timeline-time-context';

/**
 * A `LayerTimeContext` instance represents a time segment into a `TimelineTimeContext`.
 * It must be attached to a `TimelineTimeContext` (the one of the timeline it
 * belongs to). It relies on its parent's `timeToPixel` (time to pixel transfert
 * function) to create the time to pixel representation of the Layer (the view) it is attached to.
 *
 * The `layerTimeContext` has four important attributes:
 * - `start` represent the time at which temporal data must be represented
 *   in the timeline (for instance the begining of a soundfile in a DAW).
 * - `offset` represents offset time of the data in the context of a Layer.
 *   (@TODO give a use case example here "crop ?", and/or explain that it's not a common use case).
 * - `duration` is the duration of the view on the data.
 * - `stretchRatio` is the stretch applyed to the temporal data contained in
 *   the view (this value can be seen as a local zoom on the data, or as a stretch
 *   on the time components of the data). When applyed, the stretch ratio maintain
 *   the start position of the view in the timeline.
 *
 * ```
 * + timeline -----------------------------------------------------------------
 * 0         5         10          15          20        25          30 seconds
 * +---+*****************+------------------------------------------+*******+--
 *     |*** soundfile ***|Layer (view on the sound file)            |*******|
 *     +*****************+------------------------------------------+*******+
 *
 *     <---- offset ----><--------------- duration ----------------->
 * <-------- start ----->
 *
 * The parts of the sound file represented with '*' are hidden from the view
 * ```
 *
 * [example usage](./examples/time-contexts.html)
 */

export default class LayerTimeContext {
    /**
     * @param {TimelineTimeContext} parent - The `TimelineTimeContext` instance of the timeline.
     */
    constructor(parent: TimelineTimeContext);
    /**
     * The `TimelineTimeContext` instance of the timeline.
     *
     * @type {TimelineTimeContext}
     */
    parent: TimelineTimeContext;
    private _timeToPixel: Scale;
    private _start: number;
    private _duration: any;
    private _offset: number;
    private _stretchRatio: number;
    /**
     * Creates a clone of the current time context.
     *
     * @return {LayerTimeContext}
     */
    clone(): LayerTimeContext;
    /**
     * Sets the start position of the time context (in seconds).
     *
     * @type {Number}
     */
    set start(arg: number);
    /**
     * Returns the start position of the time context (in seconds).
     *
     * @type {Number}
     */
    get start(): number;
    /**
     * Sets the duration of the time context (in seconds).
     *
     * @type {Number}
     */
    set duration(arg: number);
    /**
     * Returns the duration of the time context (in seconds).
     *
     * @type {Number}
     */
    get duration(): number;
    /**
     * Sets the offset of the time context (in seconds).
     *
     * @type {Number}
     */
    set offset(arg: number);
    /**
     * Returns the offset of the time context (in seconds).
     *
     * @type {Number}
     */
    get offset(): number;
    /**
     * Sets the stretch ratio of the time context.
     *
     * @type {Number}
     */
    set stretchRatio(arg: number);
    /**
     * Returns the stretch ratio of the time context.
     *
     * @type {Number}
     */
    get stretchRatio(): number;
    /**
     * Returns the time to pixel transfert function of the time context. If
     * the `stretchRatio` attribute is equal to 1, this function is the global
     * one from the `TimelineTimeContext` instance.
     *
     * @type {Function}
     */
    get timeToPixel(): Scale;
    /**
     * Helper function to convert pixel to time.
     *
     * @param {Number} px
     * @return {Number}
     */
    pixelToTime(px: number): number;
}
//# sourceMappingURL=layer-time-context.d.ts.map
