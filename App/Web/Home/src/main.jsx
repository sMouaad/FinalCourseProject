import React from "react";
import ReactDOM from "react-dom/client";
import RequireAuth from "./RequireAuth";
import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Apps from "./Apps";
import Home from "./Home";
import ErrorPage from "./ErrorPage";
import Sidebar from "./Sidebar";
import Assistant from "./Assistant";
import HomePage from "./HomePage";
import Login from "./Login";
import ToDo from "./ToDo";
import Maps from "./Maps";
import ForgotPassword from "./ForgotPass";
import ResetPassword from "./ResetPassword";
import Dashboard from "./Dashboard";
import "./styles/index.css";
import Settings from "./Settings";
import Messages from "./Messages";
import Support from "./Support";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/maps" element={<Maps />} />
          <Route
            path="/to-do-list"
            element={
              <>
                <Sidebar />
                <ToDo />
              </>
            }
          />
          <Route path="/login/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/login/reset-password/:token"
            element={<ResetPassword />}
          />
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/home"
              element={
                <>
                  <Sidebar />
                  <Home />
                </>
              }
            />
            <Route
              path="/apps"
              element={
                <>
                  <Sidebar />
                  <Apps />
                </>
              }
            />
            <Route
              path="/assistant"
              element={
                <>
                  <Sidebar />
                  <Assistant />
                </>
              }
            />
            <Route
              path="/settings"
              element={
                <>
                  <Settings />
                </>
              }
            />
            <Route
              path="/messages"
              element={
                <>
                  <Messages />
                </>
              }
            />
            <Route
              path="/support"
              element={
                <>
                  <Support />
                </>
              }
            />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
