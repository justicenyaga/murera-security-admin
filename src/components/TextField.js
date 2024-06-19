import React, { useState } from "react";
import {
  IconButton,
  InputAdornment,
  TextField as MUITextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PropTypes from "prop-types";

import colors from "../config/colors";

const TextField = ({ type, width = "100%", Icon, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);

  const startAdornment = Icon ? (
    <Icon fontSize="inherit" sx={{ mr: 1 }} />
  ) : null;

  const endAdornment =
    type === "password" ? (
      <InputAdornment position="end">
        <IconButton
          onClick={() => setShowPassword(!showPassword)}
          variant="text"
          color="inherit"
          size="small"
          sx={{
            transform: "translateX(10px)",
          }}
          disableRipple
        >
          {showPassword ? (
            <VisibilityOff fontSize="small" />
          ) : (
            <Visibility fontSize="small" />
          )}
        </IconButton>
      </InputAdornment>
    ) : null;

  return (
    <MUITextField
      type={type === "password" ? (showPassword ? "text" : "password") : type}
      variant="outlined"
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
      InputProps={{ startAdornment, endAdornment }}
      {...rest}
    />
  );
};

TextField.propTypes = {
  type: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  Icon: PropTypes.node,
};

export default TextField;
