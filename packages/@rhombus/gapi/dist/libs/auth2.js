import { loadLib } from '../gapi';
import { defer } from './defer';
;
let cache;
const def = defer();
export async function getAuth2(client_id, ...scopes) {
    if (!client_id) {
        if (!cache) {
            return def.promise;
        }
        return cache;
    }
    // eslint-disable-next-line no-async-promise-executor
    const result = cache ??= await new Promise(async (resolve) => {
        const auth2 = await loadLib('auth2');
        const auth2Promise = auth2.getAuthInstance() ?? auth2.init({
            client_id,
            scope: scopes.join(' '),
        });
        auth2Promise.then((p) => resolve(omit(p, 'then')));
    });
    def.resolve(result);
    return cache = result;
}
function omit(source, ...keys) {
    for (const key of keys) {
        delete source[key];
    }
    return source;
}
//# sourceMappingURL=auth2.js.map