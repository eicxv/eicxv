import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github-dark-dimmed.css';
import '@fontsource/cooper-hewitt/400.css';
import '@fontsource/cooper-hewitt/500.css';
import '@fontsource/cooper-hewitt/600.css';
import '@fontsource/jetbrains-mono/400.css';
import theme from '../style/theme';

function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default App;
