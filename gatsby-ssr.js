import React from "react";
import { ThemeProvider } from "emotion-theming";
import { theme } from "./src/utils/emotion";

export const wrapRootElement = ({ element }) => {
  return <ThemeProvider theme={theme}>{element}</ThemeProvider>;
};
