import React from "react";

//material ui
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";

const useStyles = makeStyles({
  container: {
    padding: "2rem",
    display: "flex",
    alignItems: "center",
    margin: "2rem 0"
  },
  title: {
    fontFamily: "'Archivo', sans-serif",
    fontSize: "2rem"
  },
  introText: {
    maxHeight: "14rem",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "1rem",
    textOverflow: "ellipsis"
  },
  metaData: {
    fontFamily: "'Space Mono', sans-serif",
    fontSize: "0.625rem"
  },
  text: {
    minWidth: "50%",
    flexGrow: "1",
    flexBasis: "0"
  },
  image: {
    display: "block",
    width: "auto",
    height: "auto",
    maxWidth: "100%",
    maxHeight: "14rem",
    marginLeft: "3rem"
  }
});

function PostPreview(props) {
  const classes = useStyles();
  const history = useHistory();

  function goToPost() {
    history.push(`/journal/${props.post.url}`);
  }

  return (
    <Paper className={classes.container} onClick={goToPost}>
      <div className={classes.text}>
        <Typography className={classes.title}>
          {props.post.intro_title}
        </Typography>
        <Typography className={classes.introText}>
          {props.post.intro_content}
        </Typography>
      </div>
      {props.post.intro_image ? (
        <img src={props.post.intro_image} className={classes.image} />
      ) : null}
    </Paper>
  );
}

export default PostPreview;
