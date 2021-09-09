import { audioContext } from './audio-context';
import { MongoTrack } from './realm';

export async function getYtAudio(id: string, urlBuilder?: (id: string) => string) {
    const url = urlBuilder?.call(null, id) ?? `https://localhost:5001/tracks/${id}/audio`;
    const result = await fetch(url);
    const arrayBuffer = await result.arrayBuffer();
    const audioBuffer = await audioContext.value.decodeAudioData(arrayBuffer);
    return audioBuffer;
}
