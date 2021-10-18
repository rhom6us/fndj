import { Action } from '@rhombus/func';
import { GoogleUser } from '@rhombus/gapi';
import { Children, ReactNode } from 'react';
interface Children {
    children?: ReactNode;
}
interface Props extends Children {
    clientId: string;
    onLogin?: Action<[GoogleUser]>;
}
export declare function Authenticate(props: Props): JSX.Element;
export {};
