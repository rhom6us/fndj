import { Func } from '@rhombus/func';
import { parseCommands, parseReducers } from '@rhombus/redux-command-pattern';
import { createStore } from 'redux';
import { search, Video } from './services/youtube';

const kind = 'kind';//: unique symbol = Symbol('kind');
export interface State {
    readonly activeContext: SearchState | DetailState;
}
export interface SearchState {
    readonly [kind]: 'search';
    readonly searchTerm: string;
    readonly pending?: boolean;
    readonly results: Video[];
}
export interface DetailState{
    readonly [kind]: 'detail';
    readonly video: Video;
}
function focus<TState, TArgs extends any[]>(reducer: Func<[state: TState, ...args: TArgs], TState>): Func<[State, ...TArgs], State> {
    throw '';
}
export const reducers = {
    search: {
        started(state: State, term: string) {
            return {
                ...state,
                activeContext: {
                    ...state.activeContext,
                    pending: true,
                }
            }
        },
        completed(state: State, results: Video[]) {
            return {
                ...state,
                activeContext: {
                    ...state.activeContext,
                    pending: false,
                    results
                }
            };
        },
        wentBack(state: State):State {
            return {
                ...state,
                activeContext: {
                    [kind]: 'search',
                    searchTerm: '',
                    results: [],
                }
            }
        }
    },
    resultSelected(state: State, video: Video):State {
        return {
            ...state,
            activeContext: {
                [kind]: 'detail',
                video,
            }
        }
    },
}
export const commandImplementation = {
    addTrack: {
        async *search(state: State, term: string) {
            yield events.search.started(term);
            const result = await search(term);
            yield events.search.completed(result ?? []);
        },
        selectResult(state: State, video: Video) {
            return events.resultSelected(video);
        },
        goBack(state: State, someArg:number) {
            return events.search.wentBack();
        }
    }
}
const initialState: State = {
    activeContext: {
        [kind]: 'search',
        searchTerm: '',
        results: []
    }
}

declare const __REDUX_DEVTOOLS_EXTENSION__: any;
export const [rootReducer, events] = parseReducers(reducers);
export const store = createStore(rootReducer, initialState, __REDUX_DEVTOOLS_EXTENSION__?.());
export const commands = parseCommands(commandImplementation, store, reducers);
