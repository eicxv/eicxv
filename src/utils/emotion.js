import "fontsource-montserrat/400-normal.css";
import "fontsource-cooper-hewitt/all-400-normal.css";

const theme = {
  color: {
    primary: "#212121",
    secondary: "#f5f5f5",
  },
};

const globalCss = (theme) => ({
  body: {
    backgroundColor: theme.color.secondary,
    fontFamily: "Cooper Hewitt",
    lineHeight: 1.45,
  },
  h1: {
    color: "hsla(0,0%,0%,0.75)",
  },
  h2: {
    color: "hsla(0,0%,0%,0.775)",
  },
  h3: {
    color: "hsla(0,0%,0%,0.8)",
  },
  "h1,h2,h3,h4,h5,h6": {
    fontFamily: "Cooper Hewitt",
    lineHeight: 1,
  },
  "h1,h2,h3,h4": {
    lineHeight: 1,
    marginTop: "1.2rem",
    marginBottom: "0.6rem",
  },
  "h4,h5,h6": {
    textTransformation: "uppercase",
  },
  // Lists look better when not crowded by the larger headers.
  ul: {
    marginTop: "0.6rem",
  },
  a: {
    color: "hsl(230,55%,58%)",
    textDecoration: "none",
  },
  "a:hover,a:active": {
    boxShadow: "0 1px 0 0 currentColor",
  },
});

const mediaQuery = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
};

for (let [name, size] of Object.entries(mediaQuery)) {
  mediaQuery[name] = `@media (min-width: ${size}px)`;
}

const compose = (...themeFuncs) => (theme) => themeFuncs.map((f) => f(theme));

export { theme, mediaQuery, compose, globalCss };
