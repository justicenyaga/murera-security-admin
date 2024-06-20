import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Box, Button, Container, ListItem } from "@mui/material";
import {
  LockReset,
  MailOutlined,
  Person,
  PhoneOutlined,
} from "@mui/icons-material";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import colors from "../config/colors";
import useAuth from "../hooks/useAuth";

const menuItems = [
  {
    id: 1,
    label: "Profile",
    route: "/account",
    icon: Person,
  },
  {
    id: 2,
    label: "Change Email",
    route: "/account/change-email",
    icon: MailOutlined,
  },
  {
    id: 3,
    label: "Change Phone",
    route: "/account/change-phone",
    icon: PhoneOutlined,
  },
  {
    id: 4,
    label: "Change Password",
    route: "/account/change-password",
    icon: LockReset,
  },
];

const AccountPage = () => {
  const navigate = useNavigate();
  const route = window.location.pathname;
  const { user, logOut } = useAuth();

  const [selectedMenu, setSelectedMenu] = useState(1);

  const updateSelectedItem = () => {
    const item = menuItems.find((item) => item.route === route);
    setSelectedMenu(item?.id);
  };

  useEffect(() => {
    !user?._id && navigate("/login");
    updateSelectedItem();
  }, [route]);

  const handleMenuItemSelect = (item) => {
    setSelectedMenu(item.id);
    navigate(item.route);
  };

  const handleLogout = () => {
    logOut();
    navigate("/login");
  };

  return (
    <div>
      <Navbar />
      <main className="py-3">
        <Container sx={{ display: "flex", flexDirection: "row" }}>
          <Sidebar
            menuItems={menuItems}
            selectedItem={selectedMenu}
            selectItemHandler={handleMenuItemSelect}
          >
            <ListItem sx={{ marginTop: 3 }}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  color: colors.white,
                  bgcolor: colors.red,
                  borderRadius: "20px",
                  "&:hover": {
                    bgcolor: colors.red,
                    transform: "scale(1.02)",
                  },
                }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </ListItem>
          </Sidebar>

          <Box
            width="100%"
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Outlet />
          </Box>
        </Container>
      </main>
    </div>
  );
};

export default AccountPage;
