import React from "react";

// react router
import { useParams } from "react-router-dom";

import ReactMarkdown from "react-markdown";

// material ui
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

//dummy data
import posts from "../dummyPosts";

const useStyles = makeStyles({
  container: {
    width: "50vw",
    padding: "2rem",
    margin: "1rem"
  },
  title: {
    fontFamily: "'Archivo', sans-serif",
    fontSize: "2rem"
  },
  introText: {
    maxHeight: "14rem",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "1rem",
    textOverflow: "ellipsis"
  },
  metaData: {
    fontFamily: "'Space Mono', sans-serif",
    fontSize: "0.625rem"
  }
});

function PostPreview(props) {
  const classes = useStyles();
  let { post } = useParams();
  let currPost = posts[post];

  return (
    <Paper className={classes.container}>
      <Typography className={classes.title}>{currPost.title}</Typography>
      <Typography className={classes.metaData}>
        {currPost.meta.author}
      </Typography>
      <Typography className={classes.metaData}>
        {currPost.meta.firstPublished}
      </Typography>
      <ReactMarkdown source={currPost.content} />
    </Paper>
  );
}

export default PostPreview;
