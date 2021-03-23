/**
 * A state to interact directly with layers time contexts.
 *
 * [example usage, see. advanced usage](./examples/layer-waveform.html)
 */
export default class ContextEditionState extends BaseState {
    constructor(timeline: any);
    onMouseDown(e: any): void;
    mouseDown: boolean;
    currentTarget: any;
    currentLayer: any;
    onMouseMove(e: any): void;
    onMouseUp(e: any): void;
}
import BaseState from "./base-state";
//# sourceMappingURL=context-edition-state.d.ts.map