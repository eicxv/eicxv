import "styles/normalize.css";
import "fontsource-cooper-hewitt/all-400-normal.css";
import "fontsource-cooper-hewitt/all-500-normal.css";
import "fontsource-cooper-hewitt/all-700-normal.css";
import "styles/global.css";

import React from "react";
import { theme, ThemeProvider } from "styles/theme";

export const wrapRootElement = ({ element }) => {
  return <ThemeProvider value={theme}>{element}</ThemeProvider>;
};
