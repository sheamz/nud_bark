import React from "react";
import { Link } from "react-router-dom";
import "./NavUser.css";
import Logo from "../assets/logo.png";
import { Stack, Avatar, Divider } from "@mui/material";

export default function NavUser() {
  return (
    <div className="nav_bar d-flex sticky-top px-3">
      <Stack direction="row" gap={2} sx={{ alignItems: "center" }}>
        <img src={Logo} alt="" style={{ width: "56px", height: "56px" }} />
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
          <Link to={"/home"}>
            <li>Browse</li>
          </Link>
          <Link to={"/create-topic"}>
            <li>Create</li>
          </Link>
        </ul>
      </Stack>
    </div>
  );
}
