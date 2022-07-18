import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import Layout from '../../components/layout';
import { markdownToHast } from '../../components/render-markdown/parse-markdown';
import RenderHast from '../../components/render-markdown/render-hast';
import { getPost, getAllPosts } from '../../lib/contentful-api';

const Wrapper = styled.div({
  display: 'grid',
  gridTemplateColumns: '1fr min(65ch, 100%) 1fr',
  padding: '0 1rem',
  fontFamily:
    "'Cooper Hewitt', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
  '& > *': {
    gridColumn: 2,
  },
  '& .full-bleed': {
    gridColumn: '1 / -1',
  },
  '.math-display': {
    display: 'block',
    height: 'auto',
    overflowX: 'auto',
    overflowY: 'hidden',
    whiteSpace: 'nowrap',
    gridColumn: '1 / -1',
  },
  pre: {
    fontFamily: "'jetbrains mono', monospace",
    overflowX: 'auto',
    padding: '1rem',
    backgroundColor: '#eeeeee',
    code: {
      '.hljs-comment,.hljs-quote': {
        color: 'green',
        fontStyle: 'italic',
      },
      '.hljs-doctag, .hljs-keyword, .hljs-formula': {
        color: '#a626a4',
      },
      '.hljs-section, .hljs-name, .hljs-selector-tag, .hljs-deletion, .hljs-subst':
        {
          color: '#e45649',
        },
      '.hljs-literal': {
        color: '#0184bb',
      },
      '.hljs-string,.hljs-regexp,.hljs-addition,.hljs-attribute,.hljs-meta .hljs-string':
        {
          color: '#50a14f',
        },

      '.hljs-attr, .hljs-variable, .hljs-template-variable, .hljs-type, .hljs-selector-class, .hljs-selector-attr, .hljs-selector-pseudo, .hljs-number':
        {
          color: '#986801',
        },

      '.hljs-symbol,.hljs-bullet,.hljs-link,.hljs-meta,.hljs-selector-id,.hljs-title':
        {
          color: '#4078f2',
        },
      '.hljs-built_in,.hljs-title.class_,.hljs-class .hljs-title': {
        color: '#c18401',
      },

      '.hljs-emphasis': {
        fontStyle: 'italic',
      },

      '.hljs-strong': {
        fontWeight: 'bold',
      },

      '.hljs-link': {
        textDecoration: 'underline',
      },
    },
  },
});

export default function Post({ frontmatter, hast, preview }) {
  const router = useRouter();
  return (
    <Layout preview={preview}>
      <NextSeo
        title={frontmatter?.title}
        description={frontmatter?.description}
      />
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
