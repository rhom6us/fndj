import { getGapi, loadLib } from '../gapi';
let cache;
export async function getClient() {
    if (cache) {
        return cache;
    }
    await loadLib('client');
    const gapi = await getGapi();
    await gapi.client.init({
    // Your API key will be automatically added to the Discovery Document URLs.
    // 'apiKey': 'YOUR_API_KEY',
    // discoveryDocs: [
    //     // 'https://people.googleapis.com/$discovery/rest',
    //     'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'
    // ],
    });
    return cache = gapi.client;
}
//# sourceMappingURL=client.js.map