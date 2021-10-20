export class CheapRingBuffer<T> extends Array<T> {
    override push(value: T) {
        super.shift();
        return super.push(value);
    }
}
