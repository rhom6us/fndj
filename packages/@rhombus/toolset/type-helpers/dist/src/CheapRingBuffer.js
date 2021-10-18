export class CheapRingBuffer extends Array {
    push(value) {
        super.shift();
        return super.push(value);
    }
}
//# sourceMappingURL=CheapRingBuffer.js.map