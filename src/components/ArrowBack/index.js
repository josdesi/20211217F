import React from "react";
import Typography from "@mui/material/Typography";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  textTransform: "none",
}));

const StyledArrowBackIcon = styled(ArrowBackIosNewIcon)(({ theme }) => ({
  color: theme.palette.action.hover,
}));

const ArrowBack = ({ to, label }) => {
  return (
    <StyledButton to={to} component={Link}>
      <StyledArrowBackIcon />
      <Typography variant="body1" noWrap>
        {label}
      </Typography>
    </StyledButton>
  );
};

ArrowBack.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string,
};

ArrowBack.defaultProps = {
  to: "",
  label: "Back",
};

export default ArrowBack;
