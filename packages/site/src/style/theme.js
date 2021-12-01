import { createTheme } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    primary: {
      main: '#f5f5f5',
      contrastText: '#212121',
    },
    secondary: {
      main: '#212121',
      contrastText: '#f5f5f5',
    },
    data1: { main: '#66c2a5' },
    data2: { main: '#fc8d62' },
    data3: { main: '#8da0cb' },
    data4: { main: '#e78ac3' },
    data5: { main: '#a6d854' },
    data6: { main: '#ffd92f' },
    cyan: { main: '#0184bc' },
    blue: { main: '#4078f2' },
    purple: { main: '#a626a4' },
    green: { main: '#50a14f' },
    red1: { main: '#e45649' },
    red2: { main: '#ca1243' },
    orange1: { main: '#986801' },
    orange2: { main: '#c18401' },
    bg: { main: '#fafafa' },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: [
      '"Cooper Hewitt"',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

theme = createTheme(theme, {
  components: {
    MuiButton: {
      defaultProps: { disableRipple: true },
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          fontWeight: 400,
          transition: 'none',
          borderRadius: 0,
          outline: 'thin solid',
          outlineColor: theme.palette.primary.contrastText,
          outlineOffset: '-1px',
          '&:hover': {
            outline: '3px solid',
            outlineColor: theme.palette.primary.contrastText,
            outlineOffset: '-3px',
          },
          '&:active': {
            backgroundColor: theme.palette.primary.contrastText,
            color: theme.palette.primary.main,
          },
          '&:focus-visible': {
            outline: 'thick solid',
            outlineColor: theme.palette.primary.contrastText,
            outlineOffset: '-1px',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: { size: 'small' },
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            fontFamily: '"jetbrains mono", monospace',
            color: theme.palette.primary.contrastText,
          },
          '& .MuiInputLabel-root': {
            transition: 'none',
            color: theme.palette.primary.contrastText,
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderRadius: 0,
              borderColor: theme.palette.primary.contrastText,
            },
            '&:hover fieldset': {
              borderWidth: 'thick',
              borderColor: theme.palette.primary.contrastText,
            },
            '&.Mui-focused fieldset': {
              borderWidth: 'medium',
              borderColor: theme.palette.primary.contrastText,
            },
          },
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          color: theme.palette.primary.contrastText,
          borderRadius: 2,
          height: 2,
          '& .MuiSlider-thumb': {
            color: theme.palette.primary.contrastText,
            outline: 'thin solid',
            outlineColor: theme.palette.primary.main,
            borderRadius: 0,
            width: 10,
            height: 20,
            '&::before': {
              boxShadow: 'none',
            },
            '&:hover': {
              color: theme.palette.primary.main,
              border: 'thin solid',
              borderColor: theme.palette.primary.contrastText,
              outlineColor: theme.palette.primary.main,
            },
            '&.Mui-focusVisible': {
              color: theme.palette.primary.main,
              outline: 'medium solid',
              outlineColor: theme.palette.primary.contrastText,
              outlineOffset: -1,
            },
            '&.Mui-active': {
              color: theme.palette.primary.contrastText,
              border: 'thin solid',
              outline: 'medium solid',
              borderColor: theme.palette.primary.main,
              outlineColor: theme.palette.primary.contrastText,
              outlineOffset: 0,
            },
          },
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  ...theme,
  palette: {
    ...theme.palette,
    primary: {
      ...theme.palette.secondary,
    },
    secondary: {
      ...theme.palette.primary,
    },
    background: {
      default: theme.palette.secondary.main,
    },
  },
});

export default theme;
