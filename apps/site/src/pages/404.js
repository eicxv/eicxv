import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { css } from '@emotion/react';

import Layout from '../components/layout';

export default function Header({ preview }) {
  return (
    <Layout preview={preview}>
      <NextSeo title="404" />
      <div
        css={css`
          margin: 0;
          line-height: 1.15;
          font-size: 1.5rem;
          text-align: center;
          p {
            line-height: normal;
            font-size: 1rem;
          }
        `}
      >
        <h2>404 - There is nothing here.</h2>
        <p>
          Try going to the{' '}
          <Link href="/">
            <a>home page</a>
          </Link>
          .
        </p>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  return {
    props: { preview },
  };
}
