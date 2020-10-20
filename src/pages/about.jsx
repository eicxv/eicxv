import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import { css } from "@emotion/core";

import Layout from "../components/layout";

const selfPortraitCss = css({
  margin: "0 auto",
  display: "block !important",
});

export default function About({ data }) {
  return (
    <Layout>
      <Img
        css={selfPortraitCss}
        fixed={data.file.childImageSharp.fixed}
        title="Self-portrait"
        alt="Self-portrait by Einar Persson in ink"
      />
      <p>
        I'm Einar. I love sailing, I can spend all day in a museum and I make a
        really good pasta carbonara.
      </p>
      <p>
        I have studied Architecture and Engineering at Chalmers University of
        Technology and I am a self-taught programmer. I have an interest in
        architecture and design informed by computation, formfinding and
        generative art. I sometimes create traditional art. This site is a
        journal for my interests, thoughts and projects. I'm currently living in
        Gothenburg and always on the lookout for new challenges.
      </p>
    </Layout>
  );
}

export const query = graphql`
  query MyQuery {
    file(relativePath: { eq: "images/self-portrait.png" }) {
      childImageSharp {
        fixed(width: 160, quality: 90) {
          ...GatsbyImageSharpFixed_noBase64
        }
      }
    }
  }
`;
