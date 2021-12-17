import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  ellipse: {
    height: 20,
    width: 20,
    borderRadius: "100%",
    background: theme.palette.red.main,
    marginRight: 10,
    marginTop: 6,
  },
}));

const ContentTitle = ({ title }) => {
  const classes = useStyles();

  return (
    <span className={classes.root}>
      <span className={classes.ellipse}></span>
      <Typography variant="h5" noWrap component="div">
        {title}
      </Typography>
    </span>
  );
};

ContentTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

ContentTitle.defaultProps = {
  title: "",
};

export default ContentTitle;
