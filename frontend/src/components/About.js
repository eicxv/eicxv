import React from "react";

//material ui
import { Paper, Typography, Drawer } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  aboutText: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "1rem",
    width: "18vw",
    padding: "8vw"
  }
});

function About(props) {
  const classes = useStyles();

  return (
    <Drawer
      anchor="right"
      open={props.open}
      onClose={props.onClose}
      ModalProps={{ BackdropProps: { invisible: true } }}
    >
      <Typography className={classes.aboutText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Typography>
    </Drawer>
  );
}

export default About;
