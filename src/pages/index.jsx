import React from "react";
import { css } from "@emotion/core";
import { ThemeProvider } from "emotion-theming";

import Layout from "../components/layout";
import Waves from "../components/waves";
import { theme } from "../utils/emotion";

const homeTheme = {
  color: {
    primary: theme.color.secondary,
    secondary: theme.color.primary,
  },
};

const textCss = (theme) => ({
  color: theme.color.primary,
});

const canvasCss = css({
  width: "100%",
  height: "30rem",
});

export default function Home() {
  return (
    <ThemeProvider theme={homeTheme}>
      <Layout>
        <h1 css={textCss}>Hello, I'm Einar</h1>
        <h2 css={textCss}>
          I'm interested in art, architecture and programming. This is a website
          for my thoughts and projects.
        </h2>
        <Waves canvasCss={canvasCss} />
      </Layout>
    </ThemeProvider>
  );
}
