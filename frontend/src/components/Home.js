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
    grid: {
      display: "grid",
      gridTemplateRows: "2fr 5fr 1fr",
      height: "calc(100vh - 4rem)"
    },
    text: {
      color: theme.palette.primary.main
    },
    sketch: {
      width: "100%",
      height: "100%",
      display: "block"
    },
    downButtonContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      width: "100%"
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
      <div className={classes.grid}>
        <div className={classes.text}>
          <Typography variant="h2" align="left" gutterBottom>
            Hello, I'm Einar
          </Typography>
          <Typography variant="h4">
            I'm interested in art, architecture and programming. This is a
            website for my thoughts and projects.
          </Typography>
        </div>
        <ReflectionSketch canvasStyle={classes.sketch} />
        <div className={classes.downButtonContainer}>
          <DownButton onClick={scrollToLatest} />
        </div>
      </div>
      <Typography variant="h4" gutterBottom className={classes.text}>
        Journal - Latest Posts
      </Typography>
      <PostPreviewGrid />
    </Fragment>
  );
}

export default Home;
