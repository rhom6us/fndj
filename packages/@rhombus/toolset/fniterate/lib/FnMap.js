export class FnMap extends Map {
    static from(source) {
        return new FnMap(source);
    }
    getOrSet(key, valueFactory) {
        if (!this.has(key)) {
            this.set(key, valueFactory.call(this, key));
        }
        return this.get(key);
    }
    tryGet(key) {
        const result = super.get(key);
        const success = result !== undefined;
        return [success, result];
    }
    tryAdd(key, value) {
        if (super.has(key)) {
            return false;
        }
        super.set(key, value);
        return true;
    }
    tryUpdate(key, value) {
        if (!super.has(key)) {
            return false;
        }
        super.set(key, value);
        return true;
    }
    add(key, value) {
        if (!this.tryAdd(key, value)) {
            throw new RangeError('Key already exists in FnMap');
        }
        return this;
    }
    update(key, value) {
        if (!this.tryUpdate(key, value)) {
            throw new RangeError('Key already exists in FnMap');
        }
        return this;
    }
}
//# sourceMappingURL=FnMap.js.map