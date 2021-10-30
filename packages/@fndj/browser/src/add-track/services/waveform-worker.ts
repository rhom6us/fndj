const ctx: Worker = self as any;
const color = (function () {
    const buffer = new ArrayBuffer(2);
    new DataView(buffer).setInt16(0, 256, true /* littleEndian */);
    // Int16Array uses the platform's endianness.
    const littleEndian = new Int16Array(buffer)[0] === 256;
    const byte = (p: number) => p & 255;
    return littleEndian
        ? (r: number, g: number, b: number, a: number) =>
            (byte(a) << 24) |
            (byte(b) << 16) |
            (byte(g) << 8) |
            (byte(r) << 0)
        : (r: number, g: number, b: number, a: number) =>
            (byte(r) << 24) |
            (byte(g) << 16) |
            (byte(b) << 8) |
            (byte(a) << 0);
}());
const colors = {
    black: color(0, 0, 0, 255),
    white: color(1, 1, 1, 255),
} as const;
interface EventData {
    offset: number;
    duration: number;
}
let buffer: AudioBuffer;

const cache = new Map<string, Int32Array>();
function getOrAdd(key: string, factory: (key: string) => Int32Array) {
    if (!cache.has(key)) {
        cache.set(key, factory(key));
    }
    return cache.get(key)!;
}
const resultHeight = 200;
const mapY = (function () {
    const half = resultHeight / 2;
    return (f: number) => (-f * half + half);
}());

let output: Int32Array;
ctx.addEventListener("message", (event: MessageEvent<AudioBuffer | EventData>) => {
    if (event.data instanceof AudioBuffer) {
        buffer = event.data;
        const sharedBuffer = new SharedArrayBuffer(buffer.getChannelData(0).length * resultHeight);
        output = new Int32Array(sharedBuffer);
        ctx.postMessage(sharedBuffer);
        return;
    }
    if (!output) {
        throw 'wtf mate?';
    }
    const result = getOrAdd(`${event.data.offset.toString()}x${event.data.duration.toString()}`, () => {

        const channel = buffer.getChannelData(0);
        const bufferLength = channel.length;

        const result = new Int32Array(bufferLength * resultHeight);

        const rows = Array.from(new Array(resultHeight).keys()).map(r => result.subarray(r * bufferLength, r * bufferLength + bufferLength - 1));

        for (let x = 0; x < bufferLength; x++){
            rows[mapY(channel[x])][x] = colors.black;
        }
        return result;
    });

    output.set(result);

});
