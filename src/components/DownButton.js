import React from "react";

// material ui
import { Typography } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

// icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles({
  button: {
    display: "flex",
    alignItems: "center",
    padding: "0.2rem 1.2rem",
    backgroundColor: "black",
    cursor: "pointer",
    "&": {
      color: "white",
      textTransform: "uppercase",
      fontFamily: "'Montserrat', serif",
      fontSize: "5rem"
    },
    "&:hover": {
      backgroundColor: "white",
      "&": {
        color: "black"
      },
      "&:active": {
        backgroundColor: "black",
        border: "thin solid white",
        "&": {
          color: "white"
        }
      }
    }
  },
  icon: { position: "relative", top: "-0.1rem" }
});

function App(props) {
  const classes = useStyles();
  return (
    <div onClick={props.onClick} className={classes.button}>
      <ExpandMoreIcon className={classes.icon} />
      <Typography>Latest Posts</Typography>
      <ExpandMoreIcon className={classes.icon} />
    </div>
  );
}

export default App;
