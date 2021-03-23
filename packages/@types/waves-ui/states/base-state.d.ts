/**
 * `State` instances are used to define the application logic by precising
 * specific user interaction cases, and how they impact the overal temporal
 * representation. The abstractions extending this base class should be
 * considered as the main interface between the visualization and the
 * application logic. All provided states should be seen as simple examples for
 * rapid prototyping,
 *
 * States manage interactions like zooming, browsing, or editing the timeline.
 * Customized states should extend this BaseState.
 */
export default class BaseState {
    /**
     * Returns timeline tracks collection.
     *
     * @type {TrackCollection}
     */
    constructor(timeline: any);
    /**
     * A reference to the timeline on which the state should be installed.
     * @type {Timeline}
     */
    timeline: any;
    /**
     * Returns timeline tracks collection.
     *
     * @type {TrackCollection<Track>}
     */
    get tracks(): any;
    /**
     * Returns all registered layers.
     *
     * @type {Array<Layer>}
     */
    get layers(): any[];
    /**
     * Called when the timeline is entering the state.
     */
    enter(): void;
    /**
     * Called when the timeline is leaving the state.
     */
    exit(): void;
    /**
     * Main interface method to override when creating a new `State`. Handle event
     * from mouse or keyboard, should define behavior according to the event
     * (aka. mousedown, mouseup, ...).
     *
     * @param {WaveEvent} e - the event to process.
     * @param {Array} hitLayers - the layers hit by the mouse event (if surface
     * event).
     */
    handleEvent(e: any, hitLayers: any[]): void;
}
//# sourceMappingURL=base-state.d.ts.map