import { AnalysisResults } from '@fndj/core/src/services/superpowered';
import { Video } from '@rhombus/gapi/lib/youtube';
import { parseReducers } from '@rhombus/redux-command-pattern';

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
    readonly buffer?: undefined;
}
export interface DownloadState_Ongoing extends DownloadState_Active, DownloadState_Started {
    readonly state: 'ongoing';
    readonly buffer?: undefined;
}
export interface DownloadState_Complete extends DownloadState_Started {
    readonly state: 'complete';
    readonly buffer: ArrayBuffer;
}
export type DownloadStateDownload = DownloadState_Pending | DownloadState_Ongoing | DownloadState_Complete;
export interface StateBase<T extends StateType> {
    readonly type: T;
}

export interface SearchState extends StateBase<StateType.search>, SearchStateData { }
export interface SearchStateData {
    readonly searchTerm: string;
    readonly pending: boolean;
    // readonly selectedItem?: string;
    // readonly download?: SearchStateDownload;
    // readonly analysis?: AnalysisStateDataData;
}
export interface SearchResultsState extends StateBase<StateType.search_results>, SearchResultsStateData { }
export interface SearchResultsStateData extends SearchStateData {
    readonly results: Map<string, Video>;

}
export interface DetailsState extends StateBase<StateType.details>, DetailsStateData { }
export interface DetailsStateData extends SearchResultsStateData {
    readonly selectedItem: string;
}
export interface DownloadState extends StateBase<StateType.download>, DownloadStateData { }
export interface DownloadStateData extends DetailsStateData {
    readonly results: Map<string, Video>;
    readonly download: DownloadStateDownload;
}
type  AnalysisStateDataData = {
    state: 'decoding' | 'analyzing'
} | {
    state: 'complete';
    results: AnalysisResults;
}
export interface AnalysisState extends StateBase<StateType.analysis>, AnalysisStateData { }
export interface AnalysisStateData extends DownloadStateData {
    readonly analysis: AnalysisStateDataData;
    readonly download: DownloadState_Complete;
}

export interface DrawingState extends StateBase<StateType.draw>, DrawingStateData { }
export interface DrawingStateData extends AnalysisStateData {
    readonly waveformImageData: [min:number, max:number][];
}

export interface WaveformState extends StateBase<StateType.waveform>, WaveformStateData { }
export interface WaveformStateData extends DrawingStateData {
    readonly waveFormData: {
        readonly viewWidth: number;
        readonly viewHeight: number;
        readonly duration: number;
        readonly startOffset: number;
    }
}

export type State =
    | SearchState
    | SearchResultsState
    | DetailsState
    | DownloadState
    | AnalysisState
    | DrawingState
    | WaveformState
    ;
export enum StateType {
    search ,
    search_results ,
    details ,
    download ,
    analysis,
    waveform,
    draw ,
}
export const initialState: State = {
    type: StateType.search,
    pending: false,
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
                type: StateType.search,
                pending: true,
                searchTerm
            };
        },
        completed(state: State, query: string, results: Video[]):State {
            return {
                ...state,
                type: StateType.search_results,
                pending: false,
                results: new Map(results.map(p => [p.id!, p])),
            };
        },
        resultSelected(state: SearchResultsState, videoId: string): State {
            if (state.type < StateType.search_results) throw 'wtf mate?';

            return {
                ...state,
                type: StateType.details,
                selectedItem: videoId,
            };
        },
        wentBack(state: State): State {
            return {
                // ...remove(state, 'analysis', 'download', 'selectedItem'),
                ...state,
                type: StateType.search
            };
        }
    },
    download: {
        started(state: DetailsState, ctrl:AbortController): State {
            return {
                ...state,
                type: StateType.download,
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
                type:StateType.download,
                pending: false,
                download: {
                    ...state.download,
                    state: 'ongoing',
                    ctrl:new AbortController(),
                    progress: {
                        loaded,
                        total
                    }
                }
            };
        },
        complete(state: DownloadState, buffer: ArrayBuffer): State {
            return {
                ...state,
                type: StateType.download,
                download: {
                    ...state.download,
                    progress: {
                        total:state.download.progress!.total!,
                        loaded: state.download.progress!.total!,
                    },
                    state: 'complete',
                    buffer
                }
            };
        },
    },
    analyze: {
        decodingStarted(state: DownloadState & {download:{state:'complete'}}): State{
            if (state.type < StateType.download) throw 'wtf mate?';
            if(state.download.state !== 'complete') throw 'wtf mate?';
            return {
                ...state,
                type: StateType.analysis,
                analysis: {
                    state: 'decoding'
                }
            }
        },
        analysisStarted(state: AnalysisState): State{
            if (state.type < StateType.analysis) throw 'wtf mate?';
            // if(!('analysis' in state)) throw 'wtf mate?';
            return {
                ...state,
                analysis: {
                    ...state.analysis,
                    state: 'analyzing'
                }
            }
        },
        analysisCompleted(state: AnalysisState, results: AnalysisResults): State{
            if (state.type < StateType.analysis) throw 'wtf mate?';
            // if(!('analysis' in state)) throw 'wtf mate?';
            return {
                ...state,
                analysis: {
                    ...state.analysis,
                    state: 'complete',
                    results
                }
            }
        },
        waveformsStarted(state: AnalysisState):DrawingState {
            return {
                ...state,
                type: StateType.draw,
                waveformImageData: []
            }
        },
        waveformComputed(state: WaveformState, data: { waveformImageData: [min: number, max: number][]; }) {
            
            return {
                ...state,
                type: StateType.waveform,
                waveformImageData:data.waveformImageData,
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
