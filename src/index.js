import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

import AccountPage from "./pages/AccountPage";
import App from "./App";
import CasesPage from "./pages/CasesPage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import StationsPage from "./pages/StationsPage";
import OfficersPage from "./pages/OfficersPage";
import AdminsPage from "./pages/AdminsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <CasesPage /> },
      { path: "/account", element: <AccountPage /> },
      { path: "/admins", element: <AdminsPage /> },
      { path: "/officers", element: <OfficersPage /> },
      { path: "/stations", element: <StationsPage /> },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
