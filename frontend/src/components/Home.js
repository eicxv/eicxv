import React, { Fragment, useRef, useState, useLayoutEffect } from "react";

// material ui
import { Typography } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

import { useScrollPosition } from "@n8tb1t/use-scroll-position";

// custom components
import DownButton from "./DownButton";
import PostPreviewGrid from "./PostPreviewGrid";
import ReflectionSketch from "./ReflectionSketch";

const useStyles = makeStyles(theme => {
  return {
    grid: {
      display: "grid",
      gridTemplateRows: "auto 5fr 1fr",
      height: "calc(100vh - 4rem)"
    },
    text: {
      color: theme.palette.primary.main
    },
    sketch: {
      position: "fixed",
      width: "100vw",
      left: "0",
      zIndex: "-1"
    },
    downButton: {
      position: "fixed",
      top: "90vh",
      width: "100vw",
      left: "0",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start"
    },
    downButtonHide: {
      display: "none"
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

  //set size and position of sketch canvas
  const sketchRef = useRef(null);
  const sketchPlaceholderRef = useRef(null);

  function useSketchStyle() {
    const [sketchStyle, setSketchStyle] = useState({});
    useLayoutEffect(() => {
      function updateSketchStyle() {
        let top = sketchPlaceholderRef.current.offsetTop;
        let height = sketchPlaceholderRef.current.offsetHeight;
        setSketchStyle({ height: height, top: top });
      }
      window.addEventListener("resize", updateSketchStyle);
      updateSketchStyle();
      return () => window.removeEventListener("resize", updateSketchStyle);
    }, []);
    return sketchStyle;
  }

  let sketchStyle = useSketchStyle();

  // remove faces from sketch by through multiplier on scroll
  function updateSketchMultiplier(scrollPosY) {
    let endSketchHeight = window.innerHeight * 0.6;
    let multiplier = 1 - Math.min(-scrollPosY / endSketchHeight, 1);
    multiplier = Math.pow(multiplier, 3);
    sketchRef.current.setFaceMultiplier(multiplier);
  }

  // hide downbutton on scroll
  const [hideDownButton, setHideDownButton] = useState(false);
  function showHideDownButton(scrollPosY) {
    setHideDownButton(window.innerHeight * 0.23 < -scrollPosY);
  }

  useScrollPosition(({ prevPos, currPos }) => {
    updateSketchMultiplier(currPos.y);
    showHideDownButton(currPos.y);
  });

  return (
    <Fragment>
      <ReflectionSketch
        canvasClass={classes.sketch}
        canvasStyle={sketchStyle}
        ref={sketchRef}
      />
      <div className={classes.grid}>
        <div className={classes.text} style={{ marginTop: "3rem" }}>
          <Typography variant="h2" align="left" gutterBottom>
            Hello, I'm Einar
          </Typography>
          <Typography variant="h4">
            I'm interested in art, architecture and programming. This is a
            website for my thoughts and projects.
          </Typography>
        </div>
        <div ref={sketchPlaceholderRef}></div>
        <div
          className={`${classes.downButton} ${
            hideDownButton ? classes.downButtonHide : ""
          }`}
        >
          <DownButton onClick={scrollToLatest} />
        </div>
      </div>
      <Typography
        variant="h4"
        gutterBottom
        className={classes.text}
        style={{ marginTop: "20vh" }}
      >
        Journal - Latest Posts
      </Typography>
      <PostPreviewGrid />
    </Fragment>
  );
}

export default Home;
