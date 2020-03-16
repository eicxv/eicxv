import React, { Fragment, useState } from "react";

// react router
import { useHistory } from "react-router-dom";

// material ui
import { makeStyles, useTheme } from "@material-ui/core/styles";

// custom components
import Header from "./Header";
import About from "./About";

const useStyles = makeStyles(theme => {
  return {};
});

function HeaderSpecialized() {
  const theme = useTheme();
  const classes = useStyles();
  const history = useHistory();
  const [aboutOpen, setAboutOpen] = useState();

  function goHome() {
    history.push("/");
  }

  function goJournal() {
    history.push("/journal");
  }

  function toggleAbout() {
    setAboutOpen(!aboutOpen);
  }

  return (
    <Fragment>
      <Header onAbout={toggleAbout} onHome={goHome} onJournal={goJournal} />
      <About open={aboutOpen} onClose={toggleAbout} />
    </Fragment>
  );
}

export default HeaderSpecialized;
