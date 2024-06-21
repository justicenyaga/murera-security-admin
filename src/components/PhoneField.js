import React from "react";
import { MuiTelInput } from "mui-tel-input";
import PropTypes from "prop-types";

import colors from "../config/colors";

const PhoneField = ({ width = "100%", ...rest }) => {
  return (
    <MuiTelInput
      defaultCountry="KE"
      size="small"
      sx={{
        width,
        marginBottom: 2,
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
          {
            borderColor: colors.secondary,
          },
        "& .MuiInputLabel-root.Mui-focused": {
          color: colors.secondary,
        },
      }}
      {...rest}
    />
  );
};

PhoneField.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default PhoneField;
