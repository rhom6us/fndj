/// <reference types="gapi.auth2" />
export declare type GoogleAuth = Omit<gapi.auth2.GoogleAuth, 'then'>;
export declare type GoogleUser = gapi.auth2.GoogleUser;
export declare function getAuth2(client_id?: string, ...scopes: string[]): Promise<GoogleAuth>;
