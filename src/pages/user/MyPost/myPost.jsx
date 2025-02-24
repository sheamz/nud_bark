import React, { useEffect, useState } from "react";
import NavUser from "../../../components/NavUser";
import "./myPost.css";
import axios from "../../../backend/axios";
import { formatDistanceToNow } from "date-fns";

import { Stack, Avatar, Divider, Paper } from "@mui/material";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import { Link } from "react-router-dom";

export default function MyPost() {
  const [myPost, setMyPost] = useState([]);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    axios.get("/getPostByUser.php").then((res) => {
      setMyPost(res.data.data);
    });
    axios.get("/getProfile.php").then((res) => {
      setUserDetails(res.data);
    });
  }, []);

  return (
    <div className="blue-bg myPosts" style={{ minHeight: "100vh" }}>
      <NavUser />
      <div className="background_profile">
        <Stack>
          <Avatar></Avatar>
          <Stack direction="row" alignItems={"center"}>
            <h3>{userDetails.username ?? userDetails.uid}</h3>
            <BorderColorRoundedIcon />
          </Stack>
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
        <Stack spacing={3} width={"600px"} m={10} alignItems={"center"}>
          {myPost.length != 0 ? (
            myPost.map((post) => {
              let date = new Date(post.date_created);
              let formattedDate = isNaN(date)
                ? "Invalid date"
                : formatDistanceToNow(date, { addSuffix: true });

              let category_color = "";

              switch (post.category) {
                case "Ask Community":
                  category_color = "cyan";

                  break;

                case "Marketplace":
                  category_color = "lightblue";

                  break;

                case "Ask Suggestion":
                  category_color = "green";

                  break;

                case "Off Topic":
                  category_color = "yellow";

                  break;

                case "Issue":
                  category_color = "pink";

                  break;

                default:
                  category_color = "violet";

                  break;
              }

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
                      minWidth: "600px",
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      mb={2}
                    >
                      <h4>{post.title}</h4>
                      <p className="date">posted {formattedDate}</p>
                    </Stack>
                    <Divider />
                    <Paper
                      elevation={0}
                      sx={{
                        width: "fit-content",
                        borderRadius: "10px",
                        px: 2,
                        backgroundColor: category_color,
                        fontSize: "13px",
                        my: "10px",
                      }}
                    >
                      {post.category}
                    </Paper>
                    <div
                      className="content-area"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    <p
                      style={{
                        fontSize: "13px",
                        color: "grey",
                        marginTop: "10px",
                      }}
                    >
                      Views: {post.view}
                    </p>
                  </Paper>
                </Link>
              );
            })
          ) : (
            <h1>No Post Yet</h1>
          )}
        </Stack>
      </div>
    </div>
  );
}
