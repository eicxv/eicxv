import React from "react";

// material ui
import { makeStyles } from "@material-ui/core/styles";

// icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// custom components
import Button from "./Button";

const useStyles = makeStyles({
  icon: { position: "relative", top: "0.3rem" }
});

function DownButton(props) {
  const classes = useStyles();
  return (
    <Button onClick={props.onClick}>
      <ExpandMoreIcon className={classes.icon} />
      Latest Posts
      <ExpandMoreIcon className={classes.icon} />
    </Button>
  );
}

export default DownButton;
