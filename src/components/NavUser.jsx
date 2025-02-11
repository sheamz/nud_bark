import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavUser.css";
import Logo from "../assets/logo.png";
import { Stack, Avatar, Divider, Collapse } from "@mui/material";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import { Cookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "../backend/axios";

let cookie = new Cookies();

export default function NavUser() {
  const navigate = useNavigate();
  // let uid = jwtDecode(cookie.get("atk")).uid;/
  const [userDetails, setUserDetails] = useState({});

  let logOut = () => {
    cookie.remove("atk");

    navigate("/");
  };

  useEffect(() => {
    axios.get("/getProfile.php").then((res) => {
      // console.log(res.data);
      setUserDetails(res.data);
    });
  }, []);

  return (
    <div className="nav_bar sticky-top">
      <div className="container p-0">
        <Stack direction="row" alignItems={"center"} width={"50%"}>
          <Stack direction="row" gap={2} alignItems={"center"}>
            <img
              src={Logo}
              alt="Bark Logo"
              style={{ width: "56px", height: "56px" }}
            />
            <h1>BARK</h1>
          </Stack>
          <Divider
            orientation="vertical"
            flexItem
            variant="middle"
            sx={{
              mx: "20px",
              border: "1px solid #4554a6",
              borderRadius: "5px",
            }}
          />
          <Stack direction="row">
            <ul>
              <Link to={"/home"}>
                <li>Home</li>
              </Link>
              <Link to={"/browse"}>
                <li>Browse</li>
              </Link>
              <Link to={"/create-topic"}>
                <li>
                  <AddRoundedIcon sx={{ color: "white" }} />
                  Create
                </li>
              </Link>
            </ul>
          </Stack>
        </Stack>
        <Stack direction="row" alignItems={"center"} gap={1} mr={2}>
          {/* <Link to={"/user-profile/" + uid}> */}
          <Link to={"/myposts"} style={{ textDecoration: "none" }}>
            <Avatar>{userDetails.username ?? userDetails.uid}</Avatar>
          </Link>
          <DropdownButton
            id="dropdown-item-button"
            title={userDetails.username ?? userDetails.uid ?? ""}
          >
            <Dropdown.ItemText>
              {" "}
              <h6>{userDetails.username ?? userDetails.uid}</h6>{" "}
            </Dropdown.ItemText>
            <Divider />
            <Link to={"/user-profile"} style={{ textDecoration: "none" }}>
              <Dropdown.Item as="button">Update Profile</Dropdown.Item>
            </Link>
            <Divider />
            <Dropdown.Item as="button" onClick={logOut}>
              Log out
            </Dropdown.Item>
          </DropdownButton>
        </Stack>
      </div>
    </div>
  );
}
