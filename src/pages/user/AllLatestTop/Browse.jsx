import React, { useState } from "react";
import NavUser from "../../../components/NavUser";
import ALTNav from "./ALTNav";
import PostCard from "../../../components/PostCard/PostCard.jsx";
import "./Browse.css";

const alt = [
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

const Browse = () => {
  return (
    <div className="browse-bg">
      <NavUser />

      <div className="container p-0 mt-5">
        <div className="browse-container">
          <h2>Browse Posts</h2>
          <ALTNav />
          {/* posts */}
          <PostCard data={alt} _post_per_page={5} _pagination={true} />
        </div>
        {/* <div className="side-panel">categories</div> */}
      </div>
    </div>
  );
};

export default Browse;
