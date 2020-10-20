import React, { Fragment } from "react";
import { css } from "@emotion/core";
import { rhythm } from "../utils/typography";

import Header from "./header";

export default function Layout({ children }) {
  return (
    <Fragment>
      <Header></Header>
      <div
        css={css`
          padding: ${rhythm(2)};
          max-width: ${rhythm(22)};
          margin: 0 auto;
        `}
      >
        {children}
      </div>
    </Fragment>
  );
}
