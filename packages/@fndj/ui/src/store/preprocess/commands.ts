import { events } from '..';
import { FnState } from '../state';


// why doesn't this work?:
// type FnCommandFor<T extends ReducerFn> = T extends ReducerFn<infer TState, infer TPayload> ? CommandFn<TState, TPayload, StandardEventAny> : never;
// type FnCommandFor<T extends EventCreator<> = FnCommand<Parameters<T>[0]>;


const audioContext = new AudioContext();

// export const loadTrack: FnCommand<{ url: string; }> = async (state, { url }) => {
export async function loadTrack(state: FnState, url: string) {
    // export async function loadTrack(state:FnState, {url}:{url:string}){
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    return [
        events.preprocess.trackSet(audioBuffer, audioBuffer.sampleRate),
        events.preprocess.trackInfoUpdated({ seek: 0, trim: 0, bpm: 128 })
    ];
};
// export const updateTrackInfo = MakeDefaultCommand(events.preprocess.trackInfoUpdated);
export function updateTrackInfo(state: FnState, ...payload: Parameters<typeof events.preprocess.trackInfoUpdated>) {
    return events.preprocess.trackInfoUpdated(...payload);
};

// function MakeDefaultCommand<T extends EventCreatorAny>(eventCreator: T): CommandFn<FnState, Parameters<T>, ReturnType<T>> {
//     return (state: FnState, ...payload: restify<Parameters<T>>) => eventCreator(...payload);
// }

    // export const updateTrackInfo: FnCommandFor<typeof events.preprocess.trackInfoUpdated> = (state, payload) => {
    //     return events.preprocess.trackInfoUpdated(payload);
    // };
