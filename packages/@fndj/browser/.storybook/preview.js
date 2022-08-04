import { themes } from '@storybook/theming';


export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    docs: {
      theme: themes.dark,
    },
  };

  

  // import { ThemeProvider } from 'styled-components';

  export const decorators = [
  //   (Story) => (
  //     <ThemeProvider theme="default">
  //       <Story />
  //     </ThemeProvider>
  //   ),
  ];