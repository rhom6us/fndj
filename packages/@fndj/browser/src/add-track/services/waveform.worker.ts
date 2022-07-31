import { range } from "@rhombus-toolkit/type-helpers";

const ctx: Worker = self as any;
const color = (function () {
  const buffer = new ArrayBuffer(2);
  new DataView(buffer).setInt16(0, 256, true /* littleEndian */);
  // Int16Array uses the platform's endianness.
  const littleEndian = new Int16Array(buffer)[0] === 256;
  const byte = (p: number) => p & 255;
  return littleEndian
    ? (r: number, g: number, b: number, a: number) => (byte(a) << 24) | (byte(b) << 16) | (byte(g) << 8) | (byte(r) << 0)
    : (r: number, g: number, b: number, a: number) => (byte(r) << 24) | (byte(g) << 16) | (byte(b) << 8) | (byte(a) << 0);
})();
const colors = {
  black: color(0, 0, 0, 255),
  white: color(1, 1, 1, 255),
} as const;

const resultHeight = 201;
function mapY(f: number) {
  f = Math.min(1, Math.max(-1, f));
  return Math.trunc((1 - f) * (resultHeight - 1) * 0.5);
}
const _max = (a: number, b: number) => Math.max(a, b);
const _min = (a: number, b: number) => Math.min(a, b);
ctx.onmessage = (function () {
  let input: Float32Array;

  function draw(samples: Float32Array,samplesPerPixel: number) {

    const bufferLength = samples.length;
    const windowCount = Math.trunc(bufferLength / samplesPerPixel);
    const results = [];
    for (const x of range(windowCount)) {
      const topic = samples.subarray(x * samplesPerPixel, Math.min(bufferLength, (x + 1) * samplesPerPixel) - 1);

      let max = mapY(topic.reduce(_max));
      let min = mapY(topic.reduce(_min));
      ctx.postMessage({ progress: x / windowCount, data: [min, max] });
      // results.push([min,max]);
      // for (const y of range(1 + max - min, min)) {
      //   rows[y][x] = colors.black;
      // }
    }
    ctx.postMessage({ progress: 1 });
    // ctx.postMessage(results);

    // for (let x = 0; x < bufferLength; x++) {
    //   try{
    //     rows[mapY(samples[x])][x] = colors.black;
    //   } catch (er) {
    //     console.log({ bufferLength, x, y: mapY(samples[x]), rows:rows.length });
    //   }
    // }
  }

  return function handleMessage(event: MessageEvent<{ audioBuffer: ArrayBuffer } | { samplesPerPixel: number }>) {
    if ("audioBuffer" in event.data) {
      input = new Float32Array(event.data.audioBuffer);
      draw(input, Math.trunc(input.length / 500));
    }
    if ("samplesPerPixel" in event.data) {
      draw(input, Math.trunc(event.data.samplesPerPixel));
    }
  };
})();
