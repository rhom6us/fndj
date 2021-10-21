
export class Lazy<T> {
    private _instance?: T;
    constructor(private readonly factory: () => T) {
        // logger.debug(`instantiating Lazy with factory:`, { factory });
    }

    get value(): T {
        if (!this._instance) {
            // logger.debug(`this Lazy has not instance. Running factorhy`);
            this._instance = this.factory();
        }
        // logger.debug(`returning from Lazy`, { Lazy: this });
        return this._instance;
    }

}
