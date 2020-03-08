import React from "react";

// material ui
import { Typography } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  header: {
    height: "4rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "black"
  },
  headerButton: {
    padding: "0.2rem",
    backgroundColor: "black",
    cursor: "pointer",
    "&": {
      color: "white",
      textTransform: "uppercase",
      fontFamily: "'Montserrat', serif",
      fontSize: "1rem"
    },
    "&:hover": {
      backgroundColor: "white",
      "&": {
        color: "black"
      }
    }
  }
});

function App() {
  const classes = useStyles();
  return (
    <div className={classes.header}>
      <div className={classes.headerButton}>
        <Typography>Journal</Typography>
      </div>
      <div className={classes.headerButton}>
        <Typography>Einar Persson</Typography>
      </div>
      <div className={classes.headerButton}>
        <Typography>About</Typography>
      </div>
    </div>
  );
}

export default App;
