import React from "react";
import { CalendarIcon, DatePicker } from "@mui/x-date-pickers";
import PropTypes from "prop-types";

import colors from "../config/colors";

const DateField = ({ textFieldProps, width = "100%", ...rest }) => {
  return (
    <DatePicker
      slotProps={{
        textField: {
          size: "small",
          InputProps: {
            startAdornment: <CalendarIcon fontSize="inherit" sx={{ mr: 1 }} />,
          },
          sx: {
            width,
            marginBottom: 2,
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: colors.secondary,
              },
            "& .MuiInputLabel-root.Mui-focused": {
              color: colors.secondary,
            },
          },
          ...textFieldProps,
        },
      }}
      {...rest}
    />
  );
};

DateField.propTypes = {
  textFieldProps: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default DateField;
