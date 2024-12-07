import React, { useState } from "react";
import NavUser from "../../../components/NavUser";
import ALTNav from "./ALTNav";
import PostCard from "../../../components/PostCard/PostCard.jsx";
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
