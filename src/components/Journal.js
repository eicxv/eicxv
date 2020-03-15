import React, { useState } from "react";

// material ui
import { makeStyles, useTheme } from "@material-ui/core/styles";

// custom components
import Header from "./Header";
import About from "./About";
import PostPreview from "./PostPreview";

//dummy data
import posts from "../dummyPosts";

const useStyles = makeStyles(theme => {
  return {
    background: {
      backgroundColor: theme.palette.secondary.main
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

  return (
    <div className={classes.background}>
      <Header onAbout={toggleAbout} />
      <About open={aboutOpen} onClose={toggleAbout} />
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
