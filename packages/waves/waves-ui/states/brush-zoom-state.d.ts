/**
 * Protools like zoom with zone selection. Press space bar to reset zoom.
 *
 * [example usage](./examples/states-zoom.html)
 *
 * @todo - could also handle `g` and `h` keys to zoom-in, zoom-out.
 */
export default class BrushZoomState extends BaseState {
    constructor(timeline: any);
    onMouseDown(e: any): void;
    brushes: any[];
    startX: any;
    onMouseMove(e: any): void;
    onMouseUp(e: any): void;
    onKeyDown(e: any): void;
}
import BaseState from "./base-state";
//# sourceMappingURL=brush-zoom-state.d.ts.map