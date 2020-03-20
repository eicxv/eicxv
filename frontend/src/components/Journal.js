import React from "react";

// material ui
import { makeStyles } from "@material-ui/core/styles";

// custom components
import PostPreviewGrid from "./PostPreviewGrid";

const useStyles = makeStyles(theme => {
  return {
    background: {
      backgroundColor: theme.palette.secondary.main
    }
  };
});

function Journal() {
  const classes = useStyles();

  return <PostPreviewGrid />;
}

export default Journal;
