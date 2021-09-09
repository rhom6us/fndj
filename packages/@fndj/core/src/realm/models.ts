

interface SuperpoweredAnalysis {
    averageDb: number,
    loudpartsAverageDb: number,
    peakDb: number,
    bpm: number,
    beatgridStartMs: number,
    keyIndex: number,
}
export interface MongoEdit extends SuperpoweredAnalysis {
    version: number;
    src: 'superpowered',
    processed: Date,
}
interface YoutubeMediaThumbnail {
    url: string;
    resolution: {
        width: number;
        height: number;
    };

}
export interface YoutubeMedia {
    id: string;
    title: string;
    author: string;
    uploadDate: Date;
    description: string;
    duration: number;
    // thumbnails?: YoutubeMediaThumbnail[];
    // keywords: string[];
    // engagement: {
    //     viewCount: number;
    //     likeCount: number;
    //     dislikeCount: number;
    //     averageRating: number;
    // };

}
export interface MongoTrack extends YoutubeMedia {
    _id: {
        src: 'youtube';
        key: string;
    };
    edits: MongoEdit[];

}
