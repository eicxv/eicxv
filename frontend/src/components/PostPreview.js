import React from "react";

// react router
import { Link } from "react-router-dom";

// material ui
import { Typography, Hidden, ButtonBase } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => {
  return {
    container: {
      height: "100%",
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.secondary.main,
      display: "flex",
      border: "thin solid",
      borderColor: theme.palette.primary.main,
      "&:hover": {
        outline: "3px solid",
        outlineColor: theme.palette.primary.main
      },
      "&:active": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main,
        "& img": {
          filter: "invert(0.75)"
        }
      }
    },
    containerTouch: {
      height: "100%",
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.secondary.main,
      display: "flex",
      border: "thin solid",
      borderColor: theme.palette.primary.main,
      transition: "0.15s step-end",
      "&:active": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main,
        transition: "0s",
        "& img": {
          filter: "invert(0.75)"
        }
      }
    },
    title: {
      fontFamily: "'Archivo', sans-serif",
      fontSize: "2rem"
    },
    introText: {
      fontFamily: "'Montserrat', sans-serif",
      fontSize: "1rem",
      textOverflow: "ellipsis"
    },
    metaData: {
      fontFamily: "'Space Mono', sans-serif",
      fontSize: "0.625rem"
    },
    detailsContainer: {
      flex: 1,
      padding: 20
    },
    imageContainer: {
      border: "10px solid",
      borderLeft: "11px solid",
      borderColor: theme.palette.primary.main
    },
    image: {
      objectFit: "cover",
      width: 160,
      height: "100%"
    },
    focusVisble: {
      outline: "3px solid",
      outlineColor: theme.palette.primary.main
    }
  };
});

function PostPreview(props) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <ButtonBase
      component={Link}
      to={`/journal/${props.post.url}`}
      disableRipple
      focusVisibleClassName={classes.focusVisble}
    >
      <div
        className={
          theme.touchDevice ? classes.containerTouch : classes.container
        }
      >
        <div className={classes.detailsContainer}>
          <Typography className={classes.title}>
            {props.post.intro_title}
          </Typography>
          <Typography className={classes.introText}>
            {props.post.intro_content}
          </Typography>
        </div>
        {props.post.intro_image ? (
          <Hidden xsDown>
            <div className={classes.imageContainer}>
              <img src={props.post.intro_image} className={classes.image} />
            </div>
          </Hidden>
        ) : null}
      </div>
    </ButtonBase>
  );
}

export default PostPreview;
