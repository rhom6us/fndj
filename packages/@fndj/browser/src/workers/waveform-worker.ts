import { expose } from 'comlink';
import { getFloatTimeDomainData } from './R128/helpers';

export type WorkerType = typeof generateWaveforms;
async function generateWaveforms(audioBuffer: AudioBuffer) {
    const context = new OfflineAudioContext({ length: audioBuffer.length, sampleRate: audioBuffer.sampleRate, numberOfChannels: audioBuffer.numberOfChannels });;
    const source = new AudioBufferSourceNode(context, {
        buffer: audioBuffer
    });
    const node = source.connect(context.createAnalyser());
    node.connect(context.destination);
    await context.startRendering();
    return getFloatTimeDomainData(node);
}
expose(generateWaveforms);
