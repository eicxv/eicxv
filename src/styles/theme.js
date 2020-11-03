import React, { createContext, useContext } from "react";

const theme = {
  color: {
    primary: "#212121",
    secondary: "#f5f5f5",
  },
};

const ThemeContext = createContext(theme);
const ThemeProvider = ThemeContext.Provider;

function withTheme(WrappedComponent) {
  const ComponentWithTheme = (props) => {
    const theme = useContext(ThemeContext);
    return <WrappedComponent {...{ ...props, theme }} />;
  };

  return ComponentWithTheme;
}

function useTheme() {
  return useContext(ThemeContext);
}

const breakPoints = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
};
const mediaQuery = {};
for (let [name, size] of Object.entries(breakPoints)) {
  mediaQuery[name] = `@media (min-width: ${size}px)`;
}

export { theme, ThemeProvider, useTheme, withTheme, mediaQuery };
