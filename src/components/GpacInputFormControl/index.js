import React from "react";
import { makeStyles } from "@mui/styles";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import GpacInput from "../GpacInput";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { generateRandomId, isEmptyString } from "../../utils";
import PropTypes from "prop-types";

const randomKey = generateRandomId();

const useStyles = makeStyles(() => ({
  error: {
    color: red[500],
  },
}));

const getInputProps = (input) => {
  const {
    id = `gpac-input-${randomKey}`,
    name = `gpac-input-${randomKey}`,
    type = "text",
    placeholder = "",
    defaultValue = "",
    onChange = null,
    disabled = false,
  } = input || {};

  const props = {
    id,
    name,
    type,
    placeholder,
    disabled,
    defaultValue,
    onChange,
  };

  if (input.hasOwnProperty("value")) {
    props.value = input.value;
  }

  return props;
};

const GpacInputFormControl = ({ inputLabel, input, error }) => {
  const { id = `gpac-input-${randomKey}` } = input || {};
  const classes = useStyles();

  return (
    <FormControl fullWidth variant="standard">
      {!isEmptyString(inputLabel) && (
        <InputLabel shrink htmlFor={id}>
          {inputLabel}
        </InputLabel>
      )}

      <GpacInput {...getInputProps(input)} />

      {!isEmptyString(error) && (
        <FormHelperText>
          <Typography
            variant="caption"
            display="block"
            className={classes.error}
          >
            {error}
          </Typography>
        </FormHelperText>
      )}
    </FormControl>
  );
};

GpacInputFormControl.propTypes = {
  inputLabel: PropTypes.string,
  input: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    onChange: PropTypes.func,
  }),
};

GpacInputFormControl.defaultProps = {
  inputLabel: "",
  input: {},
};

export default GpacInputFormControl;
