import React from "react";
import { css } from "@emotion/core";

import { mediaQuery as mq } from "../utils/emotion";

import Button from "./button";

const headerCss = (theme) => ({
  top: "0",
  width: "100%",
  height: "3rem",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.color.secondary,
  zIndex: "200",
});

const contentCss = css({
  [mq.xs]: {
    width: "90vw",
  },
  [mq.sm]: {
    width: "80vw",
  },
  [mq.lg]: {
    width: "70vw",
  },
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "row",
});

export default function Header() {
  return (
    <header css={headerCss}>
      <div css={contentCss}>
        <Button to={"/journal"}>Journal</Button>
        <Button to={"/"}>Einar&nbsp;Persson</Button>
        <Button to={"/about"}>About</Button>
      </div>
    </header>
  );
}
