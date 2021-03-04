/**
 * `CenteredZoomState` is a timeline state mimicing the `Live` zoom interaction. It allows the user to browse the timeline by clicking on a track, and then
 * - moving down to zoom in
 * - moving up to zoom out
 * - moving left to move in time, after
 * - moving right to move in time, before
 *
 * [example usage](./examples/states-zoom.html)
 */
export default class CenteredZoomState extends BaseState {
    constructor(timeline: any);
    currentLayer: any;
    maxZoom: number;
    minZoom: number;
    onMouseDown(e: any): void;
    initialZoom: any;
    initialY: any;
    _pixelToExponent: any;
    onMouseMove(e: any): void;
    onMouseUp(e: any): void;
}
import BaseState from "./base-state";
//# sourceMappingURL=centered-zoom-state.d.ts.map