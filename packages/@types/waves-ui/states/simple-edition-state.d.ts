/**
 * A state to select and edit shapes in a simple way. (kind of plug n play state)
 */
export default class SimpleEditionState extends BaseState {
    constructor(timeline: any);
    currentEditedLayer: any;
    currentTarget: any;
    onMouseDown(e: any): void;
    onMouseMove(e: any): void;
    onMouseUp(e: any): void;
}
import BaseState from "./base-state";
//# sourceMappingURL=simple-edition-state.d.ts.map