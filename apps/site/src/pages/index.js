import { NextSeo } from 'next-seo';
import { Box as MuiBox, Typography as MuiTypography } from '@mui/material';
import { Box, Typography, Flex } from '@eicxv/ui';
import {
  css,
  styled,
  darkTheme as sdt,
  theme as st,
} from '../../stitches.config';

import Header from '../components/header';
import Waves from '../components/waves/waves';
import Layout from '../components/layout';
import { Slider, Button, TextField } from '@eicxv/ui';
import { Slider as MuiSlider, TextField as MuiTextField } from '@mui/material';

const Div = styled('div', {
  backgroundColor: '$primary',
  padding: '$4',
  width: '100vw',
});

const Backdrop = styled('div', {
  minHeight: '100vh',
  width: '100vw',
  position: 'absolute',
  backgroundColor: '$background',
});

export default function Home({ preview }) {
  return (
    <Backdrop className={sdt}>
      <Layout preview={preview}>
        <NextSeo
          title="eicxv"
          description="A journal on my art, architecture and programming projects."
          openGraph={{
            type: 'website',
            locale: 'en_GB',
            url: 'https://wwww.eicxv.com/',
          }}
        />
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
          <Box className={css({ maxWidth: '$textColumn' })()}>
            <Box
              as="h1"
              className={css({
                fontWeight: '600',
                fontSize: '$7',
                color: '$text',
              })()}
            >
              Hello, I&rsquo;m Einar
            </Box>
            <Box
              component="span"
              className={css({
                fontWeight: '400',
                fontSize: '$5',
                color: '$text',
              })()}
            >
              I&rsquo;m interested in art, architecture and programming. This is
              a website for my thoughts and projects.
            </Box>
          </Box>
          <Div className={st}>
            <Button>test button</Button>
            <TextField placeholder="enter text"></TextField>
            <TextField disabled={true} placeholder="enter text"></TextField>
            <MuiTextField placeholder="enter text"></MuiTextField>
            <Slider defaultValue={[10]}></Slider>
            <MuiSlider defaultValue={10}></MuiSlider>
          </Div>
          <Div className={sdt}>
            <Button>test button</Button>
            <TextField placeholder="enter text"></TextField>
            <TextField disabled={true} placeholder="enter text"></TextField>
            <MuiTextField placeholder="enter text"></MuiTextField>
            <Slider defaultValue={[10]}></Slider>
            <MuiSlider defaultValue={10}></MuiSlider>
          </Div>
          <Waves
            sx={{ maxWidth: '95ch', width: '100%', height: '60vh' }}
          ></Waves>
        </Box>
      </Layout>
    </Backdrop>
  );
}

export async function getStaticProps({ preview = false }) {
  return {
    props: { preview },
  };
}
