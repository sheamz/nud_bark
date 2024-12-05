import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./YourContri.css";

const YourComment = () => {
  const [category, setCategory] = useState(""); 
  const categories = ["Ask Community", "Marketplace", "Suggestions"]; 

  const comments = [
    {
      commenttopicName: "Education that doesn't work: National University",
      commentcategory: "Issue", 
      commentreplies: 100,
      commentviews: 100,
      commentlikes: 100,
      commentdatePosted: "11/29/2024",
    },
  ];

  return (
    <div className="your-comment-container">
      <div className="your-post-title">Your Posts</div>

      <div className="under-header">
        <div className="topics">
          <Link to="/your-contri" className="link-style">
            Topics
          </Link>
        </div>
        <div className="comments">Comments</div>
      </div>

      <div className="post-underline"></div>

      <div className="navbar">
        <div className="navbar-left">
          <div className="all">
            <h3>All</h3>
          </div>
          <div className="latest">
            <h3>Latest</h3>
          </div>
          <div className="top">
            <h3>Top Choices</h3>
          </div>
        </div>

        <div className="navbar-right">
          <div className="category-dropdown">
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="actions">
            <button className="edit-btn">Edit</button>
          </div>
        </div>
      </div>

      <div className="your-contri-comment">
        <div className="header-comment">
          <div className="topic-header-comment">Topic</div>
          <div className="details-header-comment">
            <div>Replies</div>
            <div>Views</div>
            <div>Date Posted</div>
          </div>
        </div>

        {comments.map((comment, index) => (
          <div key={index} className="comment-box">
            <div className="comment-header">
              <h3 className="comment-title">{comment.commenttopicName}</h3>
              <span className="categorycomment">{comment.commentcategory}</span> {/* Fixed to use commentcategory */}
            </div>
            <div className="comment-body">
              <div className="comment-details">
                <div>{comment.commentreplies}</div>
                <div>{comment.commentviews}</div>
                <div>{comment.commentdatePosted}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourComment;
