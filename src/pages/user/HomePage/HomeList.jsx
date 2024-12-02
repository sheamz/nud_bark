import React from "react";
import "./Home.css";

export default function HomeList() {
  return (
    <div className="homelist">
      <div className="listnav">
        <div className="filter-buttons">
          <button className="nav-button active">All</button>
          <button className="nav-button">Latest</button>
          <button className="nav-button">Top</button>
        </div>
        <div className="action-buttons">
          <button className="category-button">Categories ▼</button>
          <button className="create-post-button">Create Post</button>
        </div>
      </div>
      <div className="post-list">
        {[...Array(7)].map((_, index) => (
          <div className="post-card" key={index}></div>
        ))}
      </div>
      <button className="see-more-button">See More</button> 
    </div>
  );
}
