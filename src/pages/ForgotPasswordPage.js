import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Card, Typography } from "@mui/material";
import { MailOutline } from "@mui/icons-material";
import * as Yup from "yup";

import Logo from "../components/Logo";
import { Form, FormField, SubmitButton } from "../components/form";

import passwordResetApi from "../api/passwordReset";
import useApi from "../hooks/useApi";
import useAuth from "../hooks/useAuth";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const requestResetApi = useApi(passwordResetApi.requestReset);
  const { user } = useAuth();

  useEffect(() => {
    user?._id && navigate("/");
  }, []);

  const handleSubmit = async ({ email }) => {
    const { ok, data } = await requestResetApi.request(email);
    if (ok) navigate(`/password-reset?email=${data.email}`);
    else alert(data);
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
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Logo />
            <Typography sx={{ fontSize: 20, fontWeight: 600, marginBottom: 2 }}>
              Forgot Password
            </Typography>
            <FormField
              name="email"
              Icon={MailOutline}
              label="Email"
              placeholder="Enter email"
              required
            />
            <Typography
              component={Link}
              to="/login"
              variant="body2"
              sx={{
                color: "primary",
                textDecoration: "none",
                textAlign: "right",
                display: "block",
                ml: "auto",
                marginTop: 1,
                marginBottom: 2,
              }}
            >
              Remembered your password?
            </Typography>
            <SubmitButton title="Send OTP" loading={requestResetApi.loading} />
          </Form>
        </Card>
      </Box>
    </div>
  );
};

export default ForgotPasswordPage;
