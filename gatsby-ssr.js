import React from "react";
import { theme, ThemeProvider } from "styles/theme";

export const wrapRootElement = ({ element }) => {
  return <ThemeProvider value={theme}>{element}</ThemeProvider>;
};
