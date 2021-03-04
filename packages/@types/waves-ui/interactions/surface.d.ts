/**
 * Normalizes mouse user interactions with the timeline upon the DOM
 * container element of `Track` instances. As soon as a `track` is added to a
 * `timeline`, its attached `Surface` instance will emit the mouse events.
 */
export default class Surface extends EventSource {
    /**
     * @param {DOMElement} el - The DOM element to listen.
     * @todo - Add some padding to the surface.
     */
    constructor($el: any);
    /**
     * The name of the event source.
     * @type {String}
     */
    sourceName: string;
    _mouseDownEvent: WaveEvent;
    _lastEvent: WaveEvent;
    /**
     * Returns the x, y coordinates coordinates relative to the surface element.
     *
     * @param {Event} e - Raw event from listener.
     * @return {Object}
     * @todo - handle padding.
     */
    _getRelativePosition(e: Event): any;
    _defineArea(e: any, mouseDownEvent: any, lastEvent: any): void;
}
import EventSource from "./event-source";
import WaveEvent from "./wave-event";
//# sourceMappingURL=surface.d.ts.map