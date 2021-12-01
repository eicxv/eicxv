import Head from 'next/head';
import { Box, Typography, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import Header from '../components/header';
import Waves from '../components/waves/waves';
import { darkTheme } from '../style/theme';

export default function Home() {
  return (
    <>
      <Head>
        <title>eicxv · Einar Persson</title>
        <meta
          name="description"
          content="A journal on my art, architecture and programming projects."
        />
        <meta charSet="utf-8" />
      </Head>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header></Header>
        <Box
          sx={{
            display: 'flex',
            px: 4,
            flexDirection: 'column',
            maxWidth: '95ch',
            mx: 'auto',
            alignItems: 'center',
          }}
        >
          <Box sx={{ maxWidth: '75ch' }}>
            <Typography
              sx={{ fontWeight: 600 }}
              component="h1"
              variant="h3"
              color="secondary"
            >
              Hello, I&rsquo;m Einar
            </Typography>
            <Typography component="h2" variant="h4" color="secondary">
              I&rsquo;m interested in art, architecture and programming. This is
              a website for my thoughts and projects.
            </Typography>
          </Box>
          <Waves
            sx={{ maxWidth: '95ch', width: '100%', height: '60vh' }}
          ></Waves>
        </Box>
      </ThemeProvider>
    </>
  );
}
