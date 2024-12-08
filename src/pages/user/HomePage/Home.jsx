import React from "react";
import NavUser from "../../../components/NavUser";
import HomeCat from "./HomeCat";
import HomeContri from "./HomeContri";
import HomeList from "./HomeList";
import HomeUpper from "./HomeUpper";
import PostCard from "../../../components/PostCard/PostCard";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";

import { Link } from "react-router-dom";
import { Paper, Stack, Divider } from "@mui/material";

export default function Home() {
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
            <Paper sx={{ flex: 1 }}>ewan</Paper>
          </Stack>
          {/* <Divider /> */}
          <hr />
          <HomeCat />
        </Stack>
      </div>
      <Footer />
    </div>
  );
}
