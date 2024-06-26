import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, Card, Typography } from "@mui/material";
import { Lock } from "@mui/icons-material";
import YupPassword from "yup-password";
import * as Yup from "yup";

import Logo from "../components/Logo";
import { Form, FormField, SubmitButton } from "../components/form";

import passwordResetApi from "../api/passwordReset";
import useApi from "../hooks/useApi";
import authApi from "../api/auth";
import useAuth from "../hooks/useAuth";

YupPassword(Yup);

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required()
    .min(8)
    .minLowercase(1, "Password must contain at least one lowercase character")
    .minUppercase(1, "Password must contain at least one uppercase character")
    .minNumbers(1, "Password must contain at least one number")
    .minSymbols(1, "Password must contain at least one special character")
    .label("New Password"),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .label("Confirm Password"),
});

const PasswordResetPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const resetPasswordApi = useApi(passwordResetApi.resetPassword);
  const loginApi = useApi(authApi.login);
  const { logIn } = useAuth();

  useEffect(() => {
    !email && navigate("/login");
  }, []);

  const handleSubmit = async ({ password }) => {
    const { ok, data } = await resetPasswordApi.request(email, password);
    if (!ok) return alert(data);

    alert("Password reset successfully");
    const { data: authToken } = await loginApi.request({ email, password });
    await logIn(authToken);
    navigate("/");
  };

  return (
    <div>
      <div className="login-background" />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <Card
          sx={{
            minHeight: 300,
            mt: 10,
            padding: 2,
            width: 350,
            boxShadow: 10,
            borderRadius: 3,
          }}
        >
          <Form
            initialValues={{ password: "", confirmPassword: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Logo />
            <Typography sx={{ fontSize: 20, fontWeight: 600, marginBottom: 2 }}>
              Reset Password
            </Typography>
            <FormField
              name="password"
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
            <SubmitButton
              title="Reset Password"
              loading={resetPasswordApi.loading || loginApi.loading}
            />
          </Form>
        </Card>
      </Box>
    </div>
  );
};

export default PasswordResetPage;
