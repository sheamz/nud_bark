import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login-signin/Login";
import Home from "./pages/user/HomePage/Home";
import PostManagement from "./pages/admin/PostMngmt/PostMngmt.jsx";
import ConversationPage from "./pages/user/ConversationPage/ConversationPage.jsx";
import UserManagement from "./pages/admin/UserMngmt/UserManagement.jsx";
import Dashboard from "./pages/admin/AdminDash/Dashboard.jsx";
import Register from "./pages/login-signin/Register.jsx";
import CreateTopic from "./pages/user/Rte/CreateTopic.jsx";
import YourContri from "./pages/user/YourContri/YourContri.jsx";
import YourComments from "./pages/user/YourContri/YourComments.jsx";
import ALT from "./pages/user/AllLatestTop/Browse.jsx";
import UProfile from "./pages/user/UserProfile/UProfile.jsx";
import { jwtDecode } from "jwt-decode";
import { Cookies } from "react-cookie";
import "./App.css";
import MyPost from "./pages/user/MyPost/myPost.jsx";
import Logs from "./pages/admin/Logs/logs.jsx";

import "bootstrap/dist/css/bootstrap.min.css";

let cookie = new Cookies();

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = cookie.get("atk");

  if (!token) {
    return <Navigate to="/" />;
  }

  const decoded = jwtDecode(token);
  if (!allowedRoles.includes(decoded.rol)) {
    return <Navigate to="/" />;
  }

  return children;
};

const PublicRoute = ({ children }) => {
  const token = cookie.get("atk");

  if (token) {
    const decoded = jwtDecode(token);
    if (decoded.rol === "admin") {
      return <Navigate to="/dashboard" />;
    }
    if (decoded.rol === "user") {
      return <Navigate to="/home" />;
    }
  }

  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-topic"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <CreateTopic />
          </ProtectedRoute>
        }
      />
      <Route
        path="/your-contri"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <YourContri />
          </ProtectedRoute>
        }
      />
      <Route
        path="/your-comments"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <YourComments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/browse"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <ALT />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user-profile"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <UProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/browse/post/*"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <ConversationPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/myposts"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <MyPost />
          </ProtectedRoute>
        }
      />
      {/* admin */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user-management"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <UserManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/post-management"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <PostManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/logs"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Logs />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
