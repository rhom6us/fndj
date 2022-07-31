/* eslint-disable @typescript-eslint/no-namespace */
import { isDefined } from "@rhombus-toolkit/type-guards";
// import type { youtube_v3 } from 'googleapis';
// import * as youtube from './api';
import { youtube } from '@rhombus/gapi';
// const youtube = google.youtube("v3");


// async function* search(query: string, pageToken?: string) {
//     let token = pageToken;
//     const getResponse = () => api.search.list({
//         auth: settings['youtube-data']['api-keys']['api-key-1'],
//         q: query,
//         pageToken: token
//     });

//     do {
//         const response = await getResponse();
//         yield* getVideo(response.data.items!.map(p => p.id?.videoId).filter(isDefined));

//         token = response.data.nextPageToken!;
//     } while (token);
// }


export async function* search(query: string, pageToken?: string): AsyncIterable<youtube.Video> {
    let token = pageToken;
    const getResponse = () => youtube.search.list({
        // auth: settings['youtube-data']['api-keys']['api-key-1'],
        q: query,
        pageToken: token,
        part: ['snippet']
        
    });
    do {
        const response = await getResponse();
        yield* getVideo(response.result.items!.map(p => p.id?.videoId).filter(isDefined));

        token = response.result.nextPageToken!;
    } while (token);
}
export function getVideo(id: string): Promise<youtube.Video>;
export function getVideo(ids: string[]): AsyncIterable<youtube.Video>;
export function getVideo(...ids: string[]): AsyncIterable<youtube.Video>;
export function getVideo(...args: [string[]] | string[]){
    if (!Array.isArray(args[0])) {
        return getVideo(args as string[]);
    }
    if (args.length !== 1) {
        throw 'wtf mate';
    }
    const [ids] = args;
    const result = _getVideo(ids);

    if (ids.length == 1) {
        return firstOrDefault(result);
    }

    return result;
}

async function* _getVideo(id: string[], pageToken?: string): AsyncIterable<youtube.Video> {
    let token = pageToken;
    const getResponse = () => youtube.videos.list({
        // auth: settings['youtube-data']['api-keys']['api-key-1'],
        part: ['snippet', 'contentDetails'/*, 'statistics'*/],
        id,
        pageToken: token
    });

    do {
        const response = await getResponse();
        yield* response.result.items ?? [];
        token = response.result.nextPageToken;
    } while (token);
}

async function firstOrDefault<T>(source: AsyncIterable<T>): Promise<T | undefined>;
async function firstOrDefault<T, D>(source: AsyncIterable<T>, defaultValue: D): Promise<T | D>;
async function firstOrDefault<T>(source: AsyncIterable<T>, defaultValue: any = undefined){
    for await (const item of source) {
        return item;
    }
    return defaultValue;
}
