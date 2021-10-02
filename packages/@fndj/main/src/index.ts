import { FnMeterNode, PhaseVocoderNode, audioContext } from '@fndj/core/src/web-audio';
import { MongoEdit, MongoTrack, api } from '@fndj/core/src/realm';
import { logger } from '@fndj/util';

const log = logger.log;

// import { MongoClient } from 'mongodb';


declare global {
    interface Window {
        fnctx?: AudioContext;
        go(): void;
        fn: any;
    }
}
window.fnctx = audioContext.value;
const context = audioContext.value;
// import { SuperpoweredWebAudio } from '@fndj/superpowered';



// pp();
/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */



// function mongoDemo() {

//     const url = 'mongodb://rhombus:b1pPOgnLINndYxwGOtFnOgmOuYd61gHdG29jL7VF7kot402GiqGGLq0GrfL7iMVbCPb4QM32vqws6gb15ikrcw%3D%3D@rhombus.mongo.cosmos.azure.com:10255/?authSource=admin&replicaSet=globaldb&maxIdleTimeMS=120000&readPreference=primary&appname=MongoDB%20Compass&retryWrites=false&ssl=true';
//     const client = new MongoClient(url);

//     async function mongo() {
//         // Use connect method to connect to the server
//         await client.connect();
//         console.log('Connected successfully to server');
//         const db = client.db('fuckingdj');
//         const collection = db.collection('track');

//         // the following code examples can be pasted here...

//         return 'done.';
//     }
// }
export async function go() {
    window.fnctx = context;
    context.resume();

    log('fetching...');
    let response: Response;
    try {
        response = await fetch("https://fuckingdj.blob.core.windows.net/test/Jewelz%20%26%20Scott%20Sparks%20feat.%20Quilla%20%E2%80%93%20Unless%20We%20Forget%20(Original%20Mix).mp3");
        // response = await fetch("https://localhost:5001/tracks/n79xrZFz_fk/audio");
        // response = await fetch("https://fuckingdj.blob.core.windows.net/test/Swedish%20House%20Mafia%20-%20Save%20The%20World%20(Zedd%20Remix).mp3");


    } catch (er) {
        log('FETCHZZZ', er);
        return;
    }
    log('fetch success');

    const buffer = await response.arrayBuffer();
    const audioBuffer = await context.decodeAudioData(buffer);
    // await testAnalyze(audioBuffer);
    // return;
    const player = context.createBufferSource();
    player.buffer = audioBuffer;


    const meter = new FnMeterNode(context);
    const pitchShifter = new PhaseVocoderNode(context, { pitchFactor: 1, fftSize: 4096 });


    player.connect(meter);
    player.connect(pitchShifter).connect(context.destination);
    (window as any).fnmeter = meter;

    const tempoA = 128;
    const tempoB = 140;

    const playbackRate = tempoB / tempoA;

    // player.playbackRate.setValueAtTime(1, context.currentTime + 8);
    // pitchShifter.pitchFactor.setValueAtTime(1, context.currentTime + 8);

    player.playbackRate.setValueAtTime(playbackRate, context.currentTime + 8);
    pitchShifter.pitchFactor.setValueAtTime(1 / playbackRate, context.currentTime + 8);

    // player.playbackRate.linearRampToValueAtTime(playbackRate, context.currentTime + 16);
    // pitchShifter.pitchFactor.linearRampToValueAtTime(1 / playbackRate, context.currentTime + 16);

    player.playbackRate.setValueAtTime(1 / playbackRate, context.currentTime + 16);
    pitchShifter.pitchFactor.setValueAtTime(playbackRate, context.currentTime + 16);
    player.playbackRate.setValueAtTime(1, context.currentTime + 24);
    pitchShifter.pitchFactor.setValueAtTime(1, context.currentTime + 24);

    player.start(context.currentTime, 7);
    log("playing");

    // const source = await FnAudioBufferSourceNode.create(context, {
    //     //buffer: audioBuffer,
    //     baseTempo: 128,
    //     tempo: 128
    // });
    // source.buffer = audioBuffer;
    // source.connect(context.destination);
    // // source.start();
    // // context.resume();
    // setTimeout(() => {
    //     source.rate = 1.25;
    // }, 8000);
    // // source.tempo.setValueAtTime(140/128, context.currentTime + 10);
    // // source.playbackRate.setValueAtTime(128/140, context.currentTime + 10);
}

window.go = go;
// try {
//     context.resume();
//     go();
// } catch (er) {
//     log(`type "go()" to begin.`);
// }
