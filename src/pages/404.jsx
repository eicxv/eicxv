import React from "react";
import styled from "@emotion/styled";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { theme } from "styles/theme";

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr min(55ch, 100%) 1fr;
  padding: 2rem 4rem;
  & > * {
    grid-column: 2;
    color: ${theme.color.primary};
  }
`;

export default function NotFound() {
  return (
    <Layout>
      <SEO title="Einar Persson · 404" />
      <StyledDiv>
        <h1>There&rsquo;s nothing here.</h1>
        <h2>404 page not found.</h2>
      </StyledDiv>
    </Layout>
  );
}
