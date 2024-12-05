import React, { useState } from "react";
import NavUser from "../../../components/NavUser";
import { Link } from "react-router-dom";
import "./ALT.css";

const ALTNav = () => {
  const [category, setCategory] = useState(""); 
  const categories = ["Ask Community", "Marketplace", "Suggestions", "Off Topic", "Issue", "Bark News"]; 

  return (
    <>
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
            <Link to="/create-topic">
              <button className="create-post-btn">Create Post</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ALTNav;
