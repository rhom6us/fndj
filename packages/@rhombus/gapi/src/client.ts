import { loadLib } from './gapi';



export const loaded = loadLib('client');
await loaded;

export type RequestOptions = gapi.client.RequestOptions;
export type TokenObject = gapi.client.TokenObject;
export type HttpRequestFulfilled<T> = gapi.client.HttpRequestFulfilled<T>;
export type HttpRequestRejected = gapi.client.HttpRequestRejected;
export type HttpRequestPromise<T> = gapi.client.HttpRequestPromise<T>;
export const HttpRequestPromise = gapi.client.HttpRequestPromise;
export type HttpRequest<T> = gapi.client.HttpRequest<T>;
export const HttpRequest = gapi.client.HttpRequest;
export type HttpBatch = gapi.client.HttpBatch;
export const HttpBatch = gapi.client.HttpBatch;
export type RpcRequest = gapi.client.RpcRequest;
export const RpcRequest = gapi.client.RpcRequest;

// export type Request<T> = gapi.client.Request<T>;
// export type Response<T> = gapi.client.Response<T>;
// export type ResponseMap<T> = gapi.client.ResponseMap<T>;

await gapi.client.init({
    // Your API key will be automatically added to the Discovery Document URLs.
    // 'apiKey': 'YOUR_API_KEY',
    // discoveryDocs: [
    //     // 'https://people.googleapis.com/$discovery/rest',
    //     'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'
    // ],
});

