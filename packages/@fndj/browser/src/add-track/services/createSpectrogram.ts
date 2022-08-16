
export type FftSize = 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096 | 8192 | 16384 | 32768;


export class SpectogramService {
    readonly #options: Readonly<OfflineAudioContextOptions>;
    constructor(options: Readonly<OfflineAudioContextOptions>){
        this.#options = options;
    }
    #setup(buffer: AudioBuffer, fftSize: FftSize, smoothingTimeConstant?: number) {
        const context = new OfflineAudioContext({
            ...buffer,
            ...this.#options
        });
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
        return [context, analyzerNode] as const;
    }
    async createSpectogram(buffer: AudioBuffer, fftSize: FftSize = 2048, smoothingTimeConstant?: number) {
        const [context, analyzerNode] = this.#setup(buffer, fftSize, smoothingTimeConstant)
        
    
    
    
        // async function go() {
        const result: Uint8Array[] = [];
    
        const hopSize = 128 / buffer.sampleRate;
    
        // async function* generate() {
    
        for (let time = 0; time < buffer.duration; time += hopSize) {
            // scheduling should be done while the context is not running to ensure the precise suspension
            context.suspend(time).then(async () => {
                const array = new Uint8Array(analyzerNode.frequencyBinCount);
                analyzerNode.getByteFrequencyData(array);
                result.push(array);
                await context.resume(); // resolves immediately because the OfflineAudioContext does not require the audio hardware
            });
    
        }
        // }
        
        await context.startRendering(); //resolves when complete
        return result;
    }
    async createSpectogram1(buffer: AudioBuffer, fftSize: FftSize = 2048, smoothingTimeConstant?: number) {
        const [context, analyzerNode] = this.#setup(buffer, fftSize, smoothingTimeConstant)
        
    
    
    
        // async function go() {
        const freqDomain= new Uint8Array(analyzerNode.frequencyBinCount * Math.ceil(buffer.length/128))
        const timeDomain= new Uint8Array(analyzerNode.frequencyBinCount * Math.ceil(buffer.length/128))
    
    
        // async function* generate() {
        const blockTimeConversion = 128 / buffer.sampleRate;
        const blockCount = buffer.length / 128;
        for (let block = 0; block < blockCount; block++) {
            // scheduling should be done while the context is not running to ensure the precise suspension
            const frame = block * 128;
            const time = frame / buffer.sampleRate;
            context.suspend(time).then(async () => {
                analyzerNode.getByteFrequencyData(freqDomain.subarray(frame, frame + analyzerNode.frequencyBinCount));
                analyzerNode.getByteTimeDomainData(timeDomain.subarray(frame, frame + analyzerNode.frequencyBinCount));
                await context.resume(); // resolves immediately because the OfflineAudioContext does not require the audio hardware
            });
    
        }
        // }
        
        await context.startRendering(); //resolves when complete
        return [freqDomain, timeDomain];
    }
    async *createSpectogram2(buffer: AudioBuffer, fftSize: FftSize = 2048, smoothingTimeConstant?: number) {
        const [context, analyzerNode] = this.#setup(buffer, fftSize, smoothingTimeConstant)
        
        const hopSize = 128 / buffer.sampleRate;
        
    
        // schedule all suspends:
        const promises = Array.from(function* () {
            let i = 0;
            while (i * 128 < buffer.length) {
                yield context.suspend(i++ * 128).then(() => {
                    const array = new Uint8Array(analyzerNode.frequencyBinCount);
                    analyzerNode.getByteFrequencyData(array);
                    return array;
                })
            }
        }());


        for (const promise of promises) {
            await context.resume();
            yield await promise;
        }
    }

   
}

function buildCrossover(source: AudioNode, context: BaseAudioContext) {
    
    const lowLowPass = new BiquadFilterNode(context, {
        type: 'lowpass',
        frequency: 300,
        Q: 0.7
    });
    const lowHighPass = new BiquadFilterNode(context, {
        type: 'highpass',
        frequency: 300,
        Q: 0.7
    });
    const lowOutput = new AnalyserNode(context);

    const highLowPass = new BiquadFilterNode(context, {
        type: 'highpass',
        frequency: 1800,
        Q: 0.7
    });
    const midOutput = new AnalyserNode(context);
    const highHighPass = new BiquadFilterNode(context, {
        type: 'highpass',
        frequency: 1800,
        Q: 0.7
    });
    const highOutput = new AnalyserNode(context);

    source.connect(lowLowPass).connect(lowOutput);
    source.connect(lowHighPass).connect(highLowPass).connect(midOutput);
    source.connect(highHighPass).connect(highOutput);

    return [lowOutput, midOutput, highOutput] as const;
}