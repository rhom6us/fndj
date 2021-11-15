"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoutButton = void 0;
const tslib_1 = require("tslib");
const gapi_1 = require("@rhombus/gapi");
const react_1 = require("@rhombus/react");
const react_2 = (0, tslib_1.__importStar)(require("react"));
function LogoutButton(props) {
    const [ready, auth2] = (0, react_1.usePromise)(() => (0, gapi_1.getAuth2)(props.clientId), [props.clientId]);
    if (!ready) {
        return react_2.default.createElement(react_2.default.Fragment, null);
    }
    return react_2.default.createElement(LogoutButton_Internal, { ...props, auth2: auth2 });
}
exports.LogoutButton = LogoutButton;
function LogoutButton_Internal({ auth2, ...props }) {
    const [isLoggedIn, setIsLoggedIn] = (0, react_2.useState)(auth2.isSignedIn.get());
    (0, react_2.useEffect)(() => {
        setIsLoggedIn(auth2.isSignedIn.get());
        auth2.isSignedIn.listen(setIsLoggedIn);
    }, [auth2]);
    const cb = (0, react_2.useCallback)((e) => {
        props.onClick?.(e);
        if (!e.isDefaultPrevented()) {
            auth2.signOut();
        }
    }, [auth2, props]);
    if (!isLoggedIn) {
        return react_2.default.createElement(react_2.default.Fragment, null);
    }
    return react_2.default.createElement("button", { type: "button", ...props, onClick: cb }, "Logout");
}
//# sourceMappingURL=LogoutButton.js.map