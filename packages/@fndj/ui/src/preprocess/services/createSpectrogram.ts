/* eslint-disable no-console */
import { FftSize } from './analyze';

/**
 *
 *
 * @export
 * @param {AudioBuffer} buffer
 * @param {FftSize} [fftSize=2048]              A higher value will result in more details in the frequency domain but fewer details in the time domain.
 * @param {number} [smoothingTimeConstant=0.8]  a double within the range 0 to 1 (0 meaning no time averaging).
 *                                              If 0 is set, there is no averaging done, whereas a value of 1 means "overlap the previous and current buffer quite a lot while computing the value", which essentially smooths the changes across AnalyserNode.getFloatFrequencyData/AnalyserNode.getByteFrequencyData calls.
*                                               In technical terms, we apply a Blackman window and smooth the values over time. The default value is good enough for most cases.
 */
export async function createSpectrogram(buffer: AudioBuffer, fftSize: FftSize = 2048, smoothingTimeConstant = 0.8) {
    console.debug(`creating specto`);
    // return new Promise<Uint8Array[]>((resolve) => {
    const context = new OfflineAudioContext(2, buffer.length, buffer.sampleRate);
    // const windowSize = buffer.sampleRate / fftSize;
    const sourceNode = new AudioBufferSourceNode(context, {
        buffer,
    });
    const analyzerNode = new AnalyserNode(context, {
        fftSize,
        smoothingTimeConstant
    });



    sourceNode.connect(analyzerNode);
    console.debug('allsetup');
    sourceNode.start();
    console.debug('started');



    // async function go() {
    const result: Uint8Array[] = [];

    const hopSize = 128 / buffer.sampleRate;
    console.debug({ hopSize });


    for (let time = 0; time < buffer.duration; time += hopSize) {
        context.suspend(time).then(async () => {
            const array = new Uint8Array(analyzerNode.frequencyBinCount);
            analyzerNode.getByteFrequencyData(array);
            // console.debug(array);
            result.push(array);
            await context.resume();
        });
    }


    // for (let i = 0; (i + 1) < buffer.duration / hopSize; i++) {
    //     await context.suspend(hopSize * (i + 1));
    //     const array = new Uint8Array(analyzerNode.frequencyBinCount);
    //     analyzerNode.getByteFrequencyData(array);
    //     console.debug(array);
    //     result.push(array);
    //     await context.resume();
    // }
    console.debug('loop1');

    // if ((buffer.length / windowSize) % 1 > 0) {
    //     await context.suspend(buffer.length - 1);
    //     const array = new Uint8Array(analyzerNode.frequencyBinCount);
    //     analyzerNode.getByteFrequencyData(array);
    //     result.push(array);
    //     await context.resume();
    // }
    await context.startRendering();
    console.debug({ result });
    return result;

    // }
    // const result = go();
    return await result;
    // });
}
