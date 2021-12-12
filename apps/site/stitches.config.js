import { createStitches } from '@stitches/react';

export const { styled, css, globalCss, getCssText, theme, createTheme } =
  createStitches({
    theme: {
      colors: {
        gray50: '#fafafa',
        gray100: '#f5f5f5',
        gray200: '#eeeeee',
        gray300: '#e0e0e0',
        gray400: '#bdbdbd',
        gray500: '#9e9e9e',
        gray600: '#757575',
        gray700: '#616161',
        gray800: '#424242',
        gray900: '#212121',
        warning: '#ffd92f',
        text: '$gray900',
        background: '$gray100',
        primary: '$gray100',
        secondary: '$gray900',
        textFaded: '$gray700',
        textExtraFaded: '$gray500',
        backgroundFaded: '$gray300',
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
        bold: 700,
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
      radii: {},
      shadows: {},
      zIndices: {},
      transitions: {},
    },
    utils: {
      p: (value) => ({
        margin: value,
      }),
      mt: (value) => ({
        marginTop: value,
      }),
      mr: (value) => ({
        marginRight: value,
      }),
      mb: (value) => ({
        marginBottom: value,
      }),
      ml: (value) => ({
        marginLeft: value,
      }),
      mx: (value) => ({
        marginLeft: value,
        marginRight: value,
      }),
      my: (value) => ({
        marginTop: value,
        marginBottom: value,
      }),
      p: (value) => ({
        padding: value,
      }),
      pt: (value) => ({
        paddingTop: value,
      }),
      pr: (value) => ({
        paddingRight: value,
      }),
      pb: (value) => ({
        paddingBottom: value,
      }),
      pl: (value) => ({
        paddingLeft: value,
      }),
      px: (value) => ({
        paddingLeft: value,
        paddingRight: value,
      }),
      py: (value) => ({
        paddingTop: value,
        paddingBottom: value,
      }),
    },
  });

export const darkTheme = createTheme({
  colors: {
    text: '$gray100',
    background: '$gray900',
    primary: '$gray900',
    secondary: '$gray100',
    textFaded: '$gray300',
    textExtraFaded: '$gray600',
    backgroundFaded: '$gray800',
  },
});
