/**
 * Defines and maintains global aspects of the visualization concerning the
 * relations between time and pixels.
 *
 * The `TimelineTimeContext` instance (unique across a visualization) keeps the
 * main reference on how many pixels should be used to represent one second
 * though its `timeToPixel` method. The attributes `zoom`, `offset` (i.e. from
 * origin) and `visibleWidth` allow for navigating in time and for maintaining
 * view consistency upon the DOM structure (`<svg>` and `<g>` tags) created by
 * the registered tracks.
 *
 * It also maintain an array of all references to `LayerTimeContext` instances
 * to propagate to `layers`, changes made on the time to pixel representation.
 *
 * [example usage](./examples/time-contexts.html)
 */

import { Scale } from '../utils/scales';

export default class TimelineTimeContext {
    /**
     * @param {Number} pixelsPerSecond - The number of pixels that should be
     *    used to display one second.
     * @param {Number} visibleWidth - The default with of the visible area
     *    displayed in `tracks` (in pixels).
     */
    constructor(pixelsPerSecond: number, visibleWidth: number);
    // _children: any[];
    // _timeToPixel: any;
    // _offset: number;
    // _zoom: number;
    // _computedPixelsPerSecond: number;
    // _visibleWidth: number;
    // _maintainVisibleDuration: boolean;
    // _originalPixelsPerSecond: number;
    /**
     * Updates all the characteristics of this object according to the new
     * given value of pixels per seconds. Propagates the changes to the
     * `LayerTimeContext` children.
     *
     * @type {Number}
     */
    set pixelsPerSecond(arg: number);
    /**
     * Returns the number of pixels per seconds ignoring the current zoom value.
     *
     * @type {Number}
     */
    get pixelsPerSecond(): number;
    /**
     * Returns the number of pixels per seconds including the current zoom value.
     *
     * @type {Number}
     */
    get computedPixelsPerSecond(): number;
    /**
     * Sets the offset to apply to the registered `Track` instances from origin
     * (in seconds).
     *
     * @type {Number}
     */
    set offset(arg: number);
    /**
     * Returns the current offset applied to the registered `Track` instances
     * from origin (in seconds).
     *
     * @type {Number}
     */
    get offset(): number;
    /**
     * Sets the zoom ratio for the whole visualization.
     *
     * @type {Number}
     */
    set zoom(arg: number);
    /**
     * Returns the current zoom level applied to the whole visualization.
     *
     * @type {Number}
     */
    get zoom(): number;
    /**
     * Sets the visible width of the `Track` instances.
     *
     * @type {Number}
     */
    set visibleWidth(arg: number);
    /**
     * Returns the visible width of the `Track` instances.
     *
     * @type {Number}
     */
    get visibleWidth(): number;
    /**
     * Returns the duration displayed by `Track` instances.
     *
     * @type {Number}
     */
    get visibleDuration(): number;
    /**
     * Defines if the duration displayed by tracks should be maintained when
     * their width is updated.
     *
     * @type {Boolean}
     */
    set maintainVisibleDuration(arg: number);
    /**
     * Returns if the duration displayed by tracks should be maintained when
     * their width is updated.
     *
     * @type {Number}
     */
    get maintainVisibleDuration(): number;
    /**
     * Returns the time to pixel trasfert function.
     *
     * @type {Function}
     */
    get timeToPixel(): Scale;
     _updateTimeToPixelRange(): void;
}
//# sourceMappingURL=timeline-time-context.d.ts.map
