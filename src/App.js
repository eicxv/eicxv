import React from "react";

// material ui
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

// custom components
import Home from "./components/Home";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#f5f5f5"
      // main: "#ffdae6"
      //   main: "#ffcccc"
      //   main: "#ffbbbb"
    },
    secondary: {
      main: "#212121"
      // main: "#151525"
      //   main: "#202030"
      //   main: "#222244"
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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
}

export default App;
