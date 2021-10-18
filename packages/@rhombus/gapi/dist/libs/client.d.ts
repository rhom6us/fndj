/// <reference types="gapi" />
/// <reference types="gapi.client" />
/// <reference types="@maxim_mazurok/gapi.client.youtube" />
export declare type GapiClient = typeof gapi.client;
export declare function getClient(): Promise<GapiClient>;
