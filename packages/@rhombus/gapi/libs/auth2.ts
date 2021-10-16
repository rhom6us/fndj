/// <reference types="gapi" />
/// <reference types="gapi.auth2" />
import { getGapi, loadLib } from '../gapi';
import { defer } from './defer';

export type GoogleAuth = Omit<gapi.auth2.GoogleAuth, 'then'>;
export type GoogleUser = gapi.auth2.GoogleUser;

;

let cache: GoogleAuth | undefined;
const def = defer<GoogleAuth>();
export async function getAuth2(client_id?: string, ...scopes: string[]): Promise<GoogleAuth> {
    if (!client_id) {
        if (!cache) {
            return def.promise;
        }
        return cache;
    }
    // eslint-disable-next-line no-async-promise-executor
    const result = cache ??= await new Promise<GoogleAuth>(async resolve => {

        const auth2 = await loadLib('auth2');

        const auth2Promise = auth2.getAuthInstance() ?? auth2.init({
            client_id,//: "725047741145-anp1d89o2hf63g72h8hpjo3tte9so6f5.apps.googleusercontent.com",
            scope: scopes.join(' '),
        });
        auth2Promise.then(p => resolve(omit(p, 'then')));
    });
    def.resolve(result);
    return cache = result;

}

function omit<T, K extends keyof T>(source: T, ...keys: K[]): Omit<T, K> {
    for (const key of keys) {
        delete source[key];
    }
    return source;
}
