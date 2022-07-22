
// import { isDefined } from '@rhombus/type-guards';
// import axios from 'axios';
// import type { StandardParameters } from './StandardParameters';


// /* eslint-disable @typescript-eslint/no-namespace */
// const googleApisUrl = new URL('https://www.googleapis.com/');

// const youtubeUrl = new URL('youtube/v3/', googleApisUrl);
// import { youtube } from '@rhombus/gapi';

// // const api = await getYoutube();
// export { api };
// // export namespace search {
// //     const url = new URL('search', youtubeUrl);
// //     export const list = apiFn<youtube_v3.Params$Resource$Search$List, youtube_v3.Schema$SearchListResponse>(url);
// // }
// // export namespace videos {
// //     const url = new URL('videos', youtubeUrl);
// //     export const list = apiFn<youtube_v3.Params$Resource$Videos$List, youtube_v3.Schema$VideoListResponse>(url);
// // }

// // function apiFn<TParams extends StandardParameters, TResponse>(url: URL) {
// //     return (params: TParams) => get<TResponse>(url, params);
// // }
// // function get<T>(url: URL, query: Record<string, any>) {
// //     return axios.get<T>(getUrl(url, query).toString());
// // }
// function getUrl(url: URL, query: Record<string, any>) {

//     const result = new URL(url);
//     Object.entries(query)
//         .filter(([, val]) => isDefined(val))
//         .map(([key, val]) => [key, val.toString()] as const)
//         .forEach(p => result.searchParams.set(...p));

//     return result;
// }
