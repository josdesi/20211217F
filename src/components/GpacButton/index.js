import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)(() => ({
  textTransform: "none",
  paddingTop: 1,
  paddingBottom: 1,
}));

const GpacButton = (props) => {
  const { children, ...others } = props;

  return <StyledButton {...others}>{children}</StyledButton>;
};

export default GpacButton;
