import { ThemeProvider } from '@mui/material/styles';
import { DefaultSeo } from 'next-seo';
import { CssBaseline } from '@mui/material';
import { globalCss } from '../../stitches.config';
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github-dark-dimmed.css';
import '@fontsource/cooper-hewitt/400.css';
import '@fontsource/cooper-hewitt/500.css';
import '@fontsource/cooper-hewitt/600.css';
import '@fontsource/jetbrains-mono/400.css';
import theme from '../style/theme';

const globalStyles = globalCss({
  html: {
    overflowX: 'hidden',
  },
  body: {
    margin: 0,
    backgroundColor: '$background',
  },
  'body, button': {
    fontFamily: '$default',
  },
  svg: { display: 'block' },
  'pre, code': { margin: 0, fontFamily: '$mono' },
});

function App({ Component, pageProps }) {
  globalStyles();
  return (
    <ThemeProvider theme={theme}>
      <DefaultSeo
        titleTemplate="%s · Einar Persson"
        description="A journal on my art, architecture and programming projects."
      />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default App;
