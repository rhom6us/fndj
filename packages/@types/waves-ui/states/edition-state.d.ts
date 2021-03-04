/**
 * A state to edit shapes in the more general way. Interact only with selected shapes.
 */
export default class EditionState extends BaseState {
    constructor(timeline: any);
    currentEditedLayer: any;
    currentTarget: any;
    onMouseDown(e: any): void;
    onMouseMove(e: any): void;
    onMouseUp(e: any): void;
    mouseDown: boolean;
}
import BaseState from "./base-state";
//# sourceMappingURL=edition-state.d.ts.map