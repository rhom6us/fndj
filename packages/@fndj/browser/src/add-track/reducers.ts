import { AnalysisResults } from '@fndj/core/src/services/superpowered';
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


export interface SearchState {
    readonly searchTerm: string;
    readonly pending?: boolean;
    readonly results?: Map<string, Video>;
}
export interface DetailsState extends SearchState {
    readonly selectedItem: string;
}
export interface DownloadState extends DetailsState {
    readonly download: SearchStateDownload;
}

export interface AnalysisState extends DownloadState {
    readonly analysis?: {
        state: 'decoding' | 'analyzing'
    } | {
        state: 'complete';
        results: AnalysisResults;
    }
}
export type State = SearchState | DetailsState | DownloadState | AnalysisState;
export const initialState: State = {
    searchTerm: '',
};
function remove(obj: object, ...keys: string[])  {
    const result: any = { ...obj };
    for (const key of keys) {
        delete result[key];
    }
    return result;
}
export const reducers = {
    search: {
        started(state: State, searchTerm: string):State {
            return {
                ...state,
                pending: true,
                searchTerm
            };
        },
        completed(state: State, query: string, results: Video[]):State {
            return {
                ...state,
                pending: false,
                results: new Map(results.map(p => [p.id!, p])),
            };
        },
        resultSelected(state: State, videoId: string): State {
            return {
                ...state,
                selectedItem: videoId,
            };
        },
        wentBack(state: State): State {
            return remove(state, 'analysis', 'download', 'selectedItem');
        }
    },
    download: {
        started(state: State, ctrl:AbortController): State {
            return {
                ...state,
                download: {
                    state: 'pending',
                    progress: undefined,
                    ctrl
                }
            };
        },
        progress(state: State, loaded: number, total: number): State {
            if(!('download' in state) || state.download?.state === 'complete')  throw 'wtf mate';
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
        complete(state: State, buffer: ArrayBuffer): State {
            if(!('download' in state) || state.download?.state !== 'ongoing')  throw 'wtf mate';
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
    },
    analyze: {
        decodingStarted(state: State): State{
            return {
                ...state,
                analysis: {
                    state: 'decoding'
                }
            }
        },
        analysisStarted(state: State): State{
            if(!('analysis' in state)) throw 'wtf mate?';
            return {
                ...state,
                analysis: {
                    ...state.analysis,
                    state: 'analyzing'
                }
            }
        },
        analysisCompleted(state: State, results: AnalysisResults): State{
            if(!('analysis' in state)) throw 'wtf mate?';
            return {
                ...state,
                analysis: {
                    ...state.analysis,
                    state: 'complete',
                    results
                }
            }
        }
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
