import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login-signin/Login";
import Home from "./pages/user/Home";
import PostManagement from "./pages/admin/PostMngmt/PostMngmt.jsx";
import UserManagement from "./pages/admin/UserMngmt/UserManagement.jsx";
import ConversationPage from "./pages/user/ConversationPage/ConversationPage.jsx"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/post-management" element={<PostManagement />} />
          <Route path="/conversation-page" element={<ConversationPage />} />
          <Route path="/user-management" element={<UserManagement />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
