import React from "react";

//material ui
import { Typography, Drawer } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import selfportrait from "../images/selfportrait.jpg";

const useStyles = makeStyles(theme => {
  return {
    text: {
      fontFamily: "'Montserrat', sans-serif"
    },
    drawer: {
      width: "30vw",
      padding: "4rem 6vw",
      [theme.breakpoints.down("lg")]: {
        width: "35vw",
        padding: "4rem 8vw"
      },
      [theme.breakpoints.down("md")]: {
        width: "60vw",
        padding: "4rem 12vw"
      },
      [theme.breakpoints.down("sm")]: {
        width: "75vw",
        padding: "4rem 16vw"
      },
      [theme.breakpoints.down("xs")]: {
        width: "100vw",
        padding: "4rem 8vw"
      }
    },
    selfportrait: {
      width: 160,
      display: "block",
      margin: "1rem auto"
    }
  };
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
      <div className={classes.drawer}>
        <img src={selfportrait} className={classes.selfportrait} />
        <Typography className={classes.text}>
          I'm Einar. I'm currently living in Gothenburg. I love sailing, I can
          spend all day in a museum and I make a really good pasta carbonara.
        </Typography>
        <br />
        <Typography className={classes.text}>
          I have studied Architecture and Engineering at Chalmers University of
          Technology and I am a self-taught programmer. I have an interest in
          architecture and design informed by computation, formfinding and
          generative art. I sometimes create traditional art. This site is a
          journal for all these things.
        </Typography>
      </div>
    </Drawer>
  );
}

export default About;
