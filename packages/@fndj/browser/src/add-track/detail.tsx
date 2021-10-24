import { Stack } from '@fluentui/react';
import { YoutubeEmbed } from '@fndj/browser-ui';
import React, { FC, memo, useCallback } from 'react';
import { Video } from './services/youtube';
import { commands } from './store';
interface Props {
    video: Video;
}


export const Detail: FC<Props> = memo(function Detail({ video }: Props) {
    return (
        <section>
            <button onClick={useCallback(()=>commands.addTrack.goBack(),[])}>go back</button>
            <Stack>
                <Stack horizontal={true}>
                    <h3>{video.snippet!.title}</h3>
                    <strong>{video.snippet!.channelTitle}</strong>
                    <small>{video.contentDetails?.duration}</small>
                   <button onClick={useCallback(() => commands.addTrack.download(video.id!), [video.id])}>USE THIS VIDEO</button>
                </Stack>
                <YoutubeEmbed id={video.id!} />

            </Stack>
        </section>
    );
});
