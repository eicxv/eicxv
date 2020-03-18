import React, { Fragment, useState, useEffect } from "react";

// material ui
import { Typography } from "@material-ui/core/";
import { makeStyles, useTheme } from "@material-ui/core/styles";

// custom components
import DownButton from "./DownButton";
import PostPreview from "./PostPreview";

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
      bottom: "50px"
    },
    postPreview: {
      margin: "2rem 15vw",
      width: "70vw"
    }
  };
});

function Home() {
  const classes = useStyles();
  const [PostPreviews, setPostPreviews] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const url = new URL("read-post-previews", process.env.REACT_APP_API_URL);
      let response = await fetch(url);
      let data = await response.json();
      setPostPreviews(data);
    }
    fetchData();
  }, []);

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
      {PostPreviews.map(post => (
        <div className={classes.postPreview} key={post.url}>
          <PostPreview post={post} />
        </div>
      ))}
    </Fragment>
  );
}

export default Home;
