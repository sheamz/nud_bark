import React, { useEffect, useState } from "react";
import NavUser from "../../../components/NavUser";
import "./myPost.css";
import axios from "../../../backend/axios";
import { formatDistanceToNow, parseISO } from "date-fns";

import { Stack, Avatar, Divider, Collapse, Paper } from "@mui/material";
import { Link } from "react-router-dom";

export default function MyPost() {
  const [myPost, setMyPost] = useState([]);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    axios.get("/getPostByUser.php").then((res) => {
      // console.log(res.data.data);
      setMyPost(res.data.data);
    });
    axios.get("/getProfile.php").then((res) => {
      // console.log(res.data);
      setUserDetails(res.data);
    });
  }, []);

  return (
    <div className="blue-bg myPosts" style={{ minHeight: "100vh" }}>
      <NavUser />
      <div className="background_profile">
        <Stack>
          <Avatar></Avatar>
          <h3>{userDetails.username ?? userDetails.uid}</h3>
        </Stack>
      </div>
      <div
        className="container p-0 mt-5 myPosts"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack spacing={3} width={"600px"} m={10}>
          {myPost.map((post) => {
            let date = new Date(post.date_created);
            let formattedDate = isNaN(date)
              ? "Invalid date"
              : formatDistanceToNow(date, { addSuffix: true });

            return (
              <Link
                key={post.pid}
                style={{ textDecoration: "none" }}
                to={"/browse/post/" + post.pid}
              >
                <Paper
                  elevation={1}
                  sx={{
                    padding: "15px",
                    backgroundColor: "white",
                    borderRadius: "10px",
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                    <h4>{post.title}</h4>
                    <p className="date">posted {formattedDate}</p>
                  </Stack>
                  <div
                    className="content-area"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </Paper>
              </Link>
            );
          })}
        </Stack>
      </div>
    </div>
  );
}
