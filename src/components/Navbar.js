import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Stack,
  Button,
  Container,
} from "@mui/material";
import { Person } from "@mui/icons-material";

import colors from "../config/colors";

function Navbar() {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ bgcolor: colors.primary }}>
      <Toolbar sx={{ px: 0 }}>
        <Container>
          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <IconButton component={Link} to="/">
              <img
                src="/logo-1.png"
                alt="logo"
                style={{ borderRadius: "50%", height: "30px", width: "30px" }}
              />
            </IconButton>

            <Button
              sx={{ color: colors.white, fontSize: 16, fontWeight: 550 }}
              onClick={() => navigate("/account")}
              startIcon={<Person />}
            >
              ACCOUNT
            </Button>
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
