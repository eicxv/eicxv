import Head from 'next/head';
import Image from 'next/image';
import { Box, Typography, Stack } from '@mui/material';

import Header from '../components/header';
import Layout from '../components/layout';
import { getMap } from '../lib/contentful-asset-map';

export default function About({ assets, preview }) {
  const selfPortrait = assets['self-portrait'];
  return (
    <Layout preview={preview}>
      <Head>
        <title>About · eicxv</title>
        <meta charSet="utf-8" />
      </Head>
      <Header />
      <Stack
        sx={{
          maxWidth: '65ch',
          m: 'auto',
          px: 4,
        }}
      >
        <Box
          component="figure"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            maxWidth: '17ch',
            m: 'auto',
          }}
        >
          <Image
            layout="intrinsic"
            title="Self-portrait"
            alt="Self-portrait by Einar Persson in ink"
            src={selfPortrait.url}
            width={selfPortrait.width}
            height={selfPortrait.height}
          />
        </Box>
        <Typography variant="body1">
          I&rsquo;m Einar. I love sailing, I can spend all day in a museum and I
          make a really good pasta carbonara.
        </Typography>
        <br></br>
        <Typography variant="body1">
          I have studied Architecture and Engineering at Chalmers University of
          Technology and I am a self-taught programmer. I have an interest in
          architecture and design informed by computation, formfinding and
          generative art. I sometimes create traditional art. This site is a
          journal for my interests, thoughts and projects. I&rsquo;m currently
          living in Gothenburg and always on the lookout for new challenges.
        </Typography>
      </Stack>
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const assetMap = await getMap(preview);
  const titles = ['self-portrait'];

  let assets = titles.map((title) => [title, assetMap.get(title)]);
  assets = Object.fromEntries(assets);

  return {
    props: {
      assets,
      preview,
    },
  };
}
