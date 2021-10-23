import { ProgressIndicator, Stack } from '@fluentui/react';
import React, { FC, memo, ReactNode, useCallback, useMemo } from 'react';
import { Video } from './services/youtube';
import { commands, SearchStateDownload } from './store';
interface Props {
    video: Video;
    download?: SearchStateDownload;
}
interface Children {
    children?: ReactNode;
}
const ResultRoot = memo(function ResultRoot({ children }: Children) {
    return <section>{children}</section>;
});
const Desc = memo(function Desc({ video }: {video:Video}) {
    return <>
        <Stack horizontal={true}>
            <img src={video.snippet!.thumbnails!.default!.url} />
            <Stack>
                <h3>{video.snippet!.title}</h3>
                <p><strong>{video.snippet!.channelTitle}</strong><small>{video.contentDetails?.duration}</small></p>
                <p>{video.snippet!.description}</p>
            </Stack>
        </Stack>
    </>;
});

export const Detail: FC<Props> = memo(function Detail({ video, download }: Props & Children) {

    const startDwnload = useCallback(() => commands.addTrack.download(video.id!), [video.id]);
    const goBack = useCallback(() => commands.addTrack.goBack(), []);
    const downloading = useMemo(() => {
        return download && !download.buffer;
    }, [download]);
    const progress = useMemo(() => (download && (download.loaded ?? 0) / download!.total!) ?? 0, [download]);
    const canShowProgress = useMemo(() => !isNaN(progress), [progress]);

    return (
        <ResultRoot>
            <button onClick={goBack}>go back</button>

            <Stack>
                {!downloading && <button onClick={startDwnload}>download</button>}
                {downloading && canShowProgress && <ProgressIndicator label="Example title" description="Example description" percentComplete={progress} />}
                {downloading && !canShowProgress && <strong>{download?.loaded}</strong>}
                {!downloading && progress === 1 && <strong>{download!.total} done!</strong>}
                <Desc video={video} />
            </Stack>

        </ResultRoot>
    );
});
