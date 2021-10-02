import { DefaultPalette, IStackItemStyles, IStackStyles, Stack } from '@fluentui/react';
import React from 'react';
import { FC } from 'react';
import { CommandBarBasicExample } from './CommandBarBasicExample';

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
        </Stack.Item>
        <Stack.Item styles={stackItemStyles}>
            <p> hello stack</p>
        </Stack.Item>
    </Stack>;
};
