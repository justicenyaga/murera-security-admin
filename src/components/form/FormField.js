import React from "react";
import { useFormikContext } from "formik";
import PropTypes from "prop-types";

import TextField from "../TextField";

const FormField = ({ name, onChange, ...rest }) => {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();

  const error = touched[name] && errors[name] ? true : false;

  const onChangeHandler = (e) => {
    setFieldValue(name, e.target.value);
    if (onChange) onChange(e.target.value);
  };

  return (
    <TextField
      onBlur={() => setFieldTouched(name)}
      onChange={onChangeHandler}
      error={error}
      helperText={error ? errors[name] : null}
      value={values[name]}
      {...rest}
    />
  );
};

FormField.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

export default FormField;
