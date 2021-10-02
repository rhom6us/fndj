

import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import { ThemeProvider as FluentThemeProvider } from '@fluentui/react';
import { darkTheme, lightTheme } from './themes';



const themeMap = {
    'light': lightTheme,
    'dark': darkTheme,
};
export type Theme = keyof typeof themeMap;
function validateTheme(theme: any): theme is Theme {
    return Object.keys(themeMap).includes(theme);
}
const defaultTheme = 'dark' as Theme;

const ThemeContext = createContext<{ theme: Theme, setTheme: (theme: Theme) => void; }>({ theme: defaultTheme, setTheme: () => { } });


export const useTheme = () => useContext(ThemeContext);

const themeStorageKey = 'theme';

// eslint-disable-next-line react/prop-types
export const ThemeProvider: FC = ({ children }) => {
    const [themeState, setThemeState] = useState({ theme: defaultTheme, hasThemeMounted: false });

    function setTheme(theme: Theme) {
        localStorage.setItem(themeStorageKey, theme);
        setThemeState({ hasThemeMounted: true, theme });
    };
    useEffect(() => {
        const storedTheme = localStorage.getItem(themeStorageKey);
        setTheme(validateTheme(storedTheme) ? storedTheme : defaultTheme);
    }, []);

    if (!themeState.hasThemeMounted) {
        return (<div>Theme mounting...</div>);
    }


    //   const TheRoot = styled('article')({
    //     backgroundColor: themeState.isDark ? styles.darkAppBackgroundColor : styles.appBackgroundColor,
    //     // minHeight: '100vh'
    //   });
    //   const className = classNames('root', { [Classes.DARK]: themeState.isDark });

    //   const resizeDetectorProps = {
    //     refreshMode: 'debounce' as const,
    //     refreshRate: 250,
    //     refreshOptions: {
    //       leading: true,
    //       trailing: true,
    //     },
    //     handleWidth: true,
    //     handleHeight: true,
    //     onResize(width: number, height: number) {
    //       ipcRenderer.send('please-resize', { width, height });
    //     },
    //   };

    return (
        <FluentThemeProvider applyTo="body" theme={themeMap[themeState.theme]}>
            <ThemeContext.Provider value={{ theme: themeState.theme, setTheme }}>
                {children}
            </ThemeContext.Provider>
            {/* <ResizeDetector {...resizeDetectorProps} /> */}
        </FluentThemeProvider>
    );
};
