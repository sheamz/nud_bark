import React, { useState } from "react";
import NavUser from "../../../components/NavUser";
import ALTNav from "./ALTNav";
import ALTtblTemplate from "./ALTtblTemplate";
import "./Browse.css";

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
];

const Browse = () => {
  return (
    <>
      <NavUser />

      <div className="container p-0 mt-5">
        <div className="browse-container">
          <h2>Browse Posts</h2>
          <ALTNav />
          {/* posts */}
          <ALTtblTemplate data={alt} />
        </div>
        <div className="side-panel"></div>
      </div>
    </>
  );
};

export default Browse;
