import React from "react";
import { graphql } from "gatsby";
import MDXRenderer from "gatsby-plugin-mdx/mdx-renderer";
import styled from "@emotion/styled";
import Provider from "../components/mdx/Provider";
import Layout from "components/layout";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr min(65ch, 100%) 1fr;
  padding: 0 4rem;
  & > * {
    grid-column: 2;
  }
  & > .full-bleed {
    grid-column: 1 / -1;
  }
`;

export default function Post({ data: { mdx } }) {
  return (
    <Layout>
      <Wrapper>
        <h1>{mdx.frontmatter.title}</h1>
        <h2>{mdx.frontmatter.date}</h2>
        <Provider>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </Provider>
      </Wrapper>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
      body
    }
  }
`;
