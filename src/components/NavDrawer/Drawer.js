import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import MuiDrawer from "@mui/material/Drawer";
import { DRAWER_WIDTH } from "../../constants";
import DrawerHeader from "./DrawerHeader";
import { ReactComponent as Logo } from "../../assets/images/gpac-logo.svg";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import Clock from "../Clock";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import { dispatchSignOut, dispatchClearSignOut } from "../../redux/actions";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => ({
  paper: {},
  logo: {
    cursor: "pointer",
    height: 50,
    width: "auto",
    fill: "red",
    color: "red",
  },
}));

const _openedMixin = (theme) => ({
  width: DRAWER_WIDTH,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const _closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  top: 50,
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const StyledMuiDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ..._openedMixin(theme),
    "& .MuiDrawer-paper": _openedMixin(theme),
  }),
  ...(!open && {
    ..._closedMixin(theme),
    "& .MuiDrawer-paper": _closedMixin(theme),
  }),
}));

const Drawer = ({
  user,
  signOut,
  items,
  open,
  handleDrawerClose,
  dispatchSignOut,
  dispatchClearSignOut,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      dispatchClearSignOut();
    };
  }, []);

  useEffect(() => {
    if (signOut.success) {
      navigate("/signin");
    }
  }, [signOut]);

  const handleSignOut = () => {
    dispatchSignOut();
  };

  return (
    <StyledMuiDrawer variant="permanent" open={open}>
      <DrawerHeader>
        <Logo className={classes.logo} onClick={handleDrawerClose} />
      </DrawerHeader>

      <Typography
        variant="button"
        component="div"
        textAlign="center"
        color="text.disabled"
        fontSize={8}
      >
        {user.role?.name}
      </Typography>

      <Typography
        variant="button"
        component="div"
        textAlign="center"
        color="text.disabled"
        fontSize={11}
      >
        {open ? user.user?.fullname : user.user?.name}
      </Typography>

      <List>
        {items.map(({ label, path, icon, disabled }) => (
          <ListItem
            disabled={disabled}
            button
            key={path}
            to={path}
            component={Link}
            // component="a"
            // href={path}
            className={classes.listItem}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItem>
        ))}

        <ListItem button className={classes.listItem} onClick={handleSignOut}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Sign Out" />
        </ListItem>
      </List>
      <Clock hoursVariant={open ? "h3" : "h5"} />
    </StyledMuiDrawer>
  );
};

Drawer.propTypes = {
  open: PropTypes.bool.isRequired,
  handleDrawerClose: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      icon: PropTypes.element,
    }).isRequired
  ),
};

Drawer.defaultProps = {
  items: [],
};

const mapStateToProps = ({ user, signOut }) => ({ user, signOut });

const mapDispatchToProps = {
  dispatchSignOut,
  dispatchClearSignOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
