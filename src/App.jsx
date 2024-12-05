import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login-signin/Login";
import Home from "./pages/user/HomePage/Home";
import PostManagement from "./pages/admin/PostMngmt/PostMngmt.jsx";
import ConversationPage from "./pages/user/ConversationPage/ConversationPage.jsx";
import UserManagement from "./pages/admin/UserMngmt/UserManagement.jsx";
import Dashboard from "./pages/admin/AdminDash/Dashboard.jsx";
import Register from "./pages/login-signin/Register.jsx";
import CreateTopic from "./pages/user/Rte/CreateTopic.jsx";
import YourContri from "./pages/user/YourContri/YourContri.jsx"
import YourComments from "./pages/user/YourContri/YourComments.jsx";
import ALT from "./pages/user/AllLatestTop/ALT.jsx";
import UProfile from "./pages/user/UserProfile/UProfile.jsx";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/post-management" element={<PostManagement />} />
          <Route path="/conversation-page" element={<ConversationPage />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-topic" element={<CreateTopic />} />
          <Route path="/your-contri" element={<YourContri />} />
          <Route path="/your-comments" element={<YourComments />} />
          <Route path="/alt" element={<ALT />} />
          <Route path="/user-profile" element={<UProfile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
