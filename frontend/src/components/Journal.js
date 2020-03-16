import React, { Fragment, useState } from "react";

// material ui
import { makeStyles, useTheme } from "@material-ui/core/styles";

// custom components
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
  const classes = useStyles();

  return (
    <Fragment>
      {posts.map(post => (
        <div className={classes.postPreview}>
          <PostPreview post={post} key={post.meta.id} />
        </div>
      ))}
    </Fragment>
  );
}

export default Home;
