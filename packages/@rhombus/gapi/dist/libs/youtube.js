import { getGapi } from '../gapi';
import { getClient } from './client';
let cache;
export async function getYoutube() {
    if (cache) {
        return cache;
    }
    const gapi = await getGapi();
    const client = await getClient();
    await client.load('youtube', 'v3');
    return cache = gapi.client.youtube;
}
//# sourceMappingURL=youtube.js.map