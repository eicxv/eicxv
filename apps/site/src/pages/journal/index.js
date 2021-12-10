import { NextSeo } from 'next-seo';
import { getAllPosts } from '../../lib/contentful-api';
import { extractFrontmatter } from '../../components/render-markdown/parse-markdown';
import { Typography, Box, Link, Container } from '@mui/material';

import Header from '../../components/header';
import Layout from '../../components/layout';
import PostPreview from './../../components/post-prevew';

export default function Journal({ postsMetadata, preview }) {
  return (
    <Layout preview={preview}>
      <NextSeo
        title="Journal"
        description="A list of blog posts on programming, art and architecture"
      />
      <Header />
      <Box component="main" sx={{ m: 'auto', maxWidth: '75ch', px: 4 }}>
        <Typography variant="h3" component="h1">
          Journal
        </Typography>
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
