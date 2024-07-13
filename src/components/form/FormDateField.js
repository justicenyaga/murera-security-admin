import React from "react";
import { useFormikContext } from "formik";
import PropTypes from "prop-types";

import DateField from "../DateField";

const FormDateField = ({ name, textFieldProps, ...rest }) => {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();

  const error = touched[name] && errors[name] ? true : false;

  return (
    <DateField
      value={values[name]}
      onChange={(newValue) => setFieldValue(name, newValue)}
      textFieldProps={{
        error,
        onBlur: () => setFieldTouched(name),
        helperText: error ? errors[name] : null,
        ...textFieldProps,
      }}
      {...rest}
    />
  );
};

FormDateField.propTypes = {
  name: PropTypes.string.isRequired,
  textFieldProps: PropTypes.object,
};

export default FormDateField;
