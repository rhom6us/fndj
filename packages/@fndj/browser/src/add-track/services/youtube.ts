import { defer } from '@rhombus/defer';
import '@rhombus/fetch';
import { wrapResponse } from '@rhombus/fetch';
import { Func } from '@rhombus/func';
import { youtube } from '@rhombus/gapi';

export type Video = youtube.Video;
export async function search(query: string) {
    const listResponse = await youtube.search.list({
        part: [
            "snippet"
        ],
        maxResults: 25,
        order: "viewCount",
        q: query,
        type: [
            "video"
        ]
    });
    const vidResponse = await youtube.videos.list({
        part: ['snippet', 'contentDetails'],
        id: listResponse.result.items!.map(p => p.id?.videoId).filter(Boolean).join(',')
    });
    return vidResponse.result?.items;
}

export async function download(id: string) {
    const url = `https://localhost:5001/${id}/audio`;
    const request = new Request(url);
    const cache = await caches.open('youtube');
    const cacheResponse = await cache.match(request);
    if (cacheResponse) {
        console.log('returning from cache!');
        return wrapResponse(cacheResponse.clone());
    }

    const response = await fetch(request.clone());
    cache.put(request, response.clone());
    return response;
    // const add:AddRemoveListener<ProgressEvent> = p=>response.addEventListener('progress', p);
    // const remove:AddRemoveListener<ProgressEvent> = p=> response.removeEventListener('progress', p);
    // for await (const item of eventToIterator<ProgressEvent>(add, remove, p => p.lengthComputable && (p.loaded >= p.total))) {
    //     yield [[item.loaded, item.total]] as readonly[ progress?:readonly [loaded:number, total:number], result?:ArrayBuffer];
    // }
    // const buffer = await response.arrayBuffer();
    // yield [undefined, buffer];
}

type AddRemoveListener<E extends Event> = Func<[Func<[E], any>], void>;
function eventToIterator<E extends Event>(addEventListener: AddRemoveListener<E>, ...args: [removeEventListener: AddRemoveListener<E>, isDone: Func<[E], boolean>] | []) {
    let waiting: undefined | defer;
    let next: undefined | E;
    const [removeEventListener, isDone] = args;
    const listener = (ev: E) => {
        next = ev;
        if (waiting !== undefined) {
            waiting.resolve();
        }
    };
    const iter: AsyncIterableIterator<E> = {
        async next() {
            if (!next) {
                waiting = defer();
                await waiting.promise;
                waiting = undefined;
            }

            const result = {
                value: next!,
                done: isDone?.(next!)
            };
            next = undefined;
            if (result.done) {
                removeEventListener?.(listener);
            }
            return result;
        },
        [Symbol.asyncIterator]() { return this; }
    };
    addEventListener(listener);
    return iter;
}
