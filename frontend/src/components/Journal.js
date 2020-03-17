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
      let response = await fetch("http://127.0.0.1:5000/read-post-previews");
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
