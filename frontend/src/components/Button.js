import React from "react";

// material ui
import { Typography } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => {
  return {
    button: {
      padding: "0.2rem 1.2rem",
      backgroundColor: theme.palette.secondary.main,
      cursor: "pointer",
      "&": {
        color: theme.palette.primary.main
      },
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
        "&": {
          color: theme.palette.secondary.main
        },
        "&:active": {
          backgroundColor: theme.palette.secondary.main,
          border: "thin solid",
          borderColor: theme.palette.primary.main,
          padding: "calc(0.2rem - 1px) calc(1.2rem - 1px)", // offset border width
          "&": {
            color: theme.palette.primary.main
          }
        }
      }
    }
  };
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
