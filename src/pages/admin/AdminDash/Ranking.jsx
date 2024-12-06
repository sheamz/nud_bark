import React from "react";

import "./Ranking.css";

import Paper from "@mui/material/Paper";
import { Avatar, Button, Stack } from "@mui/material";
import Divider from "@mui/material/Divider";

export default function Ranking(props) {
  return (
    <>
      {/* top Contributr */}
      <Paper
        elevation={5}
        sx={{ width: "fit-content", height: "fit-content" }}
        className="top-contibutor p-4 rounded-3"
      >
        <h6>Top Contributor</h6>
        <Divider sx={{ border: "2px solid gray", borderRadius: "10px" }} />
        <Stack
          sx={{ mt: "20px", width: "fit-content" }}
          spacing={2}
          direction={"row"}
        >
          <Avatar>H</Avatar>
          <div>
            <p className="uname">Jesse Thomas</p>
            <p className="email">emdadasdasdail.com</p>
          </div>
          <p className="count">
            9999 <small>posts</small>
          </p>
          <p className="percent">89%</p>
        </Stack>
      </Paper>
      {/* most popular */}
      <Paper
        elevation={5}
        sx={{ width: "fit-content", height: "fit-content" }}
        className="top-contibutor p-4 rounded-3"
      >
        <h6>Most Popular</h6>
        <Divider sx={{ border: "2px solid gray", borderRadius: "10px" }} />
        <Stack
          sx={{ mt: "20px", width: "fit-content" }}
          spacing={2}
          direction={"row"}
        >
          {/* <Avatar>H</Avatar> */}
          <div>
            <p className="uname">Title ng Post</p>
            <p className="email">category</p>
          </div>
          <p className="count">
            9999 <small>comments</small>
          </p>
          <p className="percent">89%</p>
        </Stack>
      </Paper>
      {/* most views */}
      <Paper
        elevation={5}
        sx={{ width: "fit-content", height: "fit-content" }}
        className="top-contibutor p-4 rounded-3"
      >
        <h6>Most Views</h6>
        <Divider sx={{ border: "2px solid gray", borderRadius: "10px" }} />
        <Stack
          sx={{ mt: "20px", width: "fit-content" }}
          spacing={2}
          direction={"row"}
        >
          {/* <Avatar>H</Avatar> */}
          <div>
            <p className="uname">Title ng Post</p>
            <p className="email">category</p>
          </div>
          <p className="count">
            9999 <small>views</small>{" "}
          </p>
          <p className="percent">89%</p>
        </Stack>
      </Paper>
    </>
  );
}
