import { useState } from 'react';
import { Store } from 'redux';


export function useStore<T extends Store<State,any>, State>(store: T): State {
    const [state, setState] = useState(store.getState());
    store.subscribe(() => {
        setState(store.getState());
    });

    return state;
}
