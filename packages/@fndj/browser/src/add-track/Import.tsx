

import { ProgressIndicator } from '@fluentui/react';
import React, { FC, memo, useCallback, useEffect } from 'react';
import { AnalysisState, SearchStateDownload } from './reducers';
import { Video } from './services/youtube';
import { commands } from './store';

interface Props {
    video: Video;
    download: SearchStateDownload;
    analysis: AnalysisState['analysis'];
}


export const Import: FC<Props> = ({ video, download, analysis }) => {
    useEffect(() => {

     }, []);
    return (
        <section>
            {/* <Stack> */}
                <button onClick={useCallback(()=>commands.addTrack.goBack(),[])}>Back</button>
                <h1>{download.state === 'complete' ? 'Done!' : 'downloading...'}</h1>
                <Downloading progress={download.progress} />
                {download.state === 'complete' && <Analyzing data={analysis}  />}
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
    data: AnalysisState['analysis'];
}
export const Analyzing: FC<AnalyzingProps> = memo(function Analyzing({ data }: AnalyzingProps) {

    useEffect(() => {
        commands.addTrack.analyze();
    }, []);

    return <h1>analyzing... {data?.state}</h1>;
});
