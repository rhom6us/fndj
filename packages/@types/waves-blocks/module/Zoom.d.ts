export default Zoom;
/**
 * Module that adds zoom functionnality to the block.
 *
 * @param {Object} options - Override default options.
 * @param {String|Element} [options.scrollBarContainer=null] - Element where
 *  an additionnal scrollbar should be displayed.
 * @param {Number} options.scrollBarHeight - Height of the scrollbar.
 * @param {String} [options.scrollBarColor='#000000'] - Color of the scrollbar.
 * @param {Boolean} [options.centeredCurrentPosition=false] - Scroll to keep
 *  the block centered on current position while playing.
 */
declare class Zoom extends AbstractModule {
    constructor(options: any);
    axisModule: GridAxis | TimeAxis;
    hasScrollBar: boolean;
    /**
     * Events emitted by the scroll timeline.
     */
    _onScrollBarMouseEvent(e: any): void;
    _updateOffset(currentPosition: any): void;
    _scrollTimeline: any;
    _scrollTrack: any;
    _scrollBar: any;
    _scrollState: ScrollState;
    _zoomState: ZoomState;
    setWidth(value: any): void;
    setTrack(buffer: any, metadatas: any): void;
    /**
     * Events are forwarded by the BasePlayer, originate from the main timeline.
     */
    onEvent(e: any, hitLayers: any): boolean;
}
import AbstractModule from "../core/AbstractModule";
import GridAxis from "./GridAxis";
import TimeAxis from "./TimeAxis";
/** @private */
declare class ScrollState {
    constructor(block: any, timeline: any, scrollBar: any);
    block: any;
    scrollBar: any;
    onMouseMove(e: any): void;
}
/** @private */
declare class ZoomState {
    constructor(block: any, timeline: any, scrollBar?: any);
    block: any;
    scrollBar: any;
    _pixelToExponent: any;
    destroy(): void;
    handleEvent(e: any): void;
    onMouseDown(e: any): void;
    initialZoom: any;
    initialY: any;
    onMouseMove(e: any): void;
    onMouseUp(e: any): void;
}
//# sourceMappingURL=Zoom.d.ts.map