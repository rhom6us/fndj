import { Func } from '@rhombus/func';
import { parseReducers } from '@rhombus/redux-command-pattern';
import { Video } from './services/youtube';


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
        started(state:SearchState,term:string) {
            return {
                ...state,
                pending: true,

            };
        },
        completed(   state:   SearchState  ,   query  :  string  , results: Video[]  ) {
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


export const [searchReducer, events] = parseReducers(reducers);
// const alla = combineReducers({
//     search: searchReducer
// });
// const rootReducer = (history: History) => combineReducers({
//     router: connectRouter(history),
//     fnReducer: searchReducer,
// });
