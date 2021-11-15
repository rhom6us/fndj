export class Lazy {
    factory;
    _instance;
    constructor(factory) {
        this.factory = factory;
        // logger.debug(`instantiating Lazy with factory:`, { factory });
    }
    get value() {
        if (!this._instance) {
            // logger.debug(`this Lazy has not instance. Running factorhy`);
            this._instance = this.factory();
        }
        // logger.debug(`returning from Lazy`, { Lazy: this });
        return this._instance;
    }
}
//# sourceMappingURL=Lazy.alt.js.map