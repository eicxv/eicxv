import React from "react";
import { Link } from "gatsby";
import styled from "@emotion/styled";

import { withTheme, mediaQuery as mq } from "styles/theme";

const StyledHeader = withTheme(styled.header`
  top: 0;
  width: 100%;
  height: 4rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.color.secondary};
  z-index: 200;
  ${mq.xs} {
    padding: 0 5vw;
  }
  ${mq.sm} {
    padding: 0 10vw;
  }
  ${mq.lg} {
    padding: 0 15vw;
  }
`);

const StyledLink = withTheme(styled(Link)`
  ${"" /* font-family: "Montserrat"; */}
  text-transform: uppercase;
  padding: 0.2rem 1.2rem;
  color: ${({ theme }) => theme.color.primary};
  background-color: ${({ theme }) => theme.color.secondary};
  &:hover {
    color: ${({ theme }) => theme.color.secondary};
    background-color: ${({ theme }) => theme.color.primary};
  }
  &:active {
    color: ${({ theme }) => theme.color.primary};
    background-color: ${({ theme }) => theme.color.secondary};
    border: thin solid;
    border-color: ${({ theme }) => theme.color.primary};
    padding: calc(0.2rem - 1px) calc(1.2rem - 1px);
  }
`);

export default function Header() {
  return (
    <StyledHeader>
      <StyledLink to={"/journal"}>Journal</StyledLink>
      <StyledLink to={"/"}>Einar&nbsp;Persson</StyledLink>
      <StyledLink to={"/about"}>About</StyledLink>
    </StyledHeader>
  );
}
