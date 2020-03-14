import React from "react";

//material ui
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    padding: "2rem",
    display: "flex",
    alignItems: "center"
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

  return (
    <Paper className={classes.container}>
      <div className={classes.text}>
        <Typography className={classes.title}>{props.post.title}</Typography>
        <Typography className={classes.introText}>
          {props.post.intro.content}
          {/* <img src={props.post.intro.image} className={classes.image} /> */}
        </Typography>
        <Typography className={classes.metaData}>
          {props.post.meta.author}
        </Typography>
        <Typography className={classes.metaData}>
          {props.post.meta.firstPublished}
        </Typography>
      </div>
      {props.post.intro.image ? (
        // <div className={classes.image}>
        <img src={props.post.intro.image} className={classes.image} />
      ) : // </div>
      null}
    </Paper>
  );
}

export default PostPreview;
