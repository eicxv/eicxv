import { DefaultSeo } from 'next-seo';
import { Global, ThemeProvider } from '@emotion/react';
import { theme } from '../style/theme';
import 'katex/dist/katex.min.css';
import '@fontsource/cooper-hewitt/400.css';
import '@fontsource/cooper-hewitt/500.css';
import '@fontsource/cooper-hewitt/600.css';
import '@fontsource/jetbrains-mono/400.css';

const globalStyle = {
  html: {
    overflowX: 'hidden',
  },
  body: {
    margin: 0,
    backgroundColor: theme.colors.background,
  },
  'body, button': {
    fontFamily: theme.fonts.default,
  },
  svg: { display: 'block' },
  'pre, code': { margin: 0, fontFamily: theme.fonts.code },
};

function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyle} />
      <DefaultSeo
        titleTemplate="%s · Einar Persson"
        description="A journal on my art, architecture and programming projects."
      />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default App;
