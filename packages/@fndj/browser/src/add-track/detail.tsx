import { Stack } from '@fluentui/react';
import React, { FC, ReactNode, useCallback } from 'react';
import { commands, DetailState } from './store';

interface Props extends DetailState {
}
interface Children {
    children?: ReactNode;
}
function ResultRoot({ children }: Children) {
    return <section>{children}</section>;
};
export const Detail: FC<Props> = ({ video }) => {
    const goBack = useCallback(() => commands.addTrack.goBack(33), []);

    return (
        <ResultRoot>
            <button onClick={goBack}>go back</button>

            <Stack horizontal={true}>
                <img src={video.snippet!.thumbnails!.default!.url} />
                <Stack>
                    <h3>{video.snippet!.title}</h3>
                    <p><strong>{video.snippet!.channelTitle}</strong><small>{video.contentDetails?.duration}</small></p>
                    <p>{video.snippet!.description}</p>
                </Stack>
            </Stack>

        </ResultRoot>
    );
};
