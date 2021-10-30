import React, { CSSProperties, FC } from 'react';
const divStyle: CSSProperties = {
    overflow: 'hidden',
    paddingBottom: CSS.percent(56.25).toString(),
    position: 'relative',
    height: 0,
};
const iFrameStyle: CSSProperties = {
    left: 0,
    top: 0,
    height: CSS.percent(100).toString(),
    width: CSS.percent(100).toString(),
    position: 'absolute',
};

export const YoutubeEmbed: FC<{ id: string; height?: number; width?:number }> = ({ id, height, width }) => (
    <div className="video-responsive" style={divStyle}>
        <iframe style={iFrameStyle}
            width={width ?? 853}
            height={height ?? 480}
            src={`https://www.youtube.com/embed/${id}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
        />
    </div>
);
