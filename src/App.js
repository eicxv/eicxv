import React, { useState } from "react";

// material ui
import { Typography } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

// custom components
import Header from "./components/Header";
import About from "./components/About";
import DownButton from "./components/DownButton";
import Post from "./components/Post";
import PostPreview from "./components/PostPreview";

import ReflectionSketch from "./components/ReflectionSketch";

//dummy data
import posts from "./dummyPosts";

const useStyles = makeStyles({
  background: {
    backgroundColor: "black",
    scrollBehavior: "smooth"
  },
  introText: {
    position: "absolute",
    left: "90px",
    top: "70px",
    color: "white",
    fontFamily: "'Archivo', serif",
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
  }
});

function App() {
  const classes = useStyles();
  const [aboutOpen, setAboutOpen] = useState();

  function toggleAbout() {
    setAboutOpen(!aboutOpen);
  }

  function scrollToLatest() {
    let headerHeight = document.getElementById("header").offsetHeight;
    window.scrollTo({
      top: window.innerHeight - headerHeight,
      behavior: "smooth"
    });
  }

  return (
    <div className={classes.background}>
      <Header onAbout={toggleAbout} />
      <About open={aboutOpen} onClose={toggleAbout} />
      <Typography className={classes.introText} align="left">
        Lorem Ipsum
      </Typography>
      <ReflectionSketch canvasStyle={classes.sketch} />
      <div className={classes.downButtonContainer}>
        <DownButton onClick={scrollToLatest} />
      </div>
      {posts.map(post => (
        <PostPreview post={post} key={post.meta.id} />
      ))}
    </div>
  );
}

export default App;
