

import { ProgressIndicator } from '@fluentui/react';
import React, { FC, memo, useCallback } from 'react';
import { SearchStateDownload } from './reducers';
import { Video } from './services/youtube';
import { commands } from './store';

interface Props {
    video: Video;
    download: SearchStateDownload;
}


export const Import: FC<Props> = ({ video, download }) => {
    return (
        <section>
            {/* <Stack> */}
                <button onClick={useCallback(()=>commands.addTrack.goBack(),[])}>Back</button>
                <h1>{download.state === 'complete' ? 'Done!' : 'downloading...'}</h1>
                <Downloading progress={download.progress} />
                {download.state === 'complete' && <Analyzing buffer={download.buffer!} />}
            {/* </Stack> */}
        </section>
    );
};

interface DownloadingProps {
    readonly progress?: {
        readonly loaded: number;
        readonly total?: number;
    };
}
export const Downloading: FC<DownloadingProps> = memo(function Downloading({ progress }: DownloadingProps) {
    if (!progress || !progress.total) {
        return <ProgressIndicator />;
    }
    return <ProgressIndicator percentComplete={progress.loaded / progress.total} />;
});

interface AnalyzingProps {
    buffer: ArrayBuffer;
}
export const Analyzing: FC<AnalyzingProps> = memo(function Analyzing({ buffer }: AnalyzingProps) {
    return <h1>analyzing... {buffer.byteLength}</h1>;
});
