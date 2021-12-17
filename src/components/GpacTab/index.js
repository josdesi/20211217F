import React from "react";
import Tab from "@mui/material/Tab";
import { styled } from "@mui/material/styles";
import { withStyles } from "@mui/styles";

const CustomTab = withStyles((theme) => ({
  textTransform: "none",
  root: {
    background: theme.palette.primary.main,
    "&:hover": {
      background: "#34343C",
      color: theme.palette.text.primary,
    },

    "&$selected": {
      color: "theme.palette.text.primary",
      background: "#34343C",
    },
  },
  selected: {},
}))((props) => <Tab {...props} />);

const StyledTab = styled(CustomTab)(({ theme }) => ({
  textTransform: "none",
  color: theme.palette.text.primary,
  background: theme.palette.primary.main,
}));

export default StyledTab;
