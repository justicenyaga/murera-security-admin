import React from "react";
import { Typography } from "@mui/material";
import { Lock, LockOutlined } from "@mui/icons-material";
import YupPassword from "yup-password";
import _ from "lodash";
import * as Yup from "yup";

import { Form, FormField, SubmitButton } from "../components/form";

import usersApi from "../api/users";
import useApi from "../hooks/useApi";

YupPassword(Yup);

const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required()
    .min(8)
    .minLowercase(1, "Password must contain at least one lowercase character")
    .minUppercase(1, "Password must contain at least one uppercase character")
    .minNumbers(1, "Password must contain at least one number")
    .minSymbols(1, "Password must contain at least one special character")
    .label("New Password"),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .label("Confirm New Password"),
  currentPassword: Yup.string().required().label("Current Password"),
});

const ChangePasswordPage = () => {
  const changePasswordApi = useApi(usersApi.changePassword);

  const handleSubmit = async (formData, { resetForm }) => {
    const passwords = _.pick(formData, ["newPassword", "currentPassword"]);

    const { data, ok } = await changePasswordApi.request(passwords);
    if (!ok) return alert(data);

    alert("Password changed successfully");
    resetForm();
  };

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        width: "50%",
      }}
    >
      <Typography
        variant="h6"
        textAlign="center"
        width="200px"
        marginY={3}
        sx={{ fontSize: 24, fontWeight: 600, whiteSpace: "nowrap" }}
      >
        Change Password
      </Typography>

      <Form
        initialValues={{
          newPassword: "",
          confirmPassword: "",
          currentPassword: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormField
          name="newPassword"
          Icon={Lock}
          label="New Password"
          placeholder="Enter new password"
          type="password"
          required
        />
        <FormField
          name="confirmPassword"
          Icon={Lock}
          label="Confirm Password"
          placeholder="Confirm password"
          type="password"
          required
        />
        <FormField
          name="currentPassword"
          Icon={LockOutlined}
          label="Current Password"
          placeholder="Enter current password"
          type="password"
          required
        />
        <SubmitButton
          title="Change Password"
          loading={changePasswordApi.loading}
          fullWidth
        />
      </Form>
    </div>
  );
};

export default ChangePasswordPage;
