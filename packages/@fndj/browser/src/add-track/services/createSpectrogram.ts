
export type FftSize = 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096 | 8192 | 16384 | 32768;


export class SpectogramService {
    #context: BaseAudioContext;
    constructor(context:BaseAudioContext){
        this.#context = context;
    }

    createSpectogram(buffer: AudioBuffer, fftSize: FftSize = 2048, smoothingTimeConstant?: number) {
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
        sourceNode.start();
    
    
    
        // async function go() {
        const result: Uint8Array[] = [];
    
        const hopSize = 128 / buffer.sampleRate;
    
        // async function* generate() {
    
        for (let time = 0; time < buffer.duration; time += hopSize) {
            context.suspend(time).then(async () => {
                const array = new Uint8Array(analyzerNode.frequencyBinCount);
                analyzerNode.getByteFrequencyData(array);
                result.push(array);
                await context.resume();
            });
            // const promise = context.suspend(time)
            // await context.resume();
            // await promise;
            // const array = new Uint8Array(analyzerNode.frequencyBinCount);
            // analyzerNode.getByteFrequencyData(array);
            // // result.push(array);
            // yield array;
    
        }
        // }
        await context.startRendering();
        return result;
    
    }
}