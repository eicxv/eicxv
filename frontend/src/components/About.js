import React from "react";

// react router
import { useHistory, useLocation } from "react-router-dom";

//material ui
import { Typography, Drawer } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

// custom components
import Button from "./Button";

// resources
import selfportrait from "../images/selfportrait.png";

const useStyles = makeStyles(theme => {
  return {
    text: {
      fontFamily: "'Montserrat', sans-serif"
    },
    drawer: {
      backgroundColor: theme.palette.primary.main
    },
    content: {
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
    button: {
      position: "absolute",
      top: "1rem",
      left: "2rem"
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
  const theme = useTheme();
  let history = useHistory();
  let location = useLocation();

  function close(e) {
    e.stopPropagation();
    history.push(location.state.background);
  }

  return (
    <Drawer
      anchor="right"
      open={props.open}
      onClose={close}
      ModalProps={{ BackdropProps: { invisible: true } }}
      classes={{ paper: classes.drawer }}
    >
      <div className={classes.drawer}>
        <div className={classes.button}>
          <Button
            onClick={close}
            colorPrimary={theme.palette.primary.main}
            colorSecondary={theme.palette.secondary.main}
          >
            Close
          </Button>
        </div>
        <div className={classes.content}>
          <img src={selfportrait} className={classes.selfportrait} />
          <Typography className={classes.text}>
            I'm Einar. I love sailing, I can spend all day in a museum and I
            make a really good pasta carbonara.
          </Typography>
          <br />
          <Typography className={classes.text}>
            I have studied Architecture and Engineering at Chalmers University
            of Technology and I am a self-taught programmer. I have an interest
            in architecture and design informed by computation, formfinding and
            generative art. I sometimes create traditional art. This site is a
            journal for my interests, thoughts and projects. I'm currently
            living in Gothenburg and always on the lookout for new challenges.
          </Typography>
        </div>
      </div>
    </Drawer>
  );
}

export default About;
