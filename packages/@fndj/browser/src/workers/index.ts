import { wrap } from 'comlink';
import type { WorkerType as SPAnalyze } from './analyzer-worker';
import type { WorkerType as GenWaveforms } from './waveform-worker';



export const generateWaveforms = getWorkerClass<GenWaveforms>('./waveform-worker.ts');
export const analyze = getWorkerClass<SPAnalyze>('./analyzer-worker.ts');
function getWorkerClass<T>(path: string) {
    return wrap<T>(new Worker(new URL(path, import.meta.url), { type: 'module' }));
}
