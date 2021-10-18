import { getAuth2 } from '@rhombus/gapi';
import { usePromise } from '@rhombus/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
export function LogoutButton(props) {
    const [ready, auth2] = usePromise(useMemo(() => getAuth2(props.clientId), [props.clientId]));
    if (!ready) {
        return React.createElement(React.Fragment, null);
    }
    return React.createElement(LogoutButton_Internal, { ...props, auth2: auth2 });
}
function LogoutButton_Internal({ auth2, ...props }) {
    const [isLoggedIn, setIsLoggedIn] = useState(auth2.isSignedIn.get());
    useEffect(() => {
        setIsLoggedIn(auth2.isSignedIn.get());
        auth2.isSignedIn.listen(setIsLoggedIn);
    }, [auth2]);
    const cb = useCallback((e) => {
        props.onClick?.(e);
        if (!e.isDefaultPrevented()) {
            auth2.signOut();
        }
    }, [auth2, props]);
    if (!isLoggedIn) {
        return React.createElement(React.Fragment, null);
    }
    return React.createElement("button", { ...props, onClick: cb });
}
//# sourceMappingURL=LogoutButton.js.map