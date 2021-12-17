import React from "react";
import PropTypes from "prop-types";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import { DRAWER_WIDTH } from "../../constants";

const StyledMuiAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  background: "#20232B",
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const AppBar = ({ children, open }) => {
  return (
    <StyledMuiAppBar position="fixed" open={open}>
      <Toolbar>{children}</Toolbar>
    </StyledMuiAppBar>
  );
};

AppBar.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default AppBar;
