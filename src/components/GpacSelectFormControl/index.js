import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import GpacInput from "../GpacInput";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { generateRandomId, isEmptyString } from "../../utils";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PropTypes from "prop-types";
import GpacSelect from "../GpacSelect";
import MenuItem from "@mui/material/MenuItem";

const randomKey = generateRandomId();
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  border: 100,
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: "auto",
      border: 100,
    },
  },
};

const useStyles = makeStyles((theme) => ({
  icon: {
    fill:
      (theme.isDark ? theme.palette.action.hover : "#7F8E9D") + " !important",
  },
  error: {
    color: red[500],
  },
  placeholder: {
    color: theme.palette.text.disabled,
  },
}));

const Select = ({ inputLabel, input, error }) => {
  const {
    id = `gpac-input-${randomKey}`,
    name = `gpac-input-${randomKey}`,
    placeholder = "",
    items = [],
    defaultValue = [],
    onChange = null,
    style = {},
  } = input;
  const classes = useStyles();
  const [selected, setSelected] = useState(defaultValue);

  const handleChange = (event) => {
    const { value } = event.target;
    onChange(event);
    setSelected(value);
  };

  return (
    <FormControl fullWidth variant="standard">
      {!isEmptyString(inputLabel) && (
        <InputLabel shrink htmlFor={id}>
          {inputLabel}
        </InputLabel>
      )}

      <GpacSelect
        id={id}
        name={name}
        displayEmpty
        labelId="demo-multiple-checkbox-label"
        value={selected}
        placeholder="placeholder"
        onChange={handleChange}
        input={<GpacInput inputstyle={style} />}
        IconComponent={KeyboardArrowDownIcon}
        inputProps={{
          "aria-label": "Without label",
          classes: {
            icon: classes.icon,
          },
        }}
        MenuProps={MenuProps}
      >
        <MenuItem disabled value="">
          <span className={classes.placeholder}>{placeholder}</span>
        </MenuItem>

        {items.map(({ label, value }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </GpacSelect>
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
Select.propTypes = {
  inputLabel: PropTypes.string,
  renderValue: PropTypes.bool,
  input: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    style: PropTypes.object,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.any,
      })
    ),
  }),
};
Select.defaultProps = {
  inputLabel: "",
  renderValue: true,
  input: {},
};

export default Select;
