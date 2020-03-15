import React from "react";

import ReactMarkdown from "react-markdown";

//material ui
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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

  return (
    <Paper className={classes.container}>
      <Typography className={classes.title}>{props.post.title}</Typography>
      <Typography className={classes.metaData}>
        {props.post.meta.author}
      </Typography>
      <Typography className={classes.metaData}>
        {props.post.meta.firstPublished}
      </Typography>
      <ReactMarkdown source={props.post.content} />
    </Paper>
  );
}

export default PostPreview;
