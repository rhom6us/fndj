import { useEffect, useState } from 'react';
import { Store } from 'redux';


export function useStore<T extends Store<State,any>, State>(store: T): State {
    const [state, setState] = useState(store.getState());
    useEffect(() => {
        return store.subscribe(() => {
            setState(store.getState());
        });
    }, [store]);

    return state;
}
