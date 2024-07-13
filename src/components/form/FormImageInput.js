import React from "react";
import { useFormikContext } from "formik";
import PropTypes from "prop-types";

import ImageInput from "../ImageInput";

const FormImageInput = ({ name, ...rest }) => {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();

  const error = touched[name] && errors[name] ? true : false;

  return (
    <ImageInput
      onBlur={() => setFieldTouched(name)}
      onChangeImage={(value) => setFieldValue(name, value)}
      image={values[name]}
      error={error}
      helperText={error ? errors[name] : null}
      {...rest}
    />
  );
};

FormImageInput.propTypes = {
  name: PropTypes.string.isRequired,
};

export default FormImageInput;
