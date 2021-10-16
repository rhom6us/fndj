export class FnMap<K, V> extends Map<K, V> {
    static from<K, V>(source: Iterable<[K, V]>) {
        return new FnMap(source);
    }

    getOrSet(key: K, valueFactory: (this: this, key: K) => V): V | undefined {
        if (!this.has(key)) {
            this.set(key, valueFactory.call(this, key));
        }
        return this.get(key);

    }

    tryGet(key: K): readonly [boolean, V] {
        const result = super.get(key);
        const success = result !== undefined;
        return [success, result!] as const;
    }

    tryAdd(key: K, value: V): boolean {
        if (super.has(key)) {
            return false;
        }
        super.set(key, value);
        return true;
    }
    tryUpdate(key: K, value: V): boolean {
        if (!super.has(key)) {
            return false;
        }
        super.set(key, value);
        return true;
    }

    add(key: K, value: V) {
        if (!this.tryAdd(key, value)) {
            throw new RangeError('Key already exists in FnMap');
        }
        return this;
    }
    update(key: K, value: V) {
        if (!this.tryUpdate(key, value)) {
            throw new RangeError('Key already exists in FnMap');
        }
        return this;
    }
}
