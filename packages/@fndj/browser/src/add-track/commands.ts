import { ThunkDispatch } from '@rhombus/redux-command-pattern/src/utils';
import { events, SearchState } from './reducers';
import { download, search, Video } from './services/youtube';


export const commandImplementation = {
    addTrack: {
        async *search(state: SearchState, term: string) {
            yield events.search.started(term);
            const result = await search(term);
            yield events.search.completed(term, result ?? []);
        },
        selectResult(state: SearchState, video: Video) {
            return events.resultSelected(video);
        },
        goBack(state: SearchState) {
            return events.search.wentBack();
        },
        async *download(state: SearchState, id: string, signal?:AbortSignal) {
            yield events.download.started();
            const response = await download(id);
            const ctrl = new AbortController();
            signal?.addEventListener('abort', () => {
                response.cancel();
            }, { once: true, capture: false, passive: true, signal:ctrl.signal });
            yield (dispatch: ThunkDispatch) => {
                let wait = false;
                response.progress.addEventListener('progress', e => {
                    if (!wait && e.loaded < (e.total ?? Infinity)) {
                        dispatch(events.download.progress(e.loaded, e.total));
                        wait = true;
                        setTimeout(() => wait = false, 1000);
                    }
                }, { signal: ctrl.signal, capture: false, passive: true });
            };
            const buffer = await response.arrayBuffer();
            ctrl.abort();
            yield events.download.complete(buffer);
        }
    }
};
