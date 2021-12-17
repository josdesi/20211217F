import React from "react";
import { makeStyles } from "@mui/styles";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
  company__columnContainer: {
    display: "flex",
  },
  company__name: {
    marginBottom: "-5px !important",
    fontWeight: 600,
  },
  company__type: {
    fontWeight: 100,
  },
  company__box: {
    maxHeight: 40,
  },
  avatar: {
    marginRight: 10,
  },
}));

const NameColumn = ({ name, type }) => {
  const classes = useStyles();

  return (
    <div className={classes.company__columnContainer}>
      <Avatar className={classes.avatar}>{name.charAt(0)}</Avatar>

      <Box className={classes.company__box}>
        <Typography className={classes.company__name} variant="body1">
          {name}
        </Typography>

        <Typography variant="caption" className={classes.company__type}>
          {type}
        </Typography>
      </Box>
    </div>
  );
};

NameColumn.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default NameColumn;
