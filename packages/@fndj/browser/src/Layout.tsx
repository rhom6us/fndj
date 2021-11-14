import { initializeIcons, IStackItemStyles, IStackStyles, Stack } from '@fluentui/react';
import { CommandBarBasicExample } from '@fndj/browser-ui/src/CommandBarBasicExample';
import { Authenticate, LogoutButton } from '@rhombus/gapi-react';
import React, { FC } from 'react';
import { Outlet } from "react-router-dom";
initializeIcons();
const stackStyles: IStackStyles = {

    root: {
        // background: DefaultPalette.themeDark,
    }
};
const stackItemStyles: IStackItemStyles = {
    root: {
        // background: DefaultPalette.themePrimary,
        // color: DefaultPalette.white,
        padding: 5,
    },
};

export const Layout: FC = () => {
    return <Stack styles={stackStyles} tokens={{ childrenGap: 0, padding: 0 }} >
        <Stack.Item styles={stackItemStyles}>
            <CommandBarBasicExample />
            <LogoutButton >logout</LogoutButton>
        </Stack.Item>
        <Stack.Item styles={stackItemStyles}>
            <Authenticate clientId="777867454715-99kgvcm3bve22qiohkgp7ddosk5fcbpv.apps.googleusercontent.com">
                <Outlet />
            </Authenticate>
        </Stack.Item>
    </Stack>;
};
