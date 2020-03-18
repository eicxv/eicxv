import React, { Fragment, useState, useEffect } from "react";

// material ui
import { makeStyles } from "@material-ui/core/styles";

// custom components
import PostPreview from "./PostPreview";

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
    <Fragment>
      {PostPreviews.map(post => (
        <div className={classes.postPreview} key={post.url}>
          <PostPreview post={post} />
        </div>
      ))}
    </Fragment>
  );
}

export default Home;
