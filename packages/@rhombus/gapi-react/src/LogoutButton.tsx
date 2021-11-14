import { getAuth2, GoogleAuth } from '@rhombus/gapi';
import { usePromise } from '@rhombus/react';
import React, { useCallback, useEffect, useState } from 'react';


export function LogoutButton(props: { clientId?: string; } & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {

    const [ready, auth2] = usePromise(() => getAuth2(props.clientId), [props.clientId]);

    if (!ready) {
        return <></>;
    }
    return <LogoutButton_Internal {...props} auth2={auth2!} />;
}


function LogoutButton_Internal({ auth2, ...props }: { auth2: GoogleAuth; } & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    const [isLoggedIn, setIsLoggedIn] = useState(auth2.isSignedIn.get());
    useEffect(() => {
        setIsLoggedIn(auth2.isSignedIn.get());
        auth2.isSignedIn.listen(setIsLoggedIn);
    }, [auth2]);
    const cb = useCallback((e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        props.onClick?.(e);
        if (!e.isDefaultPrevented()) {
            auth2.signOut();
        }
    }, [auth2, props]);

    if (!isLoggedIn) {

        return <></>;
    }

    return <button type="button" {...props} onClick={cb} >Logout</button>;
}
