import React from "react";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { BsFileEarmarkPostFill } from "react-icons/bs";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./AdminNav.css";
import Logo from "../../assets/logo.png";

function AdminNav(props) {
  return (
    <>
      <header className="header-adminnav">
        <div className="logo">
          <img src={Logo} alt="Logo" className="logo-picture" />
          <h1>BARK</h1>
        </div>

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
      </header>

      <div className="side-nav  sticky-top">
        <ul className="side-nav-list">
          <li>
            <Link
              to="/dashboard"
              className={props.active == "/dashboard" ? "active" : ""}
            >
              <TbLayoutDashboardFilled /> Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/user-management"
              className={props.active == "/user-management" ? "active" : ""}
            >
              <FaUser /> User Management
            </Link>
          </li>
          <li>
            <Link
              to="/post-management"
              className={props.active == "/post-management" ? "active" : ""}
            >
              <BsFileEarmarkPostFill /> Post Management
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default AdminNav;
