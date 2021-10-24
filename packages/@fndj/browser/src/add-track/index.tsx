import { Spinner, SpinnerSize } from '@fluentui/react';
import { assertNever } from '@rhombus/type-guards';
import React, { FC, memo, useMemo } from 'react';
import { useStore } from '../hooks';
import { Detail } from './Detail';
import { Import } from './Import';
import { State } from './reducers';
import { Search } from './Search';
import { store } from './store';

const Bottom: FC<{ pending: boolean; }> = ({ children, pending }) => <article>
    {pending && <Spinner size={SpinnerSize.large} />}
    {children}
</article>;

function whatView(state: any) {
    if (state.download) {
        return 'import' as const;
    }
    if (state.selectedItem) {
        return 'detail' as const;
    }

    return 'search' as const;
}
function getView(state: any) {

    const view = whatView(state);
    const selectedVideo = state.results?.get(state.selectedItem!);
    switch (view) {
        case 'search': return <Search searchTerm={state.searchTerm} pending={state.pending} results={state.results} />;
        case 'detail': return <Detail video={selectedVideo!} />;
        case 'import': return <Import video={selectedVideo!} download={state.download!} analysis={state.analysis} />;
        default: return assertNever(view);
    }
}

export const AddTrack: FC = memo(function AddTrack() {

    const state = useStore(store) as State;
    return (
        <Bottom pending={state.pending ?? false}>
            {useMemo(() => getView(state), [state])}
        </Bottom>
    );
});
