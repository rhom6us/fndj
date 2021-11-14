import { Spinner, SpinnerSize } from '@fluentui/react';
import { Authenticate } from '@rhombus/gapi-react';
import { assertNever } from '@rhombus/type-guards';
import React, { FC, memo, useMemo } from 'react';
import { useStore } from '../hooks';
import { Detail } from './Detail';
import { Import } from './Import';
import { State, StateType } from './reducers';
import { Search } from './search';
import { store } from './store';

const Bottom: FC<{ pending: boolean; }> = ({ children, pending }) => <article>
    {pending && <Spinner size={SpinnerSize.large} />}
    {children}
</article>;


function getView(state: State) {

    const type = state.type;
    switch (type) {
        case StateType.search:
        case StateType.search_results: return <Search  {...state} />;
        case StateType.details: return <Detail video={state.results.get(state.selectedItem)!} />;
        case StateType.download:
        case StateType.analysis:
        case StateType.waveform:
        case StateType.draw: return <Import video={state.results.get(state.selectedItem)!} state={state} />;
        default: return assertNever(type);
    }
}

export const AddTrack: FC = memo(function AddTrack() {

    const state = useStore(store) as State;
    return (

        <Authenticate clientId="777867454715-99kgvcm3bve22qiohkgp7ddosk5fcbpv.apps.googleusercontent.com">
        <Bottom pending={state.pending ?? false}>
            {useMemo(() => getView(state), [state])}
            </Bottom>
        </Authenticate>
    );
});
