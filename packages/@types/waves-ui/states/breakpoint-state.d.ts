/**
 * A state to interact with a breakpoint function, mimicing Max/MSP's
 * breakpoint function interactions.
 *
 * [example usage](./examples/layer-breakpint.html)
 */
export default class BreakpointState extends BaseState {
    constructor(timeline: any, datumGenerator: any);
    datumGenerator: any;
    currentEditedLayer: any;
    currentTarget: any;
    onMouseDown(e: any, hitLayers: any): void;
    mouseDown: boolean;
    onMouseMove(e: any): void;
    onMouseUp(e: any): void;
}
import BaseState from "./base-state";
//# sourceMappingURL=breakpoint-state.d.ts.map