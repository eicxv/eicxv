import React, { useState, useEffect } from "react";

// material ui
import { makeStyles } from "@material-ui/core/styles";

// custom components
import PostPreview from "./PostPreview";

const useStyles = makeStyles(theme => {
  return {
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

function PostPreviewGrid() {
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

  return (
    <div className={classes.postsGrid}>
      {PostPreviews.map(post => (
        <PostPreview post={post} key={post.url} />
      ))}
    </div>
  );
}

export default PostPreviewGrid;
