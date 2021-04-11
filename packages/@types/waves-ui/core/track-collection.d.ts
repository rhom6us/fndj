/**
 * Collection hosting all the `Track` instances registered into the timeline.
 * It provides shorcuts to trigger `render` / `update` methods on tracks or
 * layers. Extend built-in Array
 */
export default class TrackCollection extends Array<Track> {
    constructor(timeline: Timeline);
    private _timeline: Timeline;
    private _getLayersOrGroups(layerOrGroup?: any): any;
    /**
     * @type {Number} - Updates the height of all tracks at once.
     * @todo - Propagate to layers, not usefull for now.
     */
    set height(arg: number);
    /**
     * An array of all registered layers.
     *
     * @type {Array<Layer>}
     */
    get layers(): Layer[];
    /**
     * Render all tracks and layers. When done, the timeline triggers a `render` event.
     */
    render(): void;
    /**
     * Updates all tracks and layers. When done, the timeline triggers a
     * `update` event.
     *
     * @param {Layer|String} layerOrGroup - Filter the layers to update by
     *    passing the `Layer` instance to update or a `groupId`
     */
    update(layerOrGroup?: Layer | string): void;
    /**
     * Updates all `Track` containers, layers are not updated with this method.
     * When done, the timeline triggers a `update:containers` event.
     */
    updateContainer(): void;
    /**
     * Updates all layers. When done, the timeline triggers a `update:layers` event.
     *
     * @param {Layer|String} layerOrGroup - Filter the layers to update by
     *    passing the `Layer` instance to update or a `groupId`
     */
    updateLayers(layerOrGroup: Layer | string): void;
}
import Layer from "./layer";
import Timeline from './timeline';
import Track from './track';
//# sourceMappingURL=track-collection.d.ts.map
