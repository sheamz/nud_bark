import React from "react";
import NavUser from "../../../components/NavUser";
import HomeCat from "./HomeCat";
import HomeContri from "./HomeContri";
import HomeList from "./HomeList";
import HomeUpper from "./HomeUpper";
import PostCard from "../../../components/PostCard/PostCard";

import { Link } from "react-router-dom";
import { Paper, Stack } from "@mui/material";

export default function Home() {
  const alt = [
    {
      alttopicName: "Looking for my section: INF290",
      altcategory: "Ask Community",
      altauthor: "basher",
      altusername: "@basher",
      altreplies: 100,
      altviews: 100,
      altdatePosted: "11/29/2024",
    },
    {
      alttopicName: "Looking for my section: INF290",
      altcategory: "Ask Community",
      altauthor: "basher",
      altusername: "@basher",
      altreplies: 100,
      altviews: 100,
      altdatePosted: "11/29/2024",
    },
    {
      alttopicName: "Looking for my section: INF290",
      altcategory: "Ask Community",
      altauthor: "basher",
      altusername: "@basher",
      altreplies: 100,
      altviews: 100,
      altdatePosted: "11/29/2024",
    },
    {
      alttopicName: "Looking for my section: INF290",
      altcategory: "Ask Community",
      altauthor: "basher",
      altusername: "@basher",
      altreplies: 100,
      altviews: 100,
      altdatePosted: "11/29/2024",
    },
    {
      alttopicName: "Looking for my section: INF290",
      altcategory: "Ask Community",
      altauthor: "basher",
      altusername: "@basher",
      altreplies: 100,
      altviews: 100,
      altdatePosted: "11/29/2024",
    },
    {
      alttopicName: "Looking for my section: INF290",
      altcategory: "Ask Community",
      altauthor: "basher",
      altusername: "@basher",
      altreplies: 100,
      altviews: 100,
      altdatePosted: "11/29/2024",
    },
    {
      alttopicName: "Looking for my secasddation: INF290",
      altcategory: "Ask Community",
      altauthor: "basher",
      altusername: "@basher",
      altreplies: 100,
      altviews: 100,
      altdatePosted: "11/29/2024",
    },
  ];
  return (
    <>
      <NavUser />
      <div className="container mt-5 p-0">
        <div className="home-container">
          <HomeUpper />

          <Stack direction="row" gap={5}>
            {/* <HomeList /> */}
            <Stack flex={3} gap={4} alignItems="center">
              <div className="header">
                <h3>Most Popular</h3>
                <Link>
                  <small>see more {">>"}</small>
                </Link>
              </div>
              <PostCard data={alt} _pagination={false} />
            </Stack>
            {/* <HomeContri /> */}
            <Paper sx={{ flex: 1 }}>ewan</Paper>
          </Stack>

          <div className="underline"></div>

          <HomeCat />
        </div>
      </div>
    </>
  );
}
