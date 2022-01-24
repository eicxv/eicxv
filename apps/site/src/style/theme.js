import { sand, sandDark, amber, amberDark } from '@radix-ui/colors';

export const theme = {
  colors: {
    ...sand,

    gray1: sand.sand1,
    gray2: sand.sand2,
    gray3: sand.sand3,
    gray4: sand.sand4,
    gray5: sand.sand5,
    gray6: sand.sand6,
    gray7: sand.sand7,
    gray8: sand.sand8,
    gray9: sand.sand9,
    gray10: sand.sand10,
    gray11: sand.sand11,
    gray12: sand.sand12,
    text: sand.sand12,
    background: sand.sand1,
    primary: sand.sand1,
    secondary: sand.sand12,
    textFaded: sand.sand11,
    textExtraFaded: sand.sand10,
    backgroundFaded: sand.sand2,
    warning: amber.amber8,
  },
  space: {
    0: '0rem',
    1: '0.25rem',
    2: '0.5rem',
    3: '1rem',
    4: '2rem',
    5: '4rem',
    6: '8rem',
    7: '16rem',
    8: '32rem',
  },
  fontSizes: {
    1: '0.75rem',
    2: '0.875rem',
    3: '1rem',
    4: '1.25rem',
    5: '1.5rem',
    6: '2rem',
    7: '3rem',
    8: '4rem',
    9: '6rem',
  },
  fonts: {
    default: 'Cooper Hewitt, Segoe UI, Roboto, apple-system, sans-serif',
    code: 'jetbrains mono, monospace',
  },
  fontWeights: {
    body: 400,
    heading: 500,
    bold: 600,
  },
  lineHeights: {
    body: 1.75,
    heading: 1.25,
  },
  letterSpacings: {},
  sizes: {
    textColumn: '70ch',
  },
  borderWidths: {},
  borderStyles: {},
  radiuses: {
    small: '3px',
    medium: '5px',
    round: '9999px',
  },
  shadows: {},
  zIndices: {},
  transitions: {},
};

export const darkTheme = {
  ...theme,
  colors: {
    gray1: sandDark.sand1,
    gray2: sandDark.sand2,
    gray3: sandDark.sand3,
    gray4: sandDark.sand4,
    gray5: sandDark.sand5,
    gray6: sandDark.sand6,
    gray7: sandDark.sand7,
    gray8: sandDark.sand8,
    gray9: sandDark.sand9,
    gray10: sandDark.sand10,
    gray11: sandDark.sand11,
    gray12: sandDark.sand12,
    text: sandDark.sand12,
    background: sandDark.sand1,
    primary: sandDark.sand1,
    secondary: sandDark.sand12,
    textFaded: sandDark.sand11,
    textExtraFaded: sandDark.sand10,
    backgroundFaded: sandDark.sand2,
    warning: amberDark.amber8,
  },
};
