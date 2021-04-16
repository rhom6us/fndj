import { obj } from '@fndj/util';
import audioContext from '../audio-context';
import { fetchWithThrow } from './fetch-with-throw';

const baseUrl = 'http://localhost:5000';
type Query = Record<string, string | number | boolean>;
type Path = string | number | (string | number)[];
function makeUrl(path: Path, query: Query = {}): string {
    if (!Array.isArray(path)) {
        return makeUrl([path], query);
    }
    const pathstring = path.join('/');
    let querystring = obj.entries(query).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    if (querystring) {
        querystring = '?' + querystring;
    }

    return baseUrl.replace(/\/+$/, '') + '/' + pathstring.replace(/^\/+/, '') + querystring;
}

function get<T>(path: Path, query: Query = {}) {
    return fetchWithThrow(makeUrl(path, query)).then(p => p.json<T>());
}
function post<T>(path: Path, data: T, query: Query = {}) {
    return fetchWithThrow(makeUrl(path, query), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(p => p.json<T>());
}
function put<T>(path: Path, data: T, query: Query = {}) {
    return fetchWithThrow(makeUrl(path, query), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(p => p.json<T>());
}

export interface PreProcessData {
    id: string;
    bpm: number;
    firstBeat: number;
}
export function getPreprocessData(youtubeKey: string) {
    return get<PreProcessData>([`tracks`, youtubeKey]);
}
export function savePreprocessData(data: PreProcessData) {
    return post([`tracks`, data.id], data);
}
export function createPreprocessData(data: PreProcessData) {
    return put('tracks', data);
}

export async function getAudio(youtubeKey: string) {
    const response = await fetchWithThrow(makeUrl(['track', youtubeKey, 'audio']));
    const audioData = await response.arrayBuffer();
    return await audioContext.decodeAudioData(audioData);
}
