import React from "react";
import NavUser from "../../../components/NavUser";
import HomeContri from "./HomeContri";
import HomeList from "./HomeList";
import HomeUpper from "./HomeUpper";
import PostCard from "../../../components/PostCard/PostCard";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";

import { Link } from "react-router-dom";
import { Paper, Stack, Divider, Typography, Button } from "@mui/material";
import "./Home.css"; // Import the CSS file

export default function Home() {
  const username = "@basher"; // Example username, replace with actual user data
  const totalPosts = 100; // Example total posts, replace with actual data
  const totalComments = 100; // Example total comments, replace with actual data

  const posts = [
    {
      tit: "Looking for my section: INF290",
      cat: "Ask Community",
      uname: "@basher",
      com: 100,
      views: 100,
      date: "11/29/2024",
    },
    {
      tit: "Looking for my section: INF290",
      cat: "Ask Community",
      uname: "@basher",
      com: 100,
      views: 100,
      date: "11/29/2024",
    },
    {
      tit: "Looking for my section: INF290",
      cat: "Ask Community",
      uname: "@basher",
      com: 100,
      views: 100,
      date: "11/29/2024",
    },
  ];
  return (
    <div className="blue-bg">
      <NavUser />
      <div className="container mt-5 p-0">
        <Stack className="home-container" width="100%" gap={10}>
          <HomeUpper />
          <Stack direction="row" gap={5} m={0}>
            {/* <HomeList /> */}
            <Stack flex={3} gap={2} alignItems="center">
              <Header title={"Most Popular"} link={"/browse"} />
              <PostCard data={posts} _pagination={false} />
            </Stack>
            {/* <HomeContri /> */}
            <Paper className="card-contri" sx={{ flex: 1 }}>
              <div className="card-header-contri">
                <Typography variant="h6">Your Contributions</Typography>
              </div>
              <div className="card-body-contri">
                <Typography variant="body1">
                  Hi {username}, here is your total contributions.
                </Typography>
                <Typography variant="body2" className="body2">
                  {totalPosts} Total Posts
                </Typography>
                <Typography variant="body2" className="body2">
                  {totalComments} Total Comments
                </Typography>
                <div className="see-all-button-contri">
                  <Button
                    component={Link}
                    to="/your-contri"
                  >
                    See All
                  </Button>
                </div>
              </div>
            </Paper>
          </Stack>
        </Stack>
      </div>
      <Footer />
    </div>
  );
}