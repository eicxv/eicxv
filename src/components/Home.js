import React, { useState } from "react";

// material ui
import { Typography } from "@material-ui/core/";
import { makeStyles, useTheme } from "@material-ui/core/styles";

// custom components
import Header from "./Header";
import About from "./About";
import DownButton from "./DownButton";
import PostPreview from "./PostPreview";

import ReflectionSketch from "./ReflectionSketch";

//dummy data
import posts from "../dummyPosts";

const useStyles = makeStyles(theme => {
  return {
    background: {
      backgroundColor: theme.palette.secondary.main
    },
    introText: {
      position: "absolute",
      left: "15vw",
      top: "6rem",
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
  const theme = useTheme();
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
        <div className={classes.postPreview}>
          <PostPreview post={post} key={post.meta.id} />
        </div>
      ))}
      <div style={{ height: "100px" }}></div>
    </div>
  );
}

export default Home;
