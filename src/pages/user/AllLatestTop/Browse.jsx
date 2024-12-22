import React, { useEffect, useState } from "react";
import NavUser from "../../../components/NavUser";
import ALTNav from "./ALTNav";
import PostCard from "../../../components/PostCard/PostCard.jsx";
import "./Browse.css";

import Footer from "../../../components/Footer.jsx";
import axios from "../../../backend/axios.jsx";

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
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("/getPost.php")
      .then((res) => {
        setPosts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="blue-bg">
      <NavUser />

      <div className="container p-0 mt-5">
        <div className="browse-container">
          <h2>Browse Posts</h2>
          <ALTNav />
          {/* posts */}
          <PostCard data={posts} _post_per_page={5} _pagination={true} />
        </div>
        {/* <div className="side-panel">categories</div> */}
      </div>
      <Footer />
    </div>
  );
};

export default Browse;
