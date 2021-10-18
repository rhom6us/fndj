import { getAuth2 } from '@rhombus/gapi';
import { usePromise } from '@rhombus/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
function ResultRoot({ children }) {
    return React.createElement("section", null, children);
}
;
export function Authenticate(props) {
    const [ready, auth2] = usePromise(useMemo(() => getAuth2(props.clientId), [props.clientId]));
    if (!ready) {
        return (React.createElement(ResultRoot, null,
            React.createElement("p", null, "auth2 loading...")));
    }
    return React.createElement(Authenticate_Internal, { ...props, auth2: auth2 });
}
;
function Authenticate_Internal({ children, auth2, onLogin }) {
    const [loginError, setLoginError] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(auth2.isSignedIn.get());
    useEffect(() => {
        setIsLoggedIn(auth2.isSignedIn.get());
        auth2.isSignedIn.listen(setIsLoggedIn);
    }, [auth2]);
    const signIn = useCallback(async () => {
        try {
            const user = await auth2.signIn();
            onLogin?.(user);
        }
        catch (er) {
            setLoginError(er?.error ?? er?.toString() ?? 'unknown error logging into google');
        }
    }, [auth2, onLogin]);
    if (loginError) {
        return (React.createElement(ResultRoot, null,
            React.createElement("h1", null, "Whoops!"),
            React.createElement("h4", null, "There was an error logging in"),
            React.createElement("p", null, loginError)));
    }
    if (!isLoggedIn) {
        return (React.createElement(ResultRoot, null,
            React.createElement("button", { onClick: signIn }, "sign in")));
    }
    return React.createElement(React.Fragment, null, children);
}
;
//# sourceMappingURL=Authenticate.js.map