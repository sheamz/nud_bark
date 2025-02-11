import React, { useEffect, useState } from "react";
import NavUser from "../../../components/NavUser";
import HomeUpper from "./HomeUpper";
import PostCard from "../../../components/PostCard/PostCard";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import axios from "../../../backend/axios";

import { Link } from "react-router-dom";
import { Paper, Stack, Divider, Typography, Button } from "@mui/material";
import "./Home.css"; // Import the CSS file

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    axios
      .get("/getPost.php")
      .then((res) => {
        setPosts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("/getComPostByUser.php")
      .then((res) => {
        setUserDetails(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="blue-bg" style={{ minHeight: "100vh" }}>
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
              <Header title={"Your Contributions"} />
              <div className="card-body-contri">
                <Typography variant="body1">
                  Hi <b>{userDetails.username ?? userDetails.uid}</b>, here is
                  your total contributions.
                </Typography>
                <Typography variant="body2" className="body2">
                  {userDetails.post_count} Total Posts
                </Typography>
                <Typography variant="body2" className="body2">
                  {userDetails.com_count} Total Comments
                </Typography>
                <div className="see-all-button-contri">
                  <Button component={Link} to="/myposts">
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
