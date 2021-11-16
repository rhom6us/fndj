import { SuperpoweredGlue, wasmUrl } from '@fndj/superpowered';

export const glue = await SuperpoweredGlue.fetch(wasmUrl);
glue.BigInt64Buffer
glue.Initialize({
    licenseKey: 'ExampleLicenseKey-WillExpire-OnNextUpdate',
    enableAudioAnalysis: true,
    enableFFTAndFrequencyDomain: true,
    enableAudioTimeStretching: true,
    enableAudioEffects: true,
    enableAudioPlayerAndDecoder: true,
    enableCryptographics: true,
    enableNetworking: true,
});


export { glue as Superpowered };

