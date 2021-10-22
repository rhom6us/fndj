import { youtube } from '@rhombus/gapi';

export async function search(query: string) {
    const listResponse = await youtube.search.list({
        part: [
            "snippet"
        ],
        maxResults: 25,
        order: "viewCount",
        q: query,
        type: [
            "video"
        ]
    });
    const vidResponse = await youtube.videos.list({
        part: ['snippet', 'contentDetails'],
        id: listResponse.result.items!.map(p => p.id?.videoId).filter(Boolean).join(',')
    });
    return vidResponse.result?.items;
}
export type Video = youtube.Video;
