import React from "react";
import { Link, graphql } from "gatsby";
import { css } from "@emotion/core";

import Layout from "../components/layout";
import SEO from "../components/seo";

const linkCss = css({
  textDecoration: "none",
  color: "inherit",
});

export default function Journal({ data }) {
  return (
    <Layout>
      <SEO title="Einar Persson · Journal" />
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <div key={node.id}>
          <Link to={node.fields.slug} css={linkCss}>
            <h3>{node.frontmatter.title}</h3>
            <p>{node.excerpt}</p>
          </Link>
        </div>
      ))}
    </Layout>
  );
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            title
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`;
