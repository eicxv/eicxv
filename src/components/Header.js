import React from "react";

// material ui
import { makeStyles } from "@material-ui/core/styles";

// custom components
import Button from "./Button";

const useStyles = makeStyles(theme => {
  return {
    header: {
      position: "fixed",
      width: "100%",
      height: "4rem",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      backgroundColor: theme.palette.secondary.main,
      zIndex: "200"
    }
  };
});

function Header(props) {
  const classes = useStyles();
  return (
    <div id="header" className={classes.header}>
      <Button onClick={props.onJournal}>Journal</Button>
      <Button onClick={props.onHome}>Einar Persson</Button>
      <Button onClick={props.onAbout}>About</Button>
    </div>
  );
}

export default Header;
