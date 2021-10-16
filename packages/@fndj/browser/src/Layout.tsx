import { DefaultPalette, IStackItemStyles, IStackStyles, Stack, initializeIcons } from '@fluentui/react';
import React from 'react';
import { FC } from 'react';
import { CommandBarBasicExample } from '@fndj/browser-ui/src/CommandBarBasicExample';
import { Authenticate, LogoutButton } from '@rhombus/gapi-react';

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
            <Authenticate clientId="725047741145-anp1d89o2hf63g72h8hpjo3tte9so6f5.apps.googleusercontent.com">
                <p> we are secure!</p>
            </Authenticate>
        </Stack.Item>
    </Stack>;
};
