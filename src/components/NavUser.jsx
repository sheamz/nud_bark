import React from "react";
import { Link } from "react-router-dom";
import "./NavUser.css";
import Logo from "../assets/logo.png";
import { Stack, Avatar, Divider, Collapse } from "@mui/material";

export default function NavUser() {
  return (
    <div className="nav_bar d-flex justify-content-between sticky-top px-3">
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
            <Link to={"/home"}>
              <li>Browse</li>
            </Link>
            <Link to={"/create-topic"}>
              <li>Create</li>
            </Link>
          </ul>
        </Stack>
      </Stack>
      <Stack direction="row" alignItems={"center"} gap={1} mr={4}>
        <Avatar>r</Avatar>
        <p className="username">uusername</p>
        <Collapse in={open} timeout="auto" unmountOnExit></Collapse>
      </Stack>
    </div>
  );
}
