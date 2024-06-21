import React from "react";
import { Typography } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import * as Yup from "yup";
import "yup-phone-lite";

import {
  Form,
  FormField,
  FormPhoneField,
  SubmitButton,
} from "../components/form";

import usersApi from "../api/users";
import useApi from "../hooks/useApi";
import useAuth from "../hooks/useAuth";

const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .phone("KE", "New Phone Number must be a valid phone number")
    .required()
    .label("New Phone Number"),
  password: Yup.string().required().label("Current Password"),
});

const ChangePhonePage = () => {
  const { refreshUser } = useAuth();
  const changePhoneApi = useApi(usersApi.changePhone);

  const handleSubmit = async (formData, { resetForm }) => {
    const phone = formData.phone.replaceAll(" ", "");
    const password = formData.password;

    const { data, ok } = await changePhoneApi.request({ phone, password });
    if (!ok) return alert(data);

    alert("Phone number changed successfully");
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
        Change Phone
      </Typography>

      <Form
        initialValues={{ phone: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormPhoneField
          name="phone"
          label="New Phone Number"
          placeholder="Enter new phone number"
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
          title="Change Phone"
          loading={changePhoneApi.loading}
          fullWidth
        />
      </Form>
    </div>
  );
};

export default ChangePhonePage;
