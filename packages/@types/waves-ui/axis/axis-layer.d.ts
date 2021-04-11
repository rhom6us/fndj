/**
 * Simplified Layer for Axis. The main difference with a regular layer is that
 * an axis layer use the `Timeline~timeContext` attributes to render it's layout
 * and stay synchronized with the tracks visible area. All getters and setters
 * to the `TimelineTimeContext` attributes are bypassed.
 *
 * It also handle it's own data and its updates. The `_generateData` method is
 * responsible to create some usefull data to visualize
 *
 * [example usage of the layer-axis](./examples/layer-axis.html)
 */
declare interface AxisLayer extends Omit<_AxisLayer, 'setTimeContext'> {

    setTimeContext(timeContext: TimelineTimeContext): void;
}
declare var AxisLayer: {
    prototype: AxisLayer;
    new(generator: Function, options: any): AxisLayer;
};
export default AxisLayer;
declare class _AxisLayer extends Layer {
    /**
     * @param {Function} generator - A function to create data according to
     *    the `Timeline~timeContext`.
     * @param {Object} options - Layer options, cf. Layer for available options.
     */
    constructor(generator: Function, options: any);
    _generator: Function;
    /**
     * The generator that creates the data to be rendered to display the axis.
     *
     * @type {Function}
     */
    set generator(arg: Function);
    /**
     * The generator that creates the data to be rendered to display the axis.
     *
     * @type {Function}
     */
    get generator(): Function;
    /**
     * This method is the main difference with a classical layer. An `AxisLayer`
     * instance generates and maintains it's own data.
     */
    _generateData(): void;

}
import Layer from "../core/layer";
import TimelineTimeContext from '../core/timeline-time-context';
//# sourceMappingURL=axis-layer.d.ts.map
