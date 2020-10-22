import React, { Fragment } from "react";
import { css, Global } from "@emotion/core";

import Header from "./header";
import { globalCss } from "../utils/emotion";

const wrapperCss = css({
  padding: "2rem 4rem",
  maxWidth: "30rem",
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
