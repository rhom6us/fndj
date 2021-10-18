import { Action } from '@rhombus/func';
import { getAuth2, GoogleAuth, GoogleUser } from '@rhombus/gapi';
import { usePromise } from '@rhombus/react';
import React, { Children, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

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


export function Authenticate(props: Props) {
    const [ready, auth2] = usePromise(useMemo(() => getAuth2(props.clientId), [props.clientId]));

    if (!ready) {
        return (
            <ResultRoot >
                <p>auth2 loading...</p>
            </ResultRoot >
        );
    }
    return <Authenticate_Internal {...props} auth2={auth2!} />;
};


function Authenticate_Internal({ children, auth2, onLogin }: Props & { auth2: GoogleAuth; }) {
    const [loginError, setLoginError] = useState<string>();
    const [isLoggedIn, setIsLoggedIn] = useState(auth2.isSignedIn.get());
    useEffect(() => {
        setIsLoggedIn(auth2.isSignedIn.get());
        auth2.isSignedIn.listen(setIsLoggedIn);
    }, [auth2]);

    const signIn = useCallback(async () => {
        try {
            const user = await auth2.signIn();
            onLogin?.(user);
        } catch (er: any) {
            setLoginError(er?.error ?? er?.toString() ?? 'unknown error logging into google');
        }
    }, [auth2, onLogin]);

    if (loginError) {
        return (
            <ResultRoot>
                <h1>Whoops!</h1>
                <h4>There was an error logging in</h4>
                <p>{loginError}</p>
            </ResultRoot>
        );
    }


    if (!isLoggedIn) {
        return (
            <ResultRoot>
                <button onClick={signIn}>sign in</button>
            </ResultRoot >
        );
    }
    return <>{children}</>;

};
