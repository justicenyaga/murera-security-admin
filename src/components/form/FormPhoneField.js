import React from "react";
import { useFormikContext } from "formik";
import PropTypes from "prop-types";

import PhoneField from "../PhoneField";

const FormPhoneField = ({ name, ...rest }) => {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();

  const error = touched[name] && errors[name] ? true : false;

  return (
    <PhoneField
      onBlur={() => setFieldTouched(name)}
      onChange={(value) => setFieldValue(name, value)}
      value={values[name]}
      error={error}
      helperText={error ? errors[name] : null}
      {...rest}
    />
  );
};

FormPhoneField.propTypes = {
  name: PropTypes.string.isRequired,
};

export default FormPhoneField;
