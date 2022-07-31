import { expose } from 'comlink';

export type WorkerType = typeof generateWaveforms;
async function generateWaveforms(audioBuffer: AudioBuffer) {
    const context = new OfflineAudioContext({ length: audioBuffer.length, sampleRate: audioBuffer.sampleRate, numberOfChannels: audioBuffer.numberOfChannels });;
    const source = new AudioBufferSourceNode(context, {
        buffer: audioBuffer
    });
    const node = source.connect(context.createAnalyser()) as AnalyserNode;
    node.connect(context.destination);
    await context.startRendering();
    const result = new Float32Array(node.frequencyBinCount);
    
    node.getFloatTimeDomainData(result);
    return result;
}
expose(generateWaveforms);
