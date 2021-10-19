import { Stack } from '@fluentui/react';
import { youtube } from '@rhombus/gapi';
import { usePromise } from '@rhombus/react';
import React, { FC, ReactNode, useCallback, useEffect, useState } from 'react';
interface Props {

}
interface Children {
    children?: ReactNode;
}
function ResultRoot({ children }: Children) {
    return <section>{children}</section>;
};
function useThrottledState<T>(initialValue: T, ms: number) {
    const [value, setValue] = useState(initialValue);
    const [throttledValue, setThrottledValue] = useState(value);
    const [token, setToken] = useState<number | void>();
    const cancelUpdate = useCallback((token: number | void) => clearTimeout(token!), []);
    const updateValue = useCallback((forced = false) => {
        setThrottledValue(value);
        setToken(cancelUpdate);
    }, [cancelUpdate, value]);
    useEffect(() => {
        setToken(setTimeout(updateValue, ms));
        return () => setToken(cancelUpdate);

    }, [cancelUpdate, updateValue, ms]);

    return [value, setValue, throttledValue, () => updateValue(true)] as const;
}
export const Search: FC<Props> = (props) => {
    const [term, setTerm, throttledTerm, forceUpdate] = useThrottledState('', 1000);


    const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        forceUpdate();
        e.preventDefault();
        return false;
    }, [forceUpdate]);

    const [ready, response] = usePromise(async () => {
        const listResponse = await youtube.search.list({
            part: [
                "snippet"
            ],
            maxResults: 25,
            order: "viewCount",
            q: throttledTerm,
            type: [
                "video"
            ]
        });
        const vidResponse = await youtube.videos.list({
            part: ['snippet', 'contentDetails'],
            id: listResponse.result.items!.map(p => p.id?.videoId).filter(Boolean).join(',')
        });
        return vidResponse.result!.items!;
    }, [throttledTerm]);

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
