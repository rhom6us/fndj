export default AbstractAnnotation;
/**
 * Abstract for fully editable module that display annotations accroding to the
 * given track config.
 * Derived modules should implement the `install` and `createNewAnnotationDatum`
 * methods.
 *
 * The module defines the following interactions:
 * - edit the annotation position (`time`): mouse drag
 * - edit the `label`: double click on the label to edit it
 * - create a new annotation: double click somewhere in the timeline
 * - delete a annotation: keypess suppr
 *
 * @example
 * ```
 * // data format
 * [
 *   { time: 0.230, label: 'label-1' },
 *   { time: 1.480, label: 'label-2' },
 * ]
 * ```
 */
declare class AbstractAnnotation extends AbstractModule {
    /**
     * The layer containing the annotations created in the install method
     */
    _layer: any;
    _timeline: any;
    postInstall(layer: Layer): void;
    _positionEditionState: PositionEditionState;
    _labelEditionState: LabelEditionState;
    render(): void;
    setTrack(buffer: AudioBuffer, metadata: any): void;
    _createAnnotation(position: number): void;
    _deleteAnnotation($item: any): void;
    onEvent(e: any, hitLayers: any): boolean;
}
import type Layer from '../../waves-ui/core/layer';
import AbstractModule from "../core/AbstractModule";
/**
 * State to edit the position
 */
declare class PositionEditionState {
    constructor(timeline: any, layer: any);
    currentItem: any;
    currentTarget: any;
    hasMoved: boolean;
    layer: any;
    clear(): void;
    handleEvent(e: any): void;
    onMouseDown(e: any): void;
    onMouseMove(e: any): void;
}
/**
 * State to edit the label
 */
declare class LabelEditionState {
    constructor(timeline: any, layer: any);
    currentTarget: any;
    layer: any;
    handleEvent(e: any): void;
    onDblClick(e: any): void;
    currentShape: any;
    updateLabel(): void;
}
//# sourceMappingURL=AbstractAnnotation.d.ts.map
