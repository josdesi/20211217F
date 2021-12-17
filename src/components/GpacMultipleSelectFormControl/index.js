import React, { useState, useEffect } from "react";
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
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

const randomKey = generateRandomId();
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  border: 100,
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
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
}));

const MultipleSelect = ({ inputLabel, renderValue, input, error }) => {
  const {
    id = `gpac-input-${randomKey}`,
    name = `gpac-input-${randomKey}`,
    placeholder = "",
    items = [],
    defaultValue = [],
    onChange = null,
    style = {},
    disabled = false,
  } = input;
  const classes = useStyles();
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    setSelected(defaultValue);
  }, []);

  const handleChange = (event) => {
    const { target } = event;
    const { value: entryValue } = target;
    const value = isEmptyString(entryValue)
      ? entryValue
      : entryValue.split(",");

    setSelected(value);
    onChange(name, value);
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
        disabled={disabled}
        IconComponent={KeyboardArrowDownIcon}
        inputProps={{
          "aria-label": "Without label",
          classes: {
            icon: classes.icon,
          },
        }}
        labelId="demo-multiple-checkbox-label"
        multiple
        renderValue={(selected) => {
          if (!renderValue || selected.length === 0) return placeholder;

          return selected.join(", ");
        }}
        displayEmpty
        value={selected}
        onChange={handleChange}
        input={<GpacInput inputstyle={style} />}
        MenuProps={MenuProps}
      >
        {items.map(({ label, value }) => (
          <MenuItem key={label} value={value}>
            <Checkbox checked={selected.indexOf(value) > -1} />
            <ListItemText primary={label} />
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
MultipleSelect.propTypes = {
  inputLabel: PropTypes.string,
  renderValue: PropTypes.bool,
  input: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.array,
    onChange: PropTypes.func,
    style: PropTypes.object,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.any,
      })
    ),
  }),
};
MultipleSelect.defaultProps = {
  inputLabel: "",
  renderValue: true,
  input: {},
};

export default MultipleSelect;
