import React from "react";
import { LoadingButton } from "@mui/lab";
import { useFormikContext } from "formik";
import PropTypes from "prop-types";
import colors from "../../config/colors";

const SubmitButton = ({ title, ...rest }) => {
  const { handleSubmit } = useFormikContext();

  return (
    <LoadingButton
      variant="contained"
      size="small"
      onClick={handleSubmit}
      sx={{
        bgcolor: colors.primary,
        fontSize: 16,
        fontWeight: 600,
        marginBottom: 2,
        paddingX: 4,
        textTransform: "none",
        "&:hover": {
          bgcolor: colors.primary,
          transform: "scale(1.05)",
        },
      }}
      {...rest}
    >
      {title}
    </LoadingButton>
  );
};

SubmitButton.propTypes = {
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  title: PropTypes.string,
};

export default SubmitButton;
