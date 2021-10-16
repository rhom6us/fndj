import { audioContext } from '../../web-audio/audio-context';
import settings from '../../../settings.json';

export async function getAudio(id: string, urlBuilder?: (id: string) => string) {
    const url = urlBuilder?.call(null, id) ?? `${settings['youtube-proxy'].host}/tracks/${id}/audio`;
    const result = await fetch(url);
    const arrayBuffer = await result.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    return audioBuffer;
}
