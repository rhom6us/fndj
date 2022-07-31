import { defer } from "@rhombus-toolkit/defer";
import { loadLib } from './gapi';

const auth2 = await loadLib('auth2');
export type GoogleAuth = Omit<gapi.auth2.GoogleAuth, 'then'>;
// export type GoogleAuth = gapi.auth2.GoogleAuth;
export const GoogleAuth = gapi.auth2.GoogleAuth;
export type IsSignedIn = gapi.auth2.IsSignedIn;
export type CurrentUser = gapi.auth2.CurrentUser;
export type SigninOptions = gapi.auth2.SigninOptions;
export type OfflineAccessOptions = gapi.auth2.OfflineAccessOptions;
export type ClientConfig = gapi.auth2.ClientConfig;
export type SigninOptionsBuilder = gapi.auth2.SigninOptionsBuilder;
export const SigninOptionsBuilder = gapi.auth2.SigninOptionsBuilder;
export type BasicProfile = gapi.auth2.BasicProfile;
export type AuthResponse = gapi.auth2.AuthResponse;
export type AuthorizeConfig = gapi.auth2.AuthorizeConfig;
export type AuthorizeResponse = gapi.auth2.AuthorizeResponse;
export type GoogleUser = gapi.auth2.GoogleUser;
// export const init = gapi.auth2.init;
// export const getAuthInstance = gapi.auth2.getAuthInstance;
// export const authorize = gapi.auth2.authorize;

let cache: GoogleAuth | undefined;
const def = defer<GoogleAuth>();
export async function getAuth2(client_id?: string): Promise<GoogleAuth> {
    if (!client_id) {
        if (!cache) {
            return await def.promise;
        }
        return cache;
    }
    // eslint-disable-next-line no-async-promise-executor
    const result = cache ??= await new Promise<GoogleAuth>(async resolve => {

        auth2.init({
            client_id,//: "725047741145-anp1d89o2hf63g72h8hpjo3tte9so6f5.apps.googleusercontent.com",
            // scope: scopes.join(' '),
        }).then((p) => {
            resolve(p);
            // const auth2Promise = auth2.getAuthInstance();    
            // resolve(auth2Promise);
        })
        
        
        // auth2Promise.then(p => {
        //     console.log({ p });
        //     const omitted = omit(p, 'then');
        //     resolve(omitted);
        // });
    });
    

    return await def.resolve(cache = result);
}

function omit<T, K extends keyof T>(source: T, ...keys: K[]): Omit<T, K> {
    for (const key of keys) {
        delete source[key];
    }
    return source;
}
