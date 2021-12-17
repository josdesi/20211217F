import React, { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "../AppBar";
import Drawer from "../Drawer";
import DrawerContent from "../DrawerContent";
import PropTypes from "prop-types";
import Searcher from "../Searcher";
import { isEmptyObject } from "../../../utils/dataTypes";
import ArrowBack from "../../ArrowBack";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import BusinessIcon from "@mui/icons-material/Business";
import PeopleIcon from "@mui/icons-material/People";
import RedoIcon from "@mui/icons-material/Redo";
import DescriptionIcon from "@mui/icons-material/Description";
import SendIcon from "@mui/icons-material/Send";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import DataSaverOffIcon from "@mui/icons-material/DataSaverOff";

const drawerItems = [
  {
    label: "Dasboard",
    disabled: true,
    path: "/dashboard",
    icon: <DataSaverOffIcon />,
  },
  {
    label: "Job Orders",
    disabled: true,
    path: "",
    icon: <BusinessCenterIcon />,
  },
  {
    label: "Market",
    path: "/market",
    icon: <PeopleIcon />,
  },

  {
    label: "Companies",
    path: "/companies",
    icon: <BusinessIcon />,
  },
  {
    label: "S Projects",
    disabled: true,
    path: "/projects",
    icon: <SendIcon />,
  },
  {
    label: "Map",
    path: "/map",
    icon: <FmdGoodIcon />,
  },
  {
    label: "Task Tool",
    disabled: true,
    path: "/task",
    icon: <DescriptionIcon />,
  },
  {
    label: "Sendouts",
    disabled: true,
    path: "/sendouts",
    icon: <RedoIcon />,
  },
];

const NavDrawer = ({ children, appBar }) => {
  const { arrowBack = {}, searcher = {} } = appBar || {};
  const [open, setOpen] = useState(window.innerWidth >= 580);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }} onKeyDown={handleDrawerClose}>
      <CssBaseline />
      <AppBar open={open}>
        {!isEmptyObject(arrowBack) && arrowBack?.show && (
          <ArrowBack to={arrowBack.to} label={arrowBack.label} />
        )}

        {!isEmptyObject(searcher) && searcher?.show && <Searcher searcher={searcher}/>}
      </AppBar>
      <Drawer
        open={open}
        handleDrawerClose={open ? handleDrawerClose : handleDrawerOpen}
        items={drawerItems}
      />
      <DrawerContent>{children}</DrawerContent>
    </Box>
  );
};

NavDrawer.propTypes = {
  appBar: PropTypes.shape({
    arrowBack: PropTypes.shape({
      show: PropTypes.bool,
      to: PropTypes.string.isRequired,
      label: PropTypes.string,
    }),
    searcher: PropTypes.shape({
      show: PropTypes.bool,
      disableIndustry: PropTypes.bool,
    }),
  }),
};

NavDrawer.defaultProps = {
  appBar: {
    arrowBack: {
      show: false,
    },
    searcher: {
      show: false,
      disableIndustry: false,
    },
  },
};

export default NavDrawer;
