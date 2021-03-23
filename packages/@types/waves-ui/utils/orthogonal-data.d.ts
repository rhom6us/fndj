/**
 * OrthogonalData transforms an object of arrays `{foo: [1, 2], bar: [3, 4]}`
 * to or from an array of objects `[{foo: 1, bar: 3}, {foo: 2, bar: 4}]`
 */
export default class OrthogonalData {
    _cols: any;
    _rows: any[];
    /**
     * Check the consistency of the data.
     */
    _checkConsistency(): void;
    /**
     * Updates array of objects from object of arrays.
     */
    updateFromCols(): void;
    /**
     * Updates object of arrays from array of objects.
     */
    updateFromRows(): void;
    /**
     * Sets an object of arrays.
     *
     * @type {Object<String, Array>}
     */
    set cols(arg: any);
    /**
     * Returns an object of arrays.
     *
     * @type {Object<String, Array>}
     */
    get cols(): any;
    /**
     * Sets an array of objects.
     *
     * @type {Array<Object>}
     */
    set rows(arg: any[]);
    /**
     * Returns an array of objects.
     *
     * @type {Array<Object>}
     */
    get rows(): any[];
}
//# sourceMappingURL=orthogonal-data.d.ts.map