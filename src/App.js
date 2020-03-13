import React from "react";

// material ui
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

// custom components
import Home from "./components/Home";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ffffff"
    },
    secondary: {
      main: "#000000"
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
