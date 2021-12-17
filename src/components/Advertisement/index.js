import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";

const StyledBox = styled(Box)(() => ({
  alignItems: "center",
  height: "50vh",
  display: "flex",
  justifyContent: "center",
}));

const Advertisement = ({ text }) => {
  return (
    <StyledBox>
      <Typography variant="h6" component="div">
        {text}
      </Typography>
    </StyledBox>
  );
};

Advertisement.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Advertisement;
