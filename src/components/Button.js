import React from "react";

// material ui
import { Typography } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  button: {
    padding: "0.2rem 1.2rem",
    backgroundColor: "black",
    cursor: "pointer",
    "&": {
      color: "white",
      textTransform: "uppercase",
      fontFamily: "'Space Mono', serif",
      fontSize: "1rem"
    },
    "&:hover": {
      backgroundColor: "white",
      "&": {
        color: "black"
      },
      "&:active": {
        backgroundColor: "black",
        border: "thin solid white",
        "&": {
          color: "white"
        }
      }
    }
  }
});

function Button(props) {
  const classes = useStyles();
  return (
    <div className={classes.button} onClick={props.onClick}>
      <Typography variant="button">{props.children}</Typography>
    </div>
  );
}

export default Button;
