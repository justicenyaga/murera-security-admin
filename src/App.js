import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import {
  AccountBalance,
  AdminPanelSettings,
  Folder,
  LocalPolice,
} from "@mui/icons-material";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const menuItems = [
  {
    id: 1,
    label: "Cases",
    route: "/cases",
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
  const userInfo = { isSuperAdmin: true };

  const [selectedMenu, setSelectedMenu] = useState(1);

  const handleMenuItemSelect = (item) => {
    setSelectedMenu(item.id);
    navigate(item.route);
  };

  return (
    <div>
      <Navbar />
      <main className="py-3">
        <Container sx={{ display: "flex", flexDirection: "row" }}>
          {userInfo.isSuperAdmin && (
            <Sidebar
              menuItems={menuItems}
              selectedItem={selectedMenu}
              selectItemHandler={handleMenuItemSelect}
            />
          )}
        </Container>
      </main>
    </div>
  );
}

export default App;
