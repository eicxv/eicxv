import React from "react";
import { css } from "@emotion/core";
import { rhythm } from "../utils/typography";

export default function Layout({ children }) {
  return (
    <div
      css={css`
        padding: ${rhythm(2)};
        max-width: ${rhythm(22)};
        margin: 0 auto;
      `}
    >
      {children}
    </div>
  );
}
