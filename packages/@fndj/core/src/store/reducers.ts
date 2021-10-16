import { ReducerFn } from '@rhombus/redux-command-pattern';
type FnState = {
    something: 'or another';
};
type FnReducer<T> = ReducerFn<FnState, T>;


    export function dothis(state:FnState, huh:number) {
        return state;
    }

    export function dothat(state:FnState, maybe:{huh:string, when:Date}) {
        return state;
    }

    export function dosomething(state:FnState, huh:string, when:Date) {
        return state;
    }
