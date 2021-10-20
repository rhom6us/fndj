import { Stack } from '@fluentui/react';
import { usePromise } from '@rhombus/react';
import React, { FC, ReactNode, useCallback } from 'react';
import { useThrottledState } from '../hooks';
import { youtube } from '../services';
interface Props {

}
interface Children {
    children?: ReactNode;
}
function ResultRoot({ children }: Children) {
    return <section>{children}</section>;
};
export const Search: FC<Props> = (props) => {
    const [term, setTerm, throttledTerm, forceUpdate] = useThrottledState('', 1000);


    const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        forceUpdate();
        e.preventDefault();
        return false;
    }, [forceUpdate]);

    const [ready, response] = usePromise(youtube.useSearch([throttledTerm]), [throttledTerm]);

    return (
        <ResultRoot>
            <form onSubmit={onSubmit}>
                <input type="text" value={term} onChange={e => setTerm(e.target.value)} />
            </form>
            {ready ? <Search_Results response={response!} /> : <p>loading results...</p>}
        </ResultRoot>
    );
};

const Search_Results: FC<{ response: gapi.client.youtube.Video[]; }> = ({ response }) => {

    return (
        <ResultRoot>
            <ul>
                {response.map(item =>
                    <li key={item.id}>
                        <Stack horizontal={true}>
                            <img src={item.snippet!.thumbnails!.default!.url} />
                            <Stack>
                                <h3>{item.snippet!.title}</h3>
                                <p><strong>{item.snippet!.channelTitle}</strong><small>{item.contentDetails?.duration}</small></p>
                                <p>{item.snippet!.description}</p>
                            </Stack>
                        </Stack>
                    </li>
                )}
            </ul>
        </ResultRoot>
    );
};
