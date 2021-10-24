import { ThunkDispatch } from '@rhombus/redux-command-pattern/src/utils';
import { events, SearchState } from './reducers';
import { download, search } from './services/youtube';


export const commandImplementation = {
    addTrack: {
        async *search(state: SearchState, term: string) {
            yield events.search.started(term);
            const result = await search(term);
            yield events.search.completed(term, result ?? []);
        },
        selectResult(state: SearchState, videoId: string) {
            return events.search.resultSelected(videoId);
        },
        goBack(state: SearchState) {
            if (state.download && state.download?.state !== 'complete') {
                state.download.ctrl.abort();
            }
            return events.search.wentBack();
        },
        async *download(state: SearchState, id: string) {
            const ctrl = new AbortController();
            yield events.download.started(ctrl);

            const response = await download(id);

            ctrl.signal.addEventListener('abort', () => {
                response.cancel();
            });
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
