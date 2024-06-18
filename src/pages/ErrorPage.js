import React from "react";
import { useRouteError, useNavigate } from "react-router-dom";
import { Container, Box, Typography, Button } from "@mui/material";
import colors from "../config/colors";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        textAlign="center"
      >
        <Typography variant="h2" color="error" gutterBottom>
          Oops!
        </Typography>
        <Typography variant="h5" color="textSecondary" gutterBottom>
          Sorry, an unexpected error has occurred.
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {error.statusText || error.message}
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/")}
          sx={{
            bgcolor: colors.primary,
            mt: 2,
            "&:hover": { bgcolor: colors.primary, transform: "scale(1.02)" },
          }}
        >
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default ErrorPage;
