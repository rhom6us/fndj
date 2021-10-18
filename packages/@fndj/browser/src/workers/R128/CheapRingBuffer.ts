export class CheapRingBuffer<T> extends Array<T> {
    push(value: T) {
        super.shift();
        return super.push(value);
    }
}
