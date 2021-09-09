// import url from '*.worklet.ts';
// import { PITCH_FACTOR, FFT_SIZE, PROCESSOR_NAME } from './FnPhaseVocoder/constants';
// import { getOrAdd } from './FnPhaseVocoder/util';

// export static function register(context: BaseAudioContext) {
//     return getOrAdd(initializedContextsWithThisWorklet, context, () => context.audioWorklet.addModule(url));
// }

// constructor(context: BaseAudioContext, options: PhaseVocoderNodeOptions) {
//     if (!initializedContextsWithThisWorklet.has(context)) {
//         throw new Error(`this audio worklet hasn't been initialized with this audiocontext`);
//     }
//     const la = { processorOptions: { [FFT_SIZE]: options[FFT_SIZE] ?? 1024 }, parameterData: { [PITCH_FACTOR]: options[PITCH_FACTOR] ?? 1 } };
//     console.log("sending in fft size " + options[FFT_SIZE]);
//     super(context, 'work man', PROCESSOR_NAME, la);
// }
// function initializedContextsWithThisWorklet(initializedContextsWithThisWorklet: any, context: BaseAudioContext, arg2: () => Promise<void>) {
//     throw new Error('Function not implemented.');
// }

// function constructor(context: any, BaseAudioContext: { new(): BaseAudioContext; prototype: BaseAudioContext; }, options: any, PhaseVocoderNodeOptions: any) {
//     throw new Error('Function not implemented.');
// }

// function context(context: any, BaseAudioContext: { new(): BaseAudioContext; prototype: BaseAudioContext; }, options: any, PhaseVocoderNodeOptions: any) {
//     throw new Error('Function not implemented.');
// }

// function PhaseVocoderNodeOptions(context: any, BaseAudioContext: { new(): BaseAudioContext; prototype: BaseAudioContext; }, options: any, PhaseVocoderNodeOptions: any) {
//     throw new Error('Function not implemented.');
// }
