import { expose } from 'comlink';

export type WorkerType = typeof generateWaveforms;
function generateWaveforms(audioBuffer: AudioBuffer) { }
expose(generateWaveforms);
