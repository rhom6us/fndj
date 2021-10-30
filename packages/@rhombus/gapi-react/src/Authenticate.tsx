import { Action } from '@rhombus/func';
import { getAuth2, GoogleAuth, GoogleUser } from '@rhombus/gapi';
import { usePromise } from '@rhombus/react';
import React, { Children, createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';

interface Children {
    children?: ReactNode;
}
interface Props extends Children {
    clientId: string;
    onLogin?: Action<[GoogleUser]>;
}

function ResultRoot({ children }: Children) {
    return <section>{children}</section>;
};

const AuthenticateContext = createContext<GoogleUser | null>(null);
export const useGoogleUser = useContext(AuthenticateContext);
export function Authenticate(props: Props) {
    const [ready, auth2] = usePromise(() => getAuth2(props.clientId), [props.clientId]);

    if (!ready) {
        return (
            <ResultRoot >
                <p>auth2 loading.......</p>
            </ResultRoot >
        );
    }
    return <Authenticate_Internal {...props} auth2={auth2!} />;
};

function Authenticate_Internal({ children, auth2, onLogin }: Props & { auth2: GoogleAuth; }) {
    const [loginError, setLoginError] = useState<string>();
    const [isLoggedIn, setIsLoggedIn] = useState(auth2.isSignedIn.get());
    const [user, setUser] = useState(auth2.currentUser.get());
    useEffect(() => {
        setIsLoggedIn(auth2.isSignedIn.get());
        setUser(auth2.currentUser.get());

        let stop = false;
        auth2.isSignedIn.listen(p => !stop && setIsLoggedIn(p));
        auth2.currentUser.listen(p => !stop && setUser(p));
        return () => {
            //TODO: how to stop listening properly instead of this hack?

            //DRAGONS: This is a potential memory leak (sortof). If the component gets
            //remounted over and over and over again, it will keep leaving
            //behind these closed over 'stopped' listeners. I do not, however,
            //believe that this will surmount into any real world issue.

            stop = true;
        };
    }, [auth2]);

    const signIn = useCallback(async () => {
        try {
            const user = await auth2.signIn({
                scope: "https://www.googleapis.com/auth/youtube.readonly",
                ux_mode: 'redirect',
            } as any);
            onLogin?.(user);
        } catch (er: any) {
            setLoginError(er?.error ?? er?.toString() ?? 'unknown error logging into google');
        }
    }, [auth2, onLogin]);

    const errorBody = useMemo(()=> <>
        <h1>Whoops!</h1>
        <h4>There was an error logging in</h4>
        <p>{loginError}</p>
    </>,[loginError]);
    const notLoggedInBody = useMemo(()=> <button onClick={signIn}>sign in</button>,[signIn]);
    const successBody = useMemo(() => <AuthenticateContext.Provider value={user}>{children}</AuthenticateContext.Provider>, [user, children]);

    return  loginError ? errorBody :
            isLoggedIn ? successBody :
            /* else */   notLoggedInBody;

};
