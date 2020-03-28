import React from "react";

// react router
import { Link } from "react-router-dom";

// material ui
import { Typography, ButtonBase } from "@material-ui/core/";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => {
  return {
    button: {
      padding: "0.2rem 1.2rem",
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.main,
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main
      },
      "&:active": {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.main,
        border: "thin solid",
        borderColor: theme.palette.primary.main,
        padding: "calc(0.2rem - 1px) calc(1.2rem - 1px)" // offset border width
      }
    },
    buttonTouch: {
      padding: "0.2rem 1.2rem",
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.main,
      transition: "0.15s step-end",
      "&:active": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main,
        transition: "0s"
      }
    },
    focusVisble: {
      border: "3px solid",
      borderColor: theme.palette.primary.main,
      padding: "calc(0.2rem - 3px) calc(1.2rem - 3px)" // offset border width
    }
  };
});

function Button(props) {
  const classes = useStyles();
  const theme = useTheme();

  let buttonOptions = {
    disableRipple: true,
    className: theme.touchDevice ? classes.buttonTouch : classes.button,
    focusVisibleClassName: classes.focusVisble
  };
  if (props.variant === "link") {
    buttonOptions.component = Link;
    buttonOptions.to = props.to;
  } else {
    buttonOptions.onClick = props.onClick;
  }

  return (
    <ButtonBase {...buttonOptions}>
      <Typography variant="button">{props.children}</Typography>
    </ButtonBase>
  );
}

export default Button;
