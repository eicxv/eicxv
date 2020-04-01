import React, { useState, useEffect } from "react";

// react router
import { useParams } from "react-router-dom";

// material ui
import { makeStyles } from "@material-ui/core/styles";

// custom components
import Markdown from "./Markdown";

const useStyles = makeStyles(theme => {
  return {
    markdown: {
      maxWidth: "45rem",
      color: theme.palette.primary.main
    }
  };
});

function Post(props) {
  const classes = useStyles();
  const [post, setPost] = useState();
  let { postId } = useParams();

  useEffect(() => {
    (async function fetchData() {
      const url = new URL(`read-post/${postId}`, process.env.REACT_APP_API_URL);
      let response = await fetch(url);
      let data = await response.json();
      setPost(data);
    })();
  }, []);

  return post ? (
    <Markdown className={classes.markdown}>{post.content}</Markdown>
  ) : null;
}

export default Post;
