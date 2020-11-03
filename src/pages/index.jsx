import React from "react";
import styled from "@emotion/styled";

import { ThemeProvider, theme } from "styles/theme";
import Layout from "../components/layout";
import Waves from "../components/waves";
import SEO from "../components/seo";

const homeTheme = {
  color: {
    primary: theme.color.secondary,
    secondary: theme.color.primary,
  },
};

const HelloHeader = styled.h1`
  color: ${homeTheme.color.primary};
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 0;
`;

const IntroHeader = styled.h2`
  color: ${homeTheme.color.primary};
  margin-top: 0;
`;

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr min(55ch, 100%) 1fr;
  padding: 2rem 0;
  & > * {
    grid-column: 2;
  }
  height: calc(100vh - 4rem);
`;

const StyledWaves = styled(Waves)`
  max-width: 55ch;
  width: 100%;
  height: 60vh;
  grid-column: 1 / -1;
  justify-self: center;
`;

const Wrapper = styled.div`
  background-color: ${homeTheme.color.secondary};
  width: 100%;
  height: 100vh;
`;

export default function Home() {
  return (
    <ThemeProvider value={homeTheme}>
      <Wrapper>
        <Layout>
          <StyledDiv>
            <SEO title="Einar Persson · eicxv" />
            <HelloHeader>Hello, I&rsquo;m Einar</HelloHeader>
            <IntroHeader>
              I&rsquo;m interested in art, architecture and programming. This is
              a website for my thoughts and projects.
            </IntroHeader>
            <StyledWaves
              config={{
                lightColor: homeTheme.color.primary,
                shadowColor: homeTheme.color.secondary,
              }}
            />
          </StyledDiv>
        </Layout>
      </Wrapper>
    </ThemeProvider>
  );
}
