import { parseReducers } from '@rhombus/redux-command-pattern';
import { Video } from './services/youtube';

interface DownloadState_Active {
    readonly ctrl: AbortController;
}
interface DownloadState_Started {
    readonly progress: {
        readonly loaded: number;
        readonly total: number;
    };
}
export interface DownloadState_Pending extends DownloadState_Active {
    readonly state: 'pending';
    readonly progress: undefined;
}
export interface DownloadState_Ongoing extends DownloadState_Active, DownloadState_Started {
    readonly state: 'ongoing';
}
export interface DownloadState_Complete extends DownloadState_Started {
    readonly state: 'complete';
    readonly buffer: ArrayBuffer;
}
export type SearchStateDownload = DownloadState_Pending | DownloadState_Ongoing | DownloadState_Complete;

export interface Analysis {
    readonly bpm: number;
    readonly firstBeat: number;
}
export interface SearchState {
    readonly searchTerm: string;
    readonly pending?: boolean;
    readonly results?: Map<string, Video>;
    readonly selectedItem?: string;
    readonly download?: SearchStateDownload;
}
export const initialState: SearchState = {
    searchTerm: '',
};

export const reducers = {
    search: {
        started(state: SearchState, searchTerm: string):SearchState {
            return {
                ...state,
                pending: true,
                searchTerm
            };
        },
        completed(state: SearchState, query: string, results: Video[]):SearchState {
            return {
                ...state,
                pending: false,
                results: new Map(results.map(p => [p.id!, p])),
            };
        },
        resultSelected(state: SearchState, videoId: string): SearchState {
            return {
                ...state,
                selectedItem: videoId,
            };
        },
        wentBack(state: SearchState): SearchState {
            return {
                ...state,
                selectedItem: undefined,
                download: undefined,
            };
        }
    },
    download: {
        started(state: SearchState, ctrl:AbortController): SearchState {
            return {
                ...state,
                download: {
                    state: 'pending',
                    progress: undefined,
                    ctrl
                }
            };
        },
        progress(state: SearchState, loaded: number, total: number): SearchState {
            if(!state.download || state.download?.state === 'complete')  throw 'wtf mate';
            return {
                ...state,
                pending: false,
                download: {
                    ...state.download,
                    state: 'ongoing',
                    progress: {
                        loaded,
                        total
                    }
                }
            };
        },
        complete(state: SearchState, buffer: ArrayBuffer): SearchState {
            if(state.download?.state !== 'ongoing')  throw 'wtf mate';
            return {
                ...state,
                download: {
                    ...state.download,
                    progress: {
                        ...state.download.progress,
                        loaded: state.download.progress.total,
                    },
                    state: 'complete',
                    buffer
                }
            };
        },
    }
};


export const [searchReducer, events] = parseReducers(reducers);
// const alla = combineReducers({
//     search: searchReducer
// });
// const rootReducer = (history: History) => combineReducers({
//     router: connectRouter(history),
//     fnReducer: searchReducer,
// });
