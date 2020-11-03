import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import styled from "@emotion/styled";

import Layout from "../components/layout";
import SEO from "../components/seo";

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr min(55ch, 100%) 1fr;
  padding: 2rem 0;
  align-content: start;
  justify-items: center;
  & > * {
    grid-column: 2;
  }
  height: calc(100vh - 4rem);
`;

export default function About({ data }) {
  return (
    <Layout>
      <SEO title="Einar Persson · About" />
      <StyledDiv>
        <Img
          fixed={data.file.childImageSharp.fixed}
          title="Self-portrait"
          alt="Self-portrait by Einar Persson in ink"
        />
        <p>
          I&rsquo;m Einar. I love sailing, I can spend all day in a museum and I
          make a really good pasta carbonara.
        </p>
        <p>
          I have studied Architecture and Engineering at Chalmers University of
          Technology and I am a self-taught programmer. I have an interest in
          architecture and design informed by computation, formfinding and
          generative art. I sometimes create traditional art. This site is a
          journal for my interests, thoughts and projects. I&rsquo;m currently
          living in Gothenburg and always on the lookout for new challenges.
        </p>
      </StyledDiv>
    </Layout>
  );
}

export const query = graphql`
  query {
    file(relativePath: { eq: "self-portrait.png" }) {
      childImageSharp {
        fixed(width: 160, quality: 90) {
          ...GatsbyImageSharpFixed_noBase64
        }
      }
    }
  }
`;
