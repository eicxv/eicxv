import React from "react";
import { css } from "@emotion/core";

import Layout from "../components/layout";
import Waves from "../components/waves";
import { theme } from "../utils/theme";

const textCss = css({
  color: theme.color.primary,
});

const introBackgroundCss = css({
  top: 0,
  left: 0,
  position: "absolute",
  backgroundColor: theme.color.secondary,
  width: "100%",
  height: "100vh",
  zIndex: -50,
});

export default function Home() {
  return (
    <Layout>
      <h1 css={textCss}>Hello, I'm Einar</h1>
      <h2 css={textCss}>
        I'm interested in art, architecture and programming. This is a website
        for my thoughts and projects.
      </h2>
      <Waves />
      <div css={introBackgroundCss}></div>
    </Layout>
  );
}
