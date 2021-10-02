import { youtube_v3 } from 'googleapis';
import { ObjectId } from 'mongodb';

interface SuperpoweredAnalysis {
    averageDb: number,
    loudpartsAverageDb: number,
    peakDb: number,
    bpm: number,
    beatgridStartMs: number,
    keyIndex: number,
}
export interface MongoEdit extends SuperpoweredAnalysis {
    src: 'superpowered',
    processed: Date,
}
// interface YoutubeMediaThumbnail {
//     url: string;
//     resolution: {
//         width: number;
//         height: number;
//     };

// }
// export interface YoutubeMedia {
//     id: string;
//     title: string;
//     author: string;
//     uploadDate: Date;
//     description: string;
//     duration: number;
//     // thumbnails?: YoutubeMediaThumbnail[];
//     // keywords: string[];
//     // engagement: {
//     //     viewCount: number;
//     //     likeCount: number;
//     //     dislikeCount: number;
//     //     averageRating: number;
//     // };

// }
export interface MongoTrack extends youtube_v3.Schema$Video {
    _id: ObjectId;

}
export interface EditsField {
    edits: MongoEdit[];
}
