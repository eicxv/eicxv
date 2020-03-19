import React from "react";

// react router
import { BrowserRouter, Switch, Route } from "react-router-dom";

// material ui
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles
} from "@material-ui/core/styles";

// custom components
import Home from "./components/Home";
import Journal from "./components/Journal";
import Post from "./components/Post";
import HeaderSpecialized from "./components/HeaderSpecialized";
import NotFound from "./components/NotFound";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#f5f5f5"
    },
    secondary: {
      main: "#212121"
    }
  },
  typography: {
    button: {
      fontFamily: ["Montserrat", "sans-serif"],
      fontSize: "1rem",
      letterSpacing: "normal"
    }
  }
});

const useStyles = makeStyles({
  background: {
    backgroundColor: theme.palette.secondary.main,
    height: "100%",
    padding: "1rem 15%"
  }
});

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <HeaderSpecialized />
        <div className={classes.background}>
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
          <div style={{ height: "100px" }}></div>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
