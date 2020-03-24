import React from "react";

// react router
import { BrowserRouter, Switch, Route } from "react-router-dom";

// material ui
import { CssBaseline } from "@material-ui/core";
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
  responsiveFontSizes
} from "@material-ui/core/styles";

// custom components
import Home from "./components/Home";
import Journal from "./components/Journal";
import Post from "./components/Post";
import HeaderSpecialized from "./components/HeaderSpecialized";
import NotFound from "./components/NotFound";

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
    button: {
      fontFamily: ["Montserrat", "sans-serif"],
      fontSize: "1rem",
      letterSpacing: "normal"
    }
  },
  touchDevice: "ontouchstart" in document.documentElement
});
theme = responsiveFontSizes(theme, { factor: 3 });

const useStyles = makeStyles({
  margin: {
    padding: "1rem 15%",
    [theme.breakpoints.down("sm")]: {
      padding: "1rem 10%"
    }
  }
});

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <HeaderSpecialized />
        <div className={classes.margin}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/journal">
              <Journal />
            </Route>
            <Route path="/journal/:postId">
              <Post />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
