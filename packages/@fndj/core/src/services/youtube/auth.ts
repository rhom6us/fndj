// // import { google, youtube_v3 } from 'googleapis';
// import settings from '../../../settings.json';
// // import { Credentials, OAuth2Client } from 'google-auth-library';
// import { store } from '../store';
// import { isDefined, logger } from "@rhombus-toolkit/type-helpers";
// import { getVideo } from './video';
// import {  GoogleAuth } from '@rhombus/gapi';
// import { AsyncFunc, Func } from "@rhombus-toolkit/func";
// // const OAuth2 = google.auth.OAuth2;
// export function newWindowRedirect(code: string) {
//     (window.opener as Window).postMessage({ google_oauth: { code } }, window.location.origin);
// }

// export const getClient: Func<[], GoogleAuth> = (function () {
//     let cache: GoogleAuth | undefined;

//     return function () {
//         if (cache) {
//             return cache;
//         }
//         const { client_id, client_secret, redirect_url } = settings['youtube-data'].oauth['fndj-browser'];
//         const client = gapi.auth2.init({ client_id, redirect_uri: redirect_url, fetch_basic_profile: true });

//         // const oauth2Client: OAuth2Client = new OAuth2(client_id, client_secret, redirect_url);
//         // oauth2Client.on('tokens', (tokens) => {
//         //     if (tokens.refresh_token) {
//         //         // store the refresh_token in my database!
//         //         logger.log({ refresh_token: tokens.refresh_token });
//         //     }
//         //     logger.log({ access_token: tokens.access_token });

//         // });
//         return cache = client;
//     };
// }());


// // function getCredentials(signal?: AbortSignal) {
// //     return store.token.loadOrAddAsync(() => getNewToken(signal));
// // }
// async function signIn(signal?: AbortSignal) {
//     const auth = getClient();
//     const user = await auth.signIn({ scope: settings['youtube-data'].scopes.join(' ') });
//     return user;
//     // const authUrl = oauth2Client.generateAuthUrl({
//     //     access_type: 'offline',
//     //     scope: settings['youtube-data'].scopes
//     // });

//     // const eventPromise = waitForMessage<{ google_oauth: { code: string; }; }>(p => !!p.data.google_oauth, signal);
//     // window.open(authUrl, '_blank ');
//     // const event = await eventPromise;
//     // if (event.origin !== window.location.origin) {
//     //     throw new Error('invalid origin');
//     // }
//     // const response = await oauth2Client.getToken(event.data.google_oauth.code);
//     // return response.tokens;
//     // return await new Promise((resolve, reject) => {
//     //     window.addEventListener("message", async function messageListener(event: MessageEvent<{ google_oauth?: { code: string; }; }>) {
//     //         if (!event.data.google_oauth) {
//     //             return;
//     //         }
//     //         try {
//     //             this.window.removeEventListener('message', messageListener);
//     //             if (event.origin !== window.location.origin) {
//     //                 throw new Error('invalid origin');
//     //             }
//     //             const response = await oauth2Client.getToken(event.data.google_oauth.code);
//     //             resolve(response.tokens);
//     //         }
//     //         catch (err) {
//     //             logger.error(err);
//     //             reject(err);
//     //         }

//     //     }, {
//     //         capture: false,
//     //         signal
//     //     });
//     // window.open(authUrl, '_blank ');

// }
// function waitForMessage<T>(validator: Func<[MessageEvent<T>], boolean>, signal?: AbortSignal) {
//     return new Promise<MessageEvent<T>>(resolve => {
//         window.addEventListener('message', function listener(e: MessageEvent<T>) {
//             if (!validator(e)) {
//                 return;
//             }
//             window.removeEventListener('message', listener);
//             resolve(e);
//         }, { capture: false, signal });
//     });
// }
