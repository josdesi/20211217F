import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
  map_item: {
    display: "flex",
    width: "100%",
  },
  map_item_size: {
    width: "50%",
  },
  map_item_name: {
    fontWeight: 600,
  },
  map_item_text: {
    marginBottom: 0,
  },
}));

const Item = ({ type, title, name, phone, location }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.map_item}>
        <div className={classes.map_item_size}>
          <Box>
            <Typography variant="body2" className={classes.map_item_text}>
              {type}
            </Typography>

            <Typography
              className={`${classes.map_item_name} ${classes.map_item_text}`}
              variant="body1"
            >
              {name}
            </Typography>

            <Typography variant="caption" className={classes.map_item_text}>
              {title}
            </Typography>
          </Box>
        </div>

        <div className={classes.map_item_size}>
          <Box>
            <Typography
              className={classes.map_item_text}
              variant="body2"
              align="right"
            >
              {location?.name}, {location?.code}
            </Typography>

            <Typography
              className={`${classes.map_item_name} ${classes.map_item_text}`}
              variant="body2"
              align="right"
            >
              {location?.zipcode}
            </Typography>

            <Typography
              className={classes.map_item_text}
              variant="body2"
              align="right"
            >
              {phone}
            </Typography>
          </Box>
        </div>
      </div>
    </>
  );
};

Item.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phone: PropTypes.string,
  location: PropTypes.shape({
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    zipcode: PropTypes.string.isRequired,
  }),
};

Item.defaultProps = {
  location: {},
};

export default Item;
