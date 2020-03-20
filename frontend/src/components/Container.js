import React from "react";

// material ui
import { withStyles } from "@material-ui/core/styles";

const styles = theme => {
  return {
    root: {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.secondary.main,
      padding: "1.2rem",
      border: "thin solid",
      borderColor: theme.palette.primary.main,
      "& img": {
        border: "15px solid",
        borderColor: theme.palette.primary.main
      }
    },
    clickable: {
      cursor: "pointer",
      "&:hover": {
        border: "4px solid",
        padding: "calc(1.2rem - 3px)", // offset border width
        "&:active": {
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
          "&": {
            color: theme.palette.secondary.main
          },
          "& img": {
            filter: "invert(0.8)"
          }
        }
      }
    }
  };
};

function Container(props) {
  const { classes, children, ...other } = props;

  return (
    <div
      className={`${classes.root} ${props.onClick ? classes.clickable : ""}`}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
}

export default withStyles(styles)(Container);
