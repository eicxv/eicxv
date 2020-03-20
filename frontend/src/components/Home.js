import React, { Fragment } from "react";

// material ui
import { Typography } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

// custom components
import DownButton from "./DownButton";
import PostPreviewGrid from "./PostPreviewGrid";

import ReflectionSketch from "./ReflectionSketch";

const useStyles = makeStyles(theme => {
  return {
    background: {
      backgroundColor: theme.palette.secondary.main
    },
    introText: {
      position: "absolute",
      left: "15vw",
      top: "6rem",
      width: "70vw",
      color: theme.palette.primary.main,
      fontFamily: "'Archivo', serif",
      fontWeight: "500",
      fontSize: "4rem",
      pointerEvents: "none"
    },
    sketch: { width: "100%", height: "100vh", display: "block" },
    downButtonContainer: {
      display: "flex",
      justifyContent: "center",
      width: "100%",
      position: "absolute",
      bottom: "50px",
      left: "0"
    },
    postsGrid: {
      display: "grid",
      [theme.breakpoints.down("md")]: {
        gridTemplateColumns: "1fr"
      },
      [theme.breakpoints.up("lg")]: {
        gridTemplateColumns: "1fr 1fr"
      },
      gridGap: "50px"
    }
  };
});

function Home() {
  const classes = useStyles();

  function scrollToLatest() {
    let headerHeight = document.getElementById("header").offsetHeight;
    window.scrollTo({
      top: window.innerHeight - headerHeight,
      behavior: "smooth"
    });
  }

  return (
    <Fragment>
      <div className={classes.introText}>
        <Typography variant="h2" align="left" gutterBottom>
          Hello, I'm Einar
        </Typography>
        <Typography variant="h4">
          I'm interested in art, architecture and programming. This is a website
          for my thoughts and projects.
        </Typography>
      </div>
      <ReflectionSketch canvasStyle={classes.sketch} />
      <div className={classes.downButtonContainer}>
        <DownButton onClick={scrollToLatest} />
      </div>
      <PostPreviewGrid />
    </Fragment>
  );
}

export default Home;
