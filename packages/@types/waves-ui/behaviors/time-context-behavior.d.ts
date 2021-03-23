/**
 * TimeContextBehavior is used internally in Layers to modify their TimeContext.
 * This object is different from other Shapes Behaviors and exists mostly to decrease the size of the Layer.
 * All the code here could be considered as part of the layer.
 */
export default class TimeContextBehavior {
    edit(layer: any, dx: any, dy: any, target: any): void;
    _editLeft(timeContext: any, dx: any): void;
    _editRight(timeContext: any, dx: any): void;
    _move(timeContext: any, dx: any): void;
    stretch(layer: any, dx: any, dy: any, target: any): void;
}
//# sourceMappingURL=time-context-behavior.d.ts.map