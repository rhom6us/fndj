export default History;
/**
 *
 *
 */
declare class History {
    constructor(host: any, attr: any, maxSize?: number);
    host: any;
    attr: any;
    _stack: any[];
    _pointer: number;
    _maxSize: number;
    head(): any;
    snap(): void;
    reset(): void;
    undo(): boolean;
    redo(): boolean;
}
//# sourceMappingURL=History.d.ts.map