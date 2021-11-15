export class CheapRingBuffer extends Array {
    #position = 0;
    push(value) {
        super.shift();
        return super.push(value);
    }
}
//# sourceMappingURL=CheapRingBuffer.js.map