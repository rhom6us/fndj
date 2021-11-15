"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authenticate = exports.useGoogleUser = void 0;
const tslib_1 = require("tslib");
const gapi_1 = require("@rhombus/gapi");
const react_1 = require("@rhombus/react");
const react_2 = (0, tslib_1.__importStar)(require("react"));
function ResultRoot({ children }) {
    return react_2.default.createElement("section", null, children);
}
;
const AuthenticateContext = (0, react_2.createContext)(null);
const useGoogleUser = () => (0, react_2.useContext)(AuthenticateContext);
exports.useGoogleUser = useGoogleUser;
function Authenticate(props) {
    const [ready, auth2] = (0, react_1.usePromise)(() => (0, gapi_1.getAuth2)(props.clientId), [props.clientId]);
    if (!ready) {
        return (react_2.default.createElement(ResultRoot, null,
            react_2.default.createElement("p", null, "auth2 loading.......")));
    }
    return react_2.default.createElement(Authenticate_Internal, { ...props, auth2: auth2 });
}
exports.Authenticate = Authenticate;
;
function Authenticate_Internal({ children, auth2, onLogin }) {
    const [loginError, setLoginError] = (0, react_2.useState)();
    const [isLoggedIn, setIsLoggedIn] = (0, react_2.useState)(auth2.isSignedIn.get());
    const [user, setUser] = (0, react_2.useState)(auth2.currentUser.get());
    (0, react_2.useEffect)(() => {
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
    const signIn = (0, react_2.useCallback)(async () => {
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
    const errorBody = (0, react_2.useMemo)(() => react_2.default.createElement(react_2.default.Fragment, null,
        react_2.default.createElement("h1", null, "Whoops!"),
        react_2.default.createElement("h4", null, "There was an error logging in"),
        react_2.default.createElement("p", null, loginError)), [loginError]);
    const notLoggedInBody = (0, react_2.useMemo)(() => react_2.default.createElement("button", { onClick: signIn }, "sign in"), [signIn]);
    const successBody = (0, react_2.useMemo)(() => react_2.default.createElement(AuthenticateContext.Provider, { value: user }, children), [user, children]);
    return loginError ? errorBody :
        isLoggedIn ? successBody :
            /* else */ notLoggedInBody;
}
;
//# sourceMappingURL=Authenticate.js.map