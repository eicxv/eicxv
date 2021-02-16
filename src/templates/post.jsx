import React from "react";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";

import * as collection from "components/posts";
import Layout from "components/layout";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr min(65ch, 100%) 1fr;
  padding: 0 4rem;
  & > * {
    grid-column: 2;
  }
  & > div {
    grid-column: 1 / -1;
  }
`;

export default function Post({ data }) {
  const post = data.mdx;
  return (
    <Layout>
      <Wrapper>
        <MDXProvider components={collection}>
          <h1>{post.frontmatter.title}</h1>
          <h2>{post.frontmatter.date}</h2>
          <MDXRenderer>{post.body}</MDXRenderer>
        </MDXProvider>
      </Wrapper>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
