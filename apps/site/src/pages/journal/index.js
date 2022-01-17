import { NextSeo } from 'next-seo';
import { getAllPosts } from '../../lib/contentful-api';
import { extractFrontmatter } from '../../components/render-markdown/parse-markdown';

import Layout from '../../components/layout';
import PostPreview from './../../components/post-prevew';
import { Box } from '@eicxv/ui';

export default function Journal({ postsMetadata, preview }) {
  return (
    <Layout preview={preview}>
      <NextSeo
        title="Journal"
        description="A list of blog posts on programming, art and architecture"
      />
      <Box
        component="main"
        css={(theme) => ({
          margin: 'auto',
          maxWidth: theme.sizes.textColumn,
          padding: `0 ${theme.space[4]}`,
        })}
      >
        <Box
          css={(theme) => ({
            fontWeight: theme.fontWeights.bold,
            fontSize: theme.fontSizes[7],
          })}
          as="h1"
        >
          Journal
        </Box>
        {postsMetadata.map((metadata) => (
          <PostPreview
            key={metadata.slug}
            slug={metadata.slug}
            title={metadata.frontmatter.title}
          />
        ))}
      </Box>
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const posts = await getAllPosts(preview);
  const postsMetadata = posts.map((p) => ({
    slug: p.slug,
    frontmatter: extractFrontmatter(p.content),
  }));

  return {
    props: {
      postsMetadata,
      preview,
    },
  };
}
