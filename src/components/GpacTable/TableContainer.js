import React from "react";
import TableContainer from "@mui/material/TableContainer";
import PropTypes from "prop-types";

const Container = (props) => <TableContainer {...props} />;

Container.propTypes = {
  sx: PropTypes.object,
};

Container.defaultProps = {
  sx: {
    maxHeight: 440,
  },
};

export default TableContainer;
