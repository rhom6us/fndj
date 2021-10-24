import { Stack } from '@fluentui/react';
import { useThrottledState } from '@fndj/browser/hooks';
import React, { FC, ReactNode, useCallback, useEffect } from 'react';
import { SearchState } from './reducers';
import { Video } from './services/youtube';
import { commands } from './store';

interface Props extends SearchState {
}
interface Children {
    children?: ReactNode;
}
function ResultRoot({ children }: Children) {
    return <section>{children}</section>;
};
export const Search: FC<Props> = ({ pending, results }) => {

    const [term, setTerm, throttledTerm, forceUpdate] = useThrottledState('', 1000);


    const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        forceUpdate();
        e.preventDefault();
        return false;
    }, [forceUpdate]);

    useEffect(() => {
        if (throttledTerm) {
            commands.addTrack.search(throttledTerm);
        }
    }, [throttledTerm]);

    return (
        <ResultRoot>
            <form onSubmit={onSubmit}>
                <input type="text" value={term} onChange={e => setTerm(e.target.value)} />
            </form>
            {pending ? <p>loading results...</p> : <></>}
            <Search_Results videos={results} />
        </ResultRoot>
    );
};

const Search_Results: FC<{ videos: Video[]; }> = ({ videos }) => {
    const onClick = useCallback((video: Video) => () => commands.addTrack.selectResult(video), []);
    return (
        <ResultRoot>
            <ul>
                {videos.map(video =>
                    <li key={video.id}>
                        <a onClick={onClick(video)}>
                            <Stack horizontal={true}>
                                <img src={video.snippet!.thumbnails!.default!.url} />
                                <Stack>
                                    <h3>{video.snippet!.title}</h3>
                                    <strong>{video.contentDetails?.duration}</strong>
                                    <p>{video.snippet!.description}</p>
                                </Stack>
                            </Stack>
                        </a>
                    </li>
                )}
            </ul>
        </ResultRoot>
    );
};
