import { Credentials } from 'google-auth-library';

export class LocalStore<T>{
    constructor(private readonly key: string, private readonly throwIfNotFound = false) {
    }
    load(): T | undefined;
    load<D>(defaultValue: D): T | D;
    load(defaultValue: any = undefined) {
        const result = localStorage.getItem(this.key);
        if (!result) {
            if (this.throwIfNotFound) {
                throw new Error(`key ${this.key} not found in local storage.`);
            }
            return defaultValue;
        }
        return JSON.parse(result) as T;
    }
    save(value: T) {
        localStorage.setItem(this.key, JSON.stringify(value));
        return value;
    }
    loadOrAdd(factory: (key: string) => T): T {
        const result = this.load();
        if (result === undefined) {
            return this.save(factory(this.key));
        }
        return result;
    }
    async loadOrAddAsync(factory: (key: string) => PromiseLike<T>): Promise<T> {
        const result = this.load();
        if (result === undefined) {
            return this.save(await factory(this.key));
        }
        return result;
    }
}


export const store = {
    token: new LocalStore<Credentials>("google_oauth_token")
};

export type Store = typeof store;
