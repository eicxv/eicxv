import React from "react";
import { Link } from "gatsby";

import { css } from "@emotion/core";
import { rhythm } from "../utils/typography";

const color = {
  secondary: "#aaaaaa",
  primary: "#222222",
};
const defaultCss = css({
  textTransform: "uppercase",
  boxShadow: "none",
  padding: `${rhythm(0.15)} ${rhythm(0.8)}`,
  backgroundColor: color.primary,
  color: color.secondary,
});
const hoverCss = css({
  "&:hover": {
    backgroundColor: color.secondary,
    color: color.primary,
  },
});
const activeCss = css({
  "&:active": {
    backgroundColor: color.primary,
    color: color.secondary,
    border: "thin solid",
    borderColor: color.secondary,
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
