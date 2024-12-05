import React, { useState } from "react";
import "./YourContri.css";

const YourContriTblTemplate = () => {
  const posts = [
    {
      topicName: "Looking for my section: INF290",
      category: "Ask Community",
      replies: 100,
      views: 100,
      likes: 100,
      datePosted: "11/29/2024",
    },
    {
      topicName: "Looking for my section: INF290",
      category: "Marketplace",
      replies: 100,
      views: 100,
      likes: 100,
      datePosted: "11/29/2024",
    },
    {
      topicName: "Looking for my section: INF290",
      category: "Suggestions",
      replies: 100,
      views: 100,
      likes: 100,
      datePosted: "11/29/2024",
    },
  ];

  return (
    <div className="your-contri">
      <div className="header">
        <div className="topic-header">Topic</div>
        <div className="details-header">
          <div>Replies</div>
          <div>Views</div>
          <div>Date Posted</div>
        </div>
      </div>

      {posts.map((post, index) => (
        <div key={index} className="post-box">
          <div className="post-header">
            <h3>{post.topicName}</h3>
            <span className="category-contri">{post.category}</span>
          </div>
          <div className="post-body">
            <div className="post-details">
              <div>{post.replies}</div>
              <div>{post.views}</div>
              <div>{post.datePosted}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default YourContriTblTemplate;
