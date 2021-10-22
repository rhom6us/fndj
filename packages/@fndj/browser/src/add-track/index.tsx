import React, { FC } from 'react';
import { useStore } from '../hooks';
import { Detail } from './detail';
import { Search } from './search';
import { State, store } from './store';
export const AddTrack: FC = () => {

    const state = useStore(store) as State;
    switch (state.activeContext.kind) {
        case 'search':
            return (<Search {...state.activeContext} ></Search>);
        case 'detail':
            return <Detail {...state.activeContext} />;
        default:
            return <>
                <h3>Well this is embarrasing</h3>
                <h4>it looks like we fucked up</h4>
            </>;
    }
};
