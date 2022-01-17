import { NextSeo } from 'next-seo';
import Image from 'next/image';

import { Box, Flex } from '@eicxv/ui';
import Layout from '../components/layout';
import { getMap } from '../lib/contentful-asset-map';

export default function About({ assets, preview }) {
  const selfPortrait = assets['self-portrait'];
  return (
    <Layout preview={preview}>
      <NextSeo
        title="About"
        description="A journal on my art, architecture and programming projects."
      />
      <Flex
        direction="column"
        css={(theme) => ({
          maxWidth: theme.sizes.textColumn,
          margin: 'auto',
          padding: `0 ${theme.space[4]}`,
        })}
      >
        <Flex
          as="figure"
          justify="center"
          css={(theme) => ({ maxWidth: '17ch', margin: 'auto' })}
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
        </Flex>
        <Box as="p" css={(theme) => ({ margin: `0 0 ${theme.space[3]} 0` })}>
          I&rsquo;m Einar. I love sailing, I can spend all day in a museum and I
          make a really good pasta carbonara.
        </Box>
        <Box as="p" css={{ margin: 0 }}>
          I have studied Architecture and Engineering at Chalmers University of
          Technology and I am a self-taught programmer. I have an interest in
          architecture and design informed by computation, formfinding and
          generative art. I sometimes create traditional art. This site is a
          journal for my interests, thoughts and projects. I&rsquo;m currently
          living in Gothenburg and always on the lookout for new challenges.
        </Box>
      </Flex>
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
