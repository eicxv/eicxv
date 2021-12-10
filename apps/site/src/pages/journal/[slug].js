import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import Header from '../../components/header';
import Layout from '../../components/layout';
import { markdownToHast } from '../../components/render-markdown/parse-markdown';
import RenderHast from '../../components/render-markdown/render-hast';
import { getPost, getAllPosts } from '../../lib/contentful-api';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr min(65ch, 100%) 1fr;
  padding: 0 4rem;
  font-family: 'Cooper Hewitt', 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  & > * {
    grid-column: 2;
  }
  & > .full-bleed {
    grid-column: 1 / -1;
  }
  .math-display {
    display: block;
    height: auto;
    padding-bottom: 12px;
    overflow-x: auto;
    white-space: nowrap;
  }
  code {
    font-family: 'jetbrains mono', monospace;
  }
`;

export default function Post({ frontmatter, hast, preview }) {
  const router = useRouter();
  return (
    <Layout preview={preview}>
      <NextSeo
        title={frontmatter?.title}
        description={frontmatter?.description}
      />
      <Header />
      {router.isFallback ? (
        <h1>Loading…</h1>
      ) : (
        <Wrapper>
          <RenderHast hast={hast} />
        </Wrapper>
      )}
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const post = await getPost(params.slug, preview);
  const { frontmatter, hast } = await markdownToHast(post.content, preview);
  return {
    props: {
      frontmatter,
      hast,
      preview,
    },
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPosts();
  const paths = allPosts?.map(({ slug }) => `/journal/${slug}`);

  return {
    paths,
    fallback: true,
  };
}
