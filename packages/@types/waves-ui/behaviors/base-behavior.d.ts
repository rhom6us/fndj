/**
 * Is an abstract class or interface to be overriden in order to define the way
 * a given shape should behave when selected or edited by a user. Instances of
 * `BaseBehavior` are internally used by `Layer` instances to modify the data
 * according to a user interaction and a given shape. A single instance of
 * `Behavior` is created in one given shape.
 *
 * By default, the only method to override to define a new behavior for a
 * shape is the `edit` method. However, if needed in special cases, all the
 * selection handling can be overriden too.
 *
 * The flow is the following:
 * `Event`  - (forwarded to) -> `Layer` - (command) -> `Behavior` - (modify) -> `data` - (upates) -> `Shape`
 *
 * The behavior responsability is then to modify the data according to the
 * user interactions, while shapes are always a view of the current state of the
 * data.
 */
export default class BaseBehavior {
    _selectedItems: Set<any>;
    _selectedClass: any;
    _layer: any;
    initialize(layer: any): void;
    /**
     * Destroy the references to the selected items.
     *
     * @type {String}
     * @todo - rename to `clearSelection` (removing the class) ?
     */
    destroy(): void;
    /**
     * The class to add to the shapes when selected.
     *
     * @type {String}
     */
    set selectedClass(arg: string);
    /**
     * The class to add to the shapes when selected.
     *
     * @type {String}
     */
    get selectedClass(): string;
    /**
     * An array containing all the selected items of the layer.
     *
     * @type {Array}
     */
    get selectedItems(): any[];
    /**
     * @param {Element} $item - The item to select.
     * @param {Object} datum - Not used in this implementation. Could be
     *    used to mark the data as selected.
     * @todo - Pass the shape object to get the accessors ?
     */
    select($item: Element, datum: any): void;
    /**
     * @param {Element} $item - The item to unselect.
     * @param {Object} datum - Not used in this implementation. Could be
     *    used to mark the data as selected.
     * @todo - Pass the shape object to get the accessors ?
     */
    unselect($item: Element, datum: any): void;
    /**
     * @param {Element} $item - The item to toggle selection.
     * @param {Object} datum - Not used in this implementation. Could be
     *    used to mark the data as selected.
     * @todo - Pass the shape object to get the accessors ?
     */
    toggleSelection($item: Element, datum: any): void;
    /**
     * Interface method to override in order to define its particular behavior when
     * interacted with.
     *
     * @param {Object} renderingContext - The layer rendering context.
     * @param {BaseShape} shape - The shape object to be edited.
     * @param {Object|Array} datum - The related datum to modify.
     * @param {Number} dx - The value of the interaction in the x axis (in pixels).
     * @param {Number} dy - The value of the interaction in the y axis (in pixels).
     * @param {Element} $target - The target DOM element of the interaction.
     */
    edit(renderingContext: any, shape: any, datum: any | any[], dx: number, dy: number, $target: Element): void;
}
//# sourceMappingURL=base-behavior.d.ts.map