import React from "react";
import { Formik } from "formik";
import PropTypes from "prop-types";

const Form = ({ children, initialValues, onSubmit, validationSchema }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => (
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {children}
        </div>
      )}
    </Formik>
  );
};

Form.propTypes = {
  children: PropTypes.node,
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  validationSchema: PropTypes.object,
};

export default Form;
