import React from "react";
import { css } from "@emotion/core";

import Layout from "../components/layout";
import { theme } from "../utils/theme";

const textCss = css({
  color: theme.color.primary,
});

export default function NotFound() {
  return (
    <Layout>
      <h1 css={textCss}>There's nothing here</h1>
      <h2 css={textCss}>404 page not found</h2>
    </Layout>
  );
}
