import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";

const textCss = (theme) => ({
  color: theme.color.primary,
});

export default function NotFound() {
  return (
    <Layout>
      <SEO title="Einar Persson · 404" />
      <h1 css={textCss}>There's nothing here</h1>
      <h2 css={textCss}>404 page not found</h2>
    </Layout>
  );
}
