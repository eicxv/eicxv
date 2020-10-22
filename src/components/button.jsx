import React from "react";
import { Link } from "gatsby";

import { compose } from "../utils/emotion";

const defaultCss = (theme) => ({
  fontFamily: "Montserrat",
  textTransform: "uppercase",
  boxShadow: "none !important",
  padding: "0.2rem 1.2rem",
  backgroundColor: theme.color.secondary,
  color: theme.color.primary,
});
const hoverCss = (theme) => ({
  "&:hover": {
    color: theme.color.secondary,
    backgroundColor: theme.color.primary,
  },
});
const activeCss = (theme) => ({
  "&:active": {
    backgroundColor: theme.color.secondary,
    color: theme.color.primary,
    border: "thin solid",
    borderColor: theme.color.primary,
    padding: "calc(0.2rem - 1px) calc(1.2rem - 1px)",
  },
});

export default function Button(props) {
  return (
    <Link css={compose(defaultCss, hoverCss, activeCss)} to={props.to}>
      {props.children}
    </Link>
  );
}
