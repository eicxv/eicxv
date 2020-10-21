import React from "react";
import { graphql } from "gatsby";
import { css } from "@emotion/core";

import Layout from "../components/layout";
import { theme } from "../utils/theme";

const wrapperCss = css({
  backgroundColor: theme.color.primary,
  color: theme.color.secondary,
});

export default function BlogPost({ data }) {
  const post = data.markdownRemark;
  return (
    <Layout>
      <div css={wrapperCss}>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  );
}
export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
