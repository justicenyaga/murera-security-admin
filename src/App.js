import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
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

  const currentRoute = window.location.pathname;
  const showSidebar = user?.isSuperAdmin && currentRoute !== "/account";

  const [selectedMenu, setSelectedMenu] = useState(1);

  const updateSelectedItem = () => {
    const item = menuItems.find((item) => item.route === currentRoute);
    setSelectedMenu(item?.id);
  };

  useEffect(() => {
    !user?._id && navigate("/login");
    updateSelectedItem();
  }, [currentRoute]);

  const handleMenuItemSelect = (item) => {
    setSelectedMenu(item.id);
    navigate(item.route);
  };

  return (
    <div>
      <Navbar />
      <main className="py-3">
        <Container sx={{ display: "flex", flexDirection: "row" }}>
          {showSidebar && (
            <Sidebar
              menuItems={menuItems}
              selectedItem={selectedMenu}
              selectItemHandler={handleMenuItemSelect}
            />
          )}

          <Box sx={{ padding: 2, width: "100%" }}>
            <Outlet />
          </Box>
        </Container>
      </main>
    </div>
  );
}

export default App;
