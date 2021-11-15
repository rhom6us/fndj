"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const gapi_1 = require("../gapi");
// const g = await (async function addScript() {
//     const script = document.createElement('script');
//     script.src = 'https://apis.google.com/js/api.js';
//     script.onload = e => {
//         console.log('gapi ONLOADED', { gapi, e });
//     };
//     document.head.appendChild(script);
//     console.log('gapi appended');
//     await setImmediateAsync();
//     console.warn('****************************************');
//     console.log('waited immediate', { gapi });
//     return window.gapi;
// }());
await (0, gapi_1.loadLib)('client');
var client = gapi.client;
exports.client = client;
await client.init({
// Your API key will be automatically added to the Discovery Document URLs.
// 'apiKey': 'YOUR_API_KEY',
// discoveryDocs: [
//     // 'https://people.googleapis.com/$discovery/rest',
//     'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'
// ],
});
//# sourceMappingURL=client.js.map