export class Lazy<T> {
    private _instance?: T;
    constructor(private readonly factory: () => T) { }

    get value(): T {
        return this._instance ?? (this._instance = this.factory());
    }

}
