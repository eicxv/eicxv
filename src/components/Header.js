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
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.palette.secondary.main,
      zIndex: "200"
    },
    content: {
      width: "70%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row"
    }
  };
});

function Header(props) {
  const classes = useStyles();
  return (
    <div id="header" className={classes.header}>
      <div className={classes.content}>
        <Button onClick={props.onJournal}>Journal</Button>
        <Button onClick={props.onHome}>Einar Persson</Button>
        <Button onClick={props.onAbout}>About</Button>
      </div>
    </div>
  );
}

export default Header;
