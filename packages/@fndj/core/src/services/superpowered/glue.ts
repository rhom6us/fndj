import { initialize } from '@fndj/superpowered';

export const glue = await initialize({
    licenseKey: 'ExampleLicenseKey-WillExpire-OnNextUpdate',
    enableAudioAnalysis: true,
    enableFFTAndFrequencyDomain: true,
    enableAudioTimeStretching: true,
    enableAudioEffects: true,
    enableAudioPlayerAndDecoder: true,
    enableCryptographics: true,
    enableNetworking: true,
})

