import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Card, Typography } from "@mui/material";
import { LockOutlined, MailOutline } from "@mui/icons-material";
import * as Yup from "yup";

import Logo from "../components/Logo";
import { Form, FormField, SubmitButton } from "../components/form";

import auth from "../api/auth";
import useApi from "../hooks/useApi";
import useAuth from "../hooks/useAuth";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().label("Password"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const loginApi = useApi(auth.login);
  const { user, logIn } = useAuth();

  useEffect(() => {
    user?._id && navigate("/");
  }, []);

  const handleSubmit = async (credentials) => {
    const { data, ok } = await loginApi.request(credentials);
    if (ok) {
      await logIn(data);
      navigate("/");
    } else alert(data);
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
            <FormField
              name="email"
              Icon={MailOutline}
              label="Email"
              placeholder="Enter email"
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
            <Typography
              component={Link}
              to="/forgot-password"
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
              Forgot password?
            </Typography>

            <SubmitButton title="Sign In" loading={loginApi.loading} />
          </Form>
        </Card>
      </Box>
    </div>
  );
};

export default LoginPage;
