import React, { useState, useEffect } from "react";

// react router
import { useParams } from "react-router-dom";

import ReactMarkdown from "react-markdown";

// material ui
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
  const [post, setPost] = useState([]);
  let { postId } = useParams();

  useEffect(() => {
    (async function fetchData() {
      const url = new URL(`read-post/${postId}`, process.env.REACT_APP_API_URL);
      let response = await fetch(url);
      let data = await response.json();
      setPost(data);
    })();
  }, []);

  return (
    <Paper className={classes.container}>
      <ReactMarkdown source={post.content} />
    </Paper>
  );
}

export default PostPreview;
