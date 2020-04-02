import React from "react";

// react router
import { Link } from "react-router-dom";

// material ui
import { Typography, ButtonBase } from "@material-ui/core/";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => {
  let colorPrimary = props =>
    props.colorPrimary ? props.colorPrimary : theme.palette.secondary.main;
  let colorSecondary = props =>
    props.colorSecondary ? props.colorSecondary : theme.palette.primary.main;
  return {
    button: {
      padding: "0.2rem 1.2rem",
      backgroundColor: colorPrimary,
      color: colorSecondary,
      "&:hover": {
        backgroundColor: colorSecondary,
        color: props =>
          props.colorPrimary ? props.colorPrimary : theme.palette.secondary.main
      },
      "&:active": {
        backgroundColor: colorPrimary,
        color: colorSecondary,
        border: "thin solid",
        borderColor: colorSecondary,
        padding: "calc(0.2rem - 1px) calc(1.2rem - 1px)" // offset border width
      }
    },
    buttonTouch: {
      padding: "0.2rem 1.2rem",
      backgroundColor: colorPrimary,
      color: colorSecondary,
      transition: "0.15s step-end",
      "&:active": {
        backgroundColor: colorSecondary,
        color: colorPrimary,
        transition: "0s"
      }
    },
    focusVisble: {
      border: "3px solid",
      borderColor: colorSecondary,
      padding: "calc(0.2rem - 3px) calc(1.2rem - 3px)" // offset border width
    }
  };
});

function Button(props) {
  const classes = useStyles(props);
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
