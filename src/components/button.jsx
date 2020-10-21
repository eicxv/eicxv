import React from "react";
import { Link } from "gatsby";

import { css } from "@emotion/core";
import { rhythm } from "../utils/typography";
import { theme } from "../utils/theme";

const defaultCss = css({
  textTransform: "uppercase",
  boxShadow: "none !important",
  padding: `${rhythm(0.15)} ${rhythm(0.8)}`,
  backgroundColor: theme.color.secondary,
  color: theme.color.primary,
});
const hoverCss = css({
  "&:hover": {
    color: theme.color.secondary,
    backgroundColor: theme.color.primary,
  },
});
const activeCss = css({
  "&:active": {
    backgroundColor: theme.color.secondary,
    color: theme.color.primary,
    border: "thin solid",
    borderColor: theme.color.primary,
    padding: `calc(${rhythm(0.12)} - 1px) calc(${rhythm(0.8)} - 1px)`, // offset border width
  },
});

export default function Button(props) {
  return (
    <Link css={[defaultCss, hoverCss, activeCss]} to={props.to}>
      {props.children}
    </Link>
  );
}
