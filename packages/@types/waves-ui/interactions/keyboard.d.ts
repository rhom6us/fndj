/**
 * A global event sourve for the keyboard. Only one instance of this source
 * can be created. The first created timeline instanciate the singleton, each
 * subsequent instanciation returns the first created instance.
 */
export default class Keyboard extends EventSource {
    /**
     * @param {Element} $el - The element on which to install the listener.
     */
    constructor($el: Element);
    /**
     * The name of the source
     * @type {String}
     */
    sourceName: string;
}
import EventSource from "./event-source";
//# sourceMappingURL=keyboard.d.ts.map