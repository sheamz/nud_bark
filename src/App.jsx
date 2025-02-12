import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
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
import Protected from "./pages/routes/protected.jsx";
import { jwtDecode } from "jwt-decode";
import { Cookies } from "react-cookie";
import "./App.css";
import MyPost from "./pages/user/MyPost/myPost.jsx";

let cookie = new Cookies();

function AppRoutes() {
  const navigate = useNavigate();
  let token = cookie.get("atk");

  useEffect(() => {
    if (token) {
      let decoded = jwtDecode(token);
      if (decoded.rol === "admin") {
        navigate("/dashboard");
      }
      if (decoded.rol === "user") {
        navigate("/home");
      }
    } else {
      navigate("/");
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<Protected />}>
        {/* user */}
        <Route path="/home" element={<Home />} />
        <Route path="/create-topic" element={<CreateTopic />} />
        <Route path="/your-contri" element={<YourContri />} />
        <Route path="/your-comments" element={<YourComments />} />
        <Route path="/browse" element={<ALT />} />
        <Route path="/user-profile" element={<UProfile />} />
        <Route path="/browse/post/*" element={<ConversationPage />} />
        <Route path="/myposts" element={<MyPost />} />
        {/* admin */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/post-management" element={<PostManagement />} />
      </Route>
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
