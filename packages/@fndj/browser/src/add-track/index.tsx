import { Spinner, SpinnerSize } from '@fluentui/react';
import React, { FC } from 'react';
import { useStore } from '../hooks';
import { Detail } from './detail';
import { SearchState } from './reducers';
import { Search } from './search';
import { store } from './store';

const Bottom: FC<{ pending: boolean; }> = ({children, pending}) => <article>
    {pending && <Spinner size={SpinnerSize.large} />}
    {children}
</article>

export const AddTrack: FC = () => {

    const state = useStore(store) as SearchState;

    if (state.selectedItem) {
        return <Bottom pending={state.pending ?? false}><Detail video={state.selectedItem} download={state.download} /></Bottom>;
    }
    return (<Bottom pending={state.pending ?? false}><Search {...state} ></Search></Bottom>);


};
