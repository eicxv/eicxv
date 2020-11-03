import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import styled from "@emotion/styled";

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr min(55ch, 100%) 1fr;
  padding: 2rem 4rem;
  & > * {
    grid-column: 2;
  }
`;

export default function Journal({ data }) {
  return (
    <Layout>
      <SEO title="Einar Persson · Journal" />
      <StyledDiv>
        <h1>Journal</h1>
        {data.allMdx.edges.map(({ node }) => (
          <div key={node.id}>
            <Link to={node.fields.slug}>
              <h3>{node.frontmatter.title}</h3>
              <p>{node.excerpt}</p>
            </Link>
          </div>
        ))}
      </StyledDiv>
    </Layout>
  );
}

export const query = graphql`
  query {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
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
