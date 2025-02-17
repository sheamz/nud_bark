import React, { useState, useEffect } from "react";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { BsFileEarmarkPostFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import "./AdminNav.css";
import Logo from "../../assets/logo.png";
import { Avatar, Divider } from "@mui/material";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Cookies } from "react-cookie";
import axios from "../../backend/axios";

let cookie = new Cookies();

function AdminNav(props) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    axios.get("/getProfile.php").then((res) => {
      setProfile(res.data);
    });
  }, []);

  let logOut = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;
    axios.get("/logOut.php").then((res) => {
      cookie.remove("atk");
      navigate("/");
    });
  };

  return (
    <>
      <header className="header-adminnav">
        <div className="logo">
          <img src={Logo} alt="Logo" className="logo-picture" />
          <h1>BARK</h1>
        </div>
        <Dropdown>
          <Dropdown.Toggle
            id="dropdown-basic"
            style={{ background: "none", border: "none", display: "flex" }}
          >
            <div className="profile">
              <div className="profile-info">
                <span className="username">{profile.uid}</span>
              </div>
              <Avatar></Avatar>
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu style={{ zIndex: "1000" }}>
            <Dropdown.Item onClick={logOut}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </header>

      <div className="side-nav  sticky-top" style={{ zIndex: "100" }}>
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
          <li>
            <Link
              to="/logs"
              className={props.active == "/logs" ? "active" : ""}
            >
              <BsFileEarmarkPostFill /> Admin Logs
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default AdminNav;
