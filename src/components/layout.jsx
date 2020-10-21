import React, { Fragment } from "react";
import { css, Global } from "@emotion/core";
import { rhythm } from "../utils/typography";
import { theme } from "../utils/theme";

import Header from "./header";

const globalCss = css({
  body: {
    backgroundColor: theme.color.secondary,
  },
});

const wrapperCss = css({
  padding: rhythm(2),
  maxWidth: rhythm(22),
  margin: "0 auto",
});

export default function Layout({ children }) {
  return (
    <Fragment>
      <Global styles={globalCss} />
      <Header></Header>
      <div css={wrapperCss}>{children}</div>
    </Fragment>
  );
}
