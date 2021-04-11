import BaseShape, { Accessor, DatumAccessor } from "./base-shape";

export interface TicksAccessor<T> extends Accessor<T> {
    time: DatumAccessor<T, number>;
    focused: DatumAccessor<T, boolean>;
    label: DatumAccessor<T, string>;
}
export interface TicksOptions {
    color: string;
    focusedOpacity: number;
    defaultOpacity: number;
}
/**
 * Kind of Marker for entity oriented data. Usefull to display a grid.
 */
export default class Ticks extends BaseShape {
    _getClassName(): string;
}
