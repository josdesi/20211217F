import React from "react";
import Grid from "@mui/material/Grid";
import FormGridItem from "../../FormGridItem";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import GpacInput from "../../../../../components/GpacInput";
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
  gridContainer: {
    marginTop: 25,
    padding: 15,
    background: "#34343C",
  },

  title: {
    fontWeight: 600,
  },
}));

const Notes = ({ value, handleChange }) => {
  const classes = useStyles();

  return (
    <Grid className={classes.gridContainer} container spacing={0}>
      <FormGridItem item xs={12} md={12}>
        <Typography variant="subtitle" className={classes.title}>
          Notes
        </Typography>

        <GpacInput
          id="notes"
          name="notes"
          fullWidth
          placeholder="There' no notes. Do you want to add  new one?"
          multiline
          defaultValue={value}
          onChange={handleChange}
          rows={2}
          inputstyle={{
            backgroundColor: "transparent",
          }}
        />
      </FormGridItem>
    </Grid>
  );
};

Notes.propTypes = {
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
};

Notes.defaultProps = {};

export default Notes;
