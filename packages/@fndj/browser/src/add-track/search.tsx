import { Stack } from '@fluentui/react';
import { useThrottledState } from '@fndj/browser/hooks';
import React, { FC, ReactNode, useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import { SearchResultsState, SearchState } from './reducers';
import { Video } from './services/youtube';
import { commands } from './store';


type Props = SearchState | SearchResultsState;//Pick<State, 'pending' | 'results' | 'searchTerm'>;
interface Children {
    children?: ReactNode;
}
function ResultRoot({ children }: Children) {
    return <section>{children}</section>;
};
export const Search: FC<Props> = (state) => {
    const { searchTerm, pending, results } = state as SearchResultsState;

    const [term, setTerm, throttledTerm, forceUpdate] = useThrottledState(searchTerm, 1000);
    const videos = useMemo(() => results && Array.from(results.values()), [results]);


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
                <input type="text" title="term" value={term} onChange={e => setTerm(e.target.value)} />
            </form>
            {pending ? <p>loading results...</p> : <></>}
            {videos && <Search_Results videos={videos} />}
        </ResultRoot>
    );
};
const Search_Results: FC<{ videos: Video[]; }> = ({ videos }) => {
    const navigate = useNavigate();
    const onClick = useCallback((video: Video) => () => navigate(`/tracks/${video.id}`), []);
    // const onClick = useCallback((video: Video) => () => commands.addTrack.selectResult(video.id!), []);
    return (
        <ResultRoot>
            <ul>
                {videos.map(video =>
                    <li key={video.id}>
                        <a onClick={onClick(video)}>
                            <Stack horizontal={true}>
                                <img alt="thumbnail" src={video.snippet!.thumbnails!.default!.url} />
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
