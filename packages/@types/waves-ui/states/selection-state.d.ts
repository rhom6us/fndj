/**
 * A state to select shapes.
 */
export default class SelectionState extends BaseState {
    constructor(timeline: any);
    currentLayer: any;
    selectedItems: any;
    mouseDown: boolean;
    shiftKey: boolean;
    _layerSelectedItemsMap: Map<any, any>;
    _addBrush(track: any): void;
    _removeBrush(track: any): void;
    _resetBrush(track: any): void;
    _updateBrush(e: any, track: any): void;
    onKey(e: any): void;
    onMouseDown(e: any): void;
    _currentTrack: any;
    onMouseMove(e: any): void;
    onMouseUp(e: any): void;
    onClick(e: any): void;
}
import BaseState from "./base-state";
//# sourceMappingURL=selection-state.d.ts.map