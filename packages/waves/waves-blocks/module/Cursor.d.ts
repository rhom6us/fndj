export default Cursor;
declare class Cursor extends AbstractModule {
    constructor(options?: undefined);
    _data: {
        currentPosition: number;
    };
    _cursor: any;
    _cursorSeekState: SeekState;
    _updateCursorPosition(position: any): void;
    onEvent(e: any): boolean;
}
import AbstractModule from "../core/AbstractModule";
/**
 * Seek state, only apply if no state previous decorator took precedence
 */
declare class SeekState {
    constructor(block: any, timeline: any, options: any);
    block: any;
    options: any;
    handleEvent(e: any): void;
}
//# sourceMappingURL=Cursor.d.ts.map
