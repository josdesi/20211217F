import React from "react";
import Box from "@mui/material/Box";
import DrawerHeader from "./DrawerHeader";

const DrawerContent = ({ children }) => {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />
      {children}
    </Box>
  );
};

export default DrawerContent;
