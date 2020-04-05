import React from "react";

// react router
import { BrowserRouter } from "react-router-dom";

// material ui
import { CssBaseline } from "@material-ui/core";
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
  responsiveFontSizes
} from "@material-ui/core/styles";

// custom components
import Routing from "./components/Routing";
import Header from "./components/Header";

let theme = createMuiTheme({
  palette: {
    primary: {
      main: "#f5f5f5"
    },
    secondary: {
      main: "#212121"
    },
    background: {
      default: "#212121"
    }
  },
  typography: {
    fontFamily: ["Archivo", '"Helvetica Neue"', "Arial", "sans-serif"],
    button: {
      fontFamily: ["Montserrat", "sans-serif"],
      fontSize: "1rem",
      letterSpacing: "normal"
    }
  },
  touchDevice: "ontouchstart" in document.documentElement
});
theme = responsiveFontSizes(theme, { factor: 2.5 });

const useStyles = makeStyles({
  margin: {
    padding: "1rem 15%",
    [theme.breakpoints.down("sm")]: {
      padding: "1rem 10%"
    },
    [theme.breakpoints.up("lg")]: {
      padding: "1rem 20%"
    }
  }
});

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <div className={classes.margin}>
          <Routing />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
