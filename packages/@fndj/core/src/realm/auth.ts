import * as Realm from "realm-web";

function assert(b: boolean, msg = "assert failed") {
    if (!b) {
        throw new Error(msg);
    }
}

const appId = {
    'fndjWeb': 'fndj-web-uicjo',
    'Application0': 'application-0-lxjsh',
    'dj': 'dj-oacag'
} as const;

const app: Realm.App = new Realm.App({ id: appId.fndjWeb });

export async function loginAnonymous(): Promise<[Realm.App, Realm.User]> {
    // Create an anonymous credential
    const credentials = Realm.Credentials.anonymous();

    // Authenticate the user
    const user: Realm.User = await app.logIn(credentials);
    // `App.currentUser` updates to match the logged in user
    assert(user.id === app.currentUser?.id);
    return [app, user] as any;

}

export async function loginApiKey(apiKey: string) {
    // Create an API Key credential
    const credentials = Realm.Credentials.apiKey(apiKey);
    try {
        // Authenticate the user
        const user: Realm.User = await app.logIn(credentials);
        // `App.currentUser` updates to match the logged in user
        assert(user.id === app.currentUser?.id);
        return user;
    } catch (err) {
        console.error("Failed to log in", err);
    }
}
async function loginCustomJwt(token: string) {
    // Create a Custom JWT credential
    const credentials = Realm.Credentials.jwt(token);
    try {
        // Authenticate the user
        const user: Realm.User = await app.logIn(credentials);
        // `App.currentUser` updates to match the logged in user
        assert(user.id === app.currentUser?.id);
        return user;
    } catch (err) {
        console.error("Failed to log in", err);
    }
}


export const bs_api_key = 'xuJToT4Cljdo1qS8NvgTUnCrVwVYl6B5of5c58JbIXG5KKlESBhgjeuoKE6usUix';
