import { getAuth2 } from '@rhombus/gapi';
import { usePromise } from '@rhombus/react';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
function ResultRoot({ children }) {
    return React.createElement("section", null, children);
}
;
const AuthenticateContext = createContext(null);
export const useGoogleUser = () => useContext(AuthenticateContext);
export function Authenticate(props) {
    const [ready, auth2] = usePromise(() => getAuth2(props.clientId), [props.clientId]);
    if (!ready) {
        return (React.createElement(ResultRoot, null,
            React.createElement("p", null, "auth2 loading.......")));
    }
    return React.createElement(Authenticate_Internal, { ...props, auth2: auth2 });
}
;
function Authenticate_Internal({ children, auth2, onLogin }) {
    const [loginError, setLoginError] = useState();
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
            });
            onLogin?.(user);
        }
        catch (er) {
            setLoginError(er?.error ?? er?.toString() ?? 'unknown error logging into google');
        }
    }, [auth2, onLogin]);
    const errorBody = useMemo(() => React.createElement(React.Fragment, null,
        React.createElement("h1", null, "Whoops!"),
        React.createElement("h4", null, "There was an error logging in"),
        React.createElement("p", null, loginError)), [loginError]);
    const notLoggedInBody = useMemo(() => React.createElement("button", { onClick: signIn }, "sign in"), [signIn]);
    const successBody = useMemo(() => React.createElement(AuthenticateContext.Provider, { value: user }, children), [user, children]);
    return loginError ? errorBody :
        isLoggedIn ? successBody :
            /* else */ notLoggedInBody;
}
;
//# sourceMappingURL=Authenticate.js.map