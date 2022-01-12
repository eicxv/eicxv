import { NextSeo } from 'next-seo';
import { Box, Flex } from '@eicxv/ui';

import { ThemeProvider } from '@emotion/react';
import { darkTheme } from '../style/theme';
import Waves from '../components/waves/waves';
import Layout from '../components/layout';

export default function Home({ preview }) {
  return (
    <ThemeProvider theme={darkTheme}>
      <div
        css={(theme) => ({
          minHeight: '100vh',
          width: '100vw',
          position: 'absolute',
          backgroundColor: theme.colors.background,
        })}
      >
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
          <Flex
            direction="column"
            align="center"
            css={(theme) => ({
              margin: `${theme.space[0]} auto`,
            })}
          >
            <Box css={(theme) => ({ maxWidth: theme.sizes.textColumn })}>
              <Box
                as="h1"
                css={(theme) => ({
                  fontWeight: '600',
                  fontSize: theme.fontSizes[7],
                  color: theme.colors.text,
                })}
              >
                Hello, I&rsquo;m Einar
              </Box>
              <Box
                component="span"
                css={(theme) => ({
                  fontWeight: '400',
                  fontSize: theme.fontSizes[5],
                  color: theme.colors.text,
                })}
              >
                I&rsquo;m interested in art, architecture and programming. This
                is a website for my thoughts and projects.
              </Box>
            </Box>
            <Waves
              css={{
                maxWidth: '95ch',
                width: '100%',
                height: '60vh',
              }}
            ></Waves>
          </Flex>
        </Layout>
      </div>
    </ThemeProvider>
  );
}

export async function getStaticProps({ preview = false }) {
  return {
    props: { preview },
  };
}
