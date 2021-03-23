export default Marker;
/**
 * Fully editable module that display markers accroding to the given track config.
 *
 * Markers should be defined in the `markers` entry of the track configuration.
 * A marker is defined by a `time`, `label` and an optionnal `color`.
 *
 * @example
 * ```
 * [
 *   { time: 0.230, label: 'label-1' },
 *   { time: 1.480, label: 'label-2' },
 * ]
 * ```
 *
 * The module defines the following interactions:
 * - edit the marker position (`time`): mouse drag
 * - edit the `label`: double click on the label to edit it
 * - create a new marker: double click somewhere in the timeline
 * - delete a marker: keypess suppr
 *
 * @param {Object} options - Override default parameters
 * @param {String} color - Default color of the markers.
 */
declare class Marker extends AbstractAnnotation {
    constructor(options: any);
    createNewAnnotationDatum(time: any): {
        time: any;
        label: string;
    };
}
import AbstractAnnotation from "../../src/module/AbstractAnnotation";
//# sourceMappingURL=Marker.d.ts.map
