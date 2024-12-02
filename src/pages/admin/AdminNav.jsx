import React from "react";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { BsFileEarmarkPostFill } from "react-icons/bs";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./AdminNav.css";

function AdminNav() {
  return (
    <div className="app-container">
      <main className="main-content1">
        <header className="header-adminnav">
          <div className="logo">
            <img
              src="https://via.placeholder.com/40"
              alt="Logo"
              className="logo-picture"
            />
            <h1>BARK</h1>
          </div>

          <div className="profile-and-search">
            <input
              type="text"
              placeholder="Search for anything..."
              className="search-bar"
              aria-label="Search"
            />
            <div className="profile">
              <div className="profile-info">
                <span className="username">Anima Agrawal</span>
              </div>
              <img
                src="https://via.placeholder.com/40"
                alt="Profile picture of Anima Agrawal"
                className="profile-picture"
              />
            </div>
          </div>
        </header>

        <div className="side-nav">
          <ul className="side-nav-list">
            <li>
              <Link to="/dashboard"> 
                <TbLayoutDashboardFilled /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/user-management"> 
                <FaUser /> User Management
              </Link>
            </li>
            <li>
              <Link to="/post-management"> 
                <BsFileEarmarkPostFill /> Post Management
              </Link>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default AdminNav;
