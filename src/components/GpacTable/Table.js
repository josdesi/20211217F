import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import PropTypes from "prop-types";

const StyledTable = styled(Table)(() => ({
  borderSpacing: "0 5px",
}));

StyledTable.propTypes = {
  stickyHeader: PropTypes.bool,
  sx: PropTypes.object,
};

StyledTable.defaultProps = {
  sx: {
    minWidth: 700,
  },
  stickyHeader: true,
};

export default StyledTable;
