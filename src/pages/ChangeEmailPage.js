import React from "react";
import { Typography } from "@mui/material";
import { LockOutlined, MailOutline } from "@mui/icons-material";
import * as Yup from "yup";

import { Form, FormField, SubmitButton } from "../components/form";

import usersApi from "../api/users";
import useApi from "../hooks/useApi";
import useAuth from "../hooks/useAuth";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("New Email"),
  password: Yup.string().required().label("Password"),
});

const ChangeEmailPage = () => {
  const changeEmailApi = useApi(usersApi.changeEmail);
  const { refreshUser } = useAuth();

  const handleSubmit = async (emailPassword, { resetForm }) => {
    const { data, ok } = await changeEmailApi.request(emailPassword);
    if (!ok) return alert(data);

    alert("Email changed successfully");
    resetForm();
    refreshUser();
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
        sx={{ fontSize: 24, fontWeight: 600 }}
      >
        Change Email
      </Typography>

      <Form
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormField
          name="email"
          Icon={MailOutline}
          label="New Email"
          placeholder="Enter new email"
          required
        />
        <FormField
          name="password"
          Icon={LockOutlined}
          label="Password"
          placeholder="Enter password"
          type="password"
          required
        />
        <SubmitButton
          title="Change Email"
          loading={changeEmailApi.loading}
          fullWidth
        />
      </Form>
    </div>
  );
};

export default ChangeEmailPage;
