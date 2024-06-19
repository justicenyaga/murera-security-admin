import React from "react";
import { useFormikContext } from "formik";
import PropTypes from "prop-types";

import TextField from "../TextField";

const FormField = ({ name, ...rest }) => {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();

  const error = touched[name] && errors[name] ? true : false;

  return (
    <TextField
      onBlur={() => setFieldTouched(name)}
      onChange={(e) => setFieldValue(name, e.target.value)}
      error={error}
      helperText={error ? errors[name] : null}
      value={values[name]}
      {...rest}
    />
  );
};

FormField.propTypes = {
  name: PropTypes.string.isRequired,
};

export default FormField;
