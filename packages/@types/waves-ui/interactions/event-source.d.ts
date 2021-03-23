/**
 * Abstract class to extend to create new sources of interactions.
 * A `Surface` and `Keyboard` event sources are provided.
 */
export default class EventSource {
    constructor($el: any);
    /**
     * The element on which the listener is added
     * @type {Element}
     */
    $el: Element;
    _createEvent(type: any, e: any): void;
    _bindEvents(): void;
}
//# sourceMappingURL=event-source.d.ts.map