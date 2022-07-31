import { AsyncFunc, Func } from "@rhombus-toolkit/func";
import { Credentials } from 'google-auth-library';


export class Store<T>{
    public static readonly NOT_FOUND: unique symbol = Symbol('not found');
    constructor(
        private readonly storage: globalThis.Storage,
        private readonly key: string,
        private readonly throwIfNotFound = false
    ) { }

    load(): T | typeof Store.NOT_FOUND;
    load<D>(defaultValue: D): T | D;
    load(defaultValue = Store.NOT_FOUND) {
        if (!(this.key in this.storage)) {
            if (this.throwIfNotFound) {
                throw new RangeError(`key "${this.key}" not found in local storage.`);
            }
            return defaultValue;
        }
        return JSON.parse(this.storage.getItem(this.key)!);
    }
    save(value: T) {
        this.storage.setItem(this.key, JSON.stringify(value));
        return value;
    }
    loadOrAdd(factory: Func<[string], T>): T {
        const result = this.load();
        if (result === Store.NOT_FOUND) {
            return this.save(factory(this.key));
        }
        return result;
    }
    async loadOrAddAsync(factory: AsyncFunc<[string],T>): Promise<T> {
        const result = this.load();
        if (result === Store.NOT_FOUND) {
            return this.save(await factory(this.key));
        }
        return result;
    }
}


export const storage = {
    token: new Store<Credentials>(localStorage, "google_oauth_token")
};

export type Storage = typeof storage;
