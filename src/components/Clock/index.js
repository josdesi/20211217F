import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { DAYS, MONTHS } from "../../constants/common";

const Clock = ({ hoursVariant }) => {
  let intervalID = null;
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    intervalID = setInterval(() => tick(), 1000);

    return () => {
      clearInterval(intervalID);
    };
  }, []);

  const tick = () => {
    setDate(new Date());
  };

  return (
    <Box textAlign="center">
      <Typography variant="caption" component="div">
        {DAYS[date.getDay()]}
      </Typography>

      <Typography variant="caption" component="div">
        {MONTHS[date.getMonth()]} {date.getDate()}th
      </Typography>

      <Typography variant={hoursVariant || "h5"} component="div">
        {date.getHours() + ":" + date.getMinutes()}
      </Typography>

      <Typography variant="caption" component="div">
        Actual time
      </Typography>
    </Box>
  );
};

Clock.propTypes = {
  hoursVariant: PropTypes.string,
};

export default Clock;
