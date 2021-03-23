export default AbstractModule;
/**
 * Abstract class to derive in order to implement a module that decorates the
 * `BasePlayer`.
 * A module must implement the `install` and `uninstall` methods.
 * Other methods may or may not be implemented accroding to the functionnality
 * offered by the module.
 *
 * @param {Object} definitions - Object defining the parameters of the module.
 *  The definitions should follow the convetions defined in
 *  [https://github.com/ircam-jstools/parameters](https://github.com/ircam-jstools/parameters)
 * @param {Object} options - Oveeride parameters default values.
 */
declare class AbstractModule {
    constructor(definitions: any, options?: undefined);
    params: any;
    _block: any;
    _zIndex: any;
    set block(arg: any);
    get block(): any;
    set zIndex(arg: any);
    get zIndex(): any;
    /**
     * Access the object reference on which the module should operate.
     *
     * @param {Object} metadata - Track metadata.
     * @param {String} accessor - Dot sparated path to the target object reference
     *  (ex. 'machineLearningMetadata.summary').
     * @return {Object}
     */
    accessMetadata(metadata: any, accessor: string): any;
    /**
     * Logic to implement when the module is added to the block.
     */
    install(): void;
    /**
     * Logic to implement when the module is removed to the block.
     */
    uninstall(): void;
}
//# sourceMappingURL=AbstractModule.d.ts.map
