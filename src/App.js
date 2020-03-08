import React, { useState } from "react";

// material ui
import { Typography } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

// custom components
import Header from "./components/Header";
import About from "./components/About";
import ReflectionSketch from "./components/ReflectionSketch";

const useStyles = makeStyles({
  background: {},
  introText: {
    position: "absolute",
    left: "90px",
    top: "70px",
    color: "white",
    fontFamily: "'Archivo', serif",
    fontSize: "4rem",
    pointerEvents: "none"
  },
  sketch: { width: "100%", height: "85vh", display: "block" }
});

function App() {
  const classes = useStyles();
  const [aboutOpen, setAboutOpen] = useState();

  function toggleAbout() {
    setAboutOpen(!aboutOpen);
  }

  return (
    <div className="App">
      <Header onAbout={toggleAbout} />
      <About open={aboutOpen} onClose={toggleAbout} />
      <Typography className={classes.introText} align="left">
        Lorem Ipsum
      </Typography>
      <ReflectionSketch canvasStyle={classes.sketch} />
    </div>
  );
}

export default App;
