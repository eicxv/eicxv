import React from "react";

// material ui
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => {
  return {
    introText: {
      position: "absolute",
      left: "15vw",
      top: "6rem",
      width: "70vw",
      color: theme.palette.primary.main,
      fontFamily: "'Archivo', serif",
      fontWeight: "500",
      fontSize: "4rem",
      pointerEvents: "none"
    }
  };
});

function NotFound(props) {
  const classes = useStyles();

  return (
    <div className={classes.introText}>
      <Typography variant="h2" align="left" gutterBottom>
        There's nothing here
      </Typography>
      <Typography variant="h4">404 page not found</Typography>
    </div>
  );
}

export default NotFound;
