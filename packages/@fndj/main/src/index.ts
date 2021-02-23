import { FnAudioBufferSourceNode } from './FnAudioBufferSourceNode';

declare global {
    interface Window {
        fnctx?: AudioContext;
    }
}
export async function go(context = new AudioContext()) {
    window.fnctx = context;

    const response = await fetch("https://fuckingdj.blob.core.windows.net/test/Swedish%20House%20Mafia%20-%20Save%20The%20World%20(Zedd%20Remix).mp3");
    const buffer = await response.arrayBuffer();
    const audioBuffer = await context.decodeAudioData(buffer);


    const source = await FnAudioBufferSourceNode.create(context, {
        //buffer: audioBuffer,
        baseTempo: 128,
        tempo: 128
    });
    source.buffer = audioBuffer;
    source.connect(context.destination);
    // source.start();
    // context.resume();
    setTimeout(() => {
        source.rate = 1.25;
    }, 8000);
    // source.tempo.setValueAtTime(140/128, context.currentTime + 10);
    // source.playbackRate.setValueAtTime(128/140, context.currentTime + 10);
}
