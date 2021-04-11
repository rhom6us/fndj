/**
 * Object template for all events. Event sources should use this event template
 * in order to keep consistency with existing sources.
 */
export default class WaveEvent {
    /**
     * @param {String} source - The name of the source (`keyboard`, `surface`, ...).
     * @param {String} type - The type of the source (`mousedown`, `keyup`, ...).
     * @param {Event} originalEvent - The original event as emitted by the browser.
     */
    constructor(source: string, type: string, originalEvent: Event);
    source: string;
    type: string;
    originalEvent: Event;
    target: Element;
    currentTarget: Element;


    dx: number;
    dy: number;
    x: number;
    y: number;
}
//# sourceMappingURL=wave-event.d.ts.map
