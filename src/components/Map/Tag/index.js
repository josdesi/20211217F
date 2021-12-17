import React from "react";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";

const colors = {
  red: "#FF3939",
  blue: "#4056F4",
  black: "#222A39",
  default: "#4056F4",
};

const useStyles = makeStyles(() => ({
  marker: {
    textAlign: "center",
  },

  marker__content: {
    transform: "translate(-50%, -160%) rotate(45deg)",
    width: 35,
    height: 35,
    background: ({ color }) => {
      return colors[color] || colors.default;
    },
  },

  marker__arrow: {
    transform: "translate(-50%, -250%) rotate(0deg)",
    width: "auto",
    minWidth: 60,
    height: 40,
    minHeight: 40,
    background: ({ color }) => {
      return colors[color] || colors.default;
    },
    borderRadius: 5,
    justifyContent: "center",
    justifyItems: "center",
  },
}));

const Tag = ({ children, color }) => {
  const classes = useStyles({ color });

  return (
    <div className={classes.marker}>
      <div className={classes.marker__content} />
      <div className={classes.marker__arrow}>{children}</div>
    </div>
  );
};

Tag.propTypes = {
  color: PropTypes.oneOf(["blue", "black", "red"]),
};

Tag.defaultProps = {
  color: "",
};

export default Tag;
