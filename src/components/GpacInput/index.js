import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import PropTypes from "prop-types";

const GpacInput = styled(InputBase)(({ theme, inputstyle }) => ({
  width: "100%",
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    // border: "1px solid #ced4da",
    fontSize: 16,
    width: "100%",
    padding: "10px 12px",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#20232B",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:hover": {
      borderRadius: 4,
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
    "&:focus": {
      boxShadow: "red",
      borderColor: "green",
    },
    ...inputstyle,
  },
}));

GpacInput.propTypes = {
  inputstyle: PropTypes.object,
};

GpacInput.defaultProps = {
  inputstyle: {},
};

export default GpacInput;
