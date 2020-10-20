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

export { mediaQuery };
