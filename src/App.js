import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box, Container } from "@mui/material";
import {
  AccountBalance,
  AdminPanelSettings,
  Folder,
  LocalPolice,
} from "@mui/icons-material";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import useAuth from "./hooks/useAuth";

const menuItems = [
  {
    id: 1,
    label: "Cases",
    route: "/",
    icon: Folder,
  },
  {
    id: 2,
    label: "Stations",
    route: "/stations",
    icon: AccountBalance,
  },
  {
    id: 3,
    label: "Officers",
    route: "/officers",
    icon: LocalPolice,
  },
  {
    id: 4,
    label: "Admins",
    route: "/admins",
    icon: AdminPanelSettings,
  },
];

function App() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const parentRoute = window.location.pathname.split("/")[1];

  const [selectedMenu, setSelectedMenu] = useState(1);

  const updateSelectedItem = () => {
    const item = menuItems.find((item) => item.route === `/${parentRoute}`);
    setSelectedMenu(item?.id);
  };

  useEffect(() => {
    !user?._id && navigate("/login");
    !user?.isSuperAdmin && menuItems.splice(3);
    updateSelectedItem();
  }, [parentRoute]);

  const handleMenuItemSelect = (item) => {
    setSelectedMenu(item.id);
    navigate(item.route);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Navbar />
      <main className="py-3">
        <Container sx={{ display: "flex", flexDirection: "row" }}>
          <Sidebar
            menuItems={menuItems}
            selectedItem={selectedMenu}
            selectItemHandler={handleMenuItemSelect}
          />

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
    </LocalizationProvider>
  );
}

export default App;
