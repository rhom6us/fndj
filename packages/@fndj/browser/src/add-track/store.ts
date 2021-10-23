import { Func } from '@rhombus/func';
import { parseCommands, parseReducers } from '@rhombus/redux-command-pattern';
import { ThunkDispatch } from '@rhombus/redux-command-pattern/src/utils';
import { createStore } from 'redux';
import { download, search, Video } from './services/youtube';


export interface SearchStateDownload{
    readonly loaded: number;
    readonly total?: number;
    readonly buffer?: ArrayBuffer;
}
export interface SearchState {
    readonly searchTerm: string;
    readonly pending?: boolean;
    readonly results: Video[];
    readonly selectedItem?: Video;
    readonly download?: SearchStateDownload;
}
function focus<TState, TArgs extends any[]>(reducer: Func<[state: TState, ...args: TArgs], TState>): Func<[SearchState, ...TArgs], SearchState> {
    throw '';
}

export const reducers = {
    search: {
        started(state: SearchState, term: string) {
            return {
                ...state,
                pending: true,

            };
        },
        completed(state: SearchState, results: Video[]) {
            return {
                ...state,
                pending: false,
                results
            };
        },
        wentBack(state: SearchState): SearchState {
            return {
                ...state,
                selectedItem: undefined,
            };
        }
    },
    resultSelected(state: SearchState, video: Video): SearchState {
        return {
            ...state,
            selectedItem: video,
        };
    },
    download: {
        started(state: SearchState):SearchState {
            return {
                ...state,
                pending: true,
            }
        },
        progress(state: SearchState, loaded: number, total?:number):SearchState {
            return {
                ...state,
                pending: false,
                download: {
                    loaded,
                    total
                }
            }
        },
        complete(state: SearchState, buffer:ArrayBuffer): SearchState {
            return {
                ...state,
                download: {
                    ...state.download!,
                    loaded: state.download!.total!,
                    buffer
                }
            }
        },
    }
};
export const commandImplementation = {
    addTrack: {
        async *search(state: SearchState, term: string) {
            yield events.search.started(term);
            const result = await search(term);
            yield events.search.completed(result ?? []);
        },
        selectResult(state: SearchState, video: Video) {
            return events.resultSelected(video);
        },
        goBack(state: SearchState) {
            return events.search.wentBack();
        },
        async *download(state: SearchState, id: string) {
            console.log('command landed');
            yield events.download.started();
            const response = await download(id);
            const ctrl = new AbortController();
            yield (dispatch: ThunkDispatch) => {
                let wait = false;
                response.progress.addEventListener('progress', e => {
                    if (!wait && e.loaded < (e.total ?? Infinity)) {
                        dispatch(events.download.progress(e.loaded, e.total));
                        wait = true;
                        setTimeout(() => wait = false, 100);
                    }
                }, { signal: ctrl.signal, capture: false, passive: true });
            };
            const buffer = await response.arrayBuffer();
            ctrl.abort();
            yield events.download.complete(buffer);
        }
    }
};

const initialState: SearchState = {
    searchTerm: '',
    results: [],
};

declare const __REDUX_DEVTOOLS_EXTENSION__: any;
export const [searchReducer, events] = parseReducers(reducers);
// const alla = combineReducers({
//     search: searchReducer
// });
// const rootReducer = (history: History) => combineReducers({
//     router: connectRouter(history),
//     fnReducer: searchReducer,
// });
export const store = createStore(
    searchReducer,
    // rootReducer(history),
    initialState,
    // /*initialState*/ Immutable.Map(),
    __REDUX_DEVTOOLS_EXTENSION__?.()
);
// export const store = createStore(fnReducer, initialState, __REDUX_DEVTOOLS_EXTENSION__?.());
export const commands = parseCommands(commandImplementation, store, reducers);
