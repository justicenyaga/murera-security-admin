import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

import App from "./App";

import AccountPage from "./pages/AccountPage";
import AdminsPage from "./pages/AdminsPage";
import CasesPage from "./pages/CasesPage";
import ChangeEmailPage from "./pages/ChangeEmailPage";
import ChangePhonePage from "./pages/ChangePhonePage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import EditOfficerPage from "./pages/EditOfficerPage";
import ErrorPage from "./pages/ErrorPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import LoginPage from "./pages/LoginPage";
import OfficersPage from "./pages/OfficersPage";
import StationsPage from "./pages/StationsPage";
import ProfilePage from "./pages/ProfilePage";
import PasswordResetPage from "./pages/PasswordResetPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <CasesPage /> },
      { path: "/admins", element: <AdminsPage /> },
      { path: "/officers", element: <OfficersPage /> },
      { path: "/officers/:id", element: <EditOfficerPage /> },
      { path: "/stations", element: <StationsPage /> },
    ],
  },
  {
    path: "/account",
    element: <AccountPage />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <ProfilePage /> },
      { path: "/account/change-email", element: <ChangeEmailPage /> },
      { path: "/account/change-phone", element: <ChangePhonePage /> },
      { path: "/account/change-password", element: <ChangePasswordPage /> },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/password-reset",
    element: <PasswordResetPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
