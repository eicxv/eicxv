import React from "react";

import Layout from "../components/layout";

const textCss = (theme) => ({
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
