import React from "react";
import { Link } from "react-router-dom";
import "./Browse.css";

const ALTNav = () => {
  return (
    <>
      <div>
        <div className="navbar-right">
          <div className="actions">
            <Link to="/create-topic">
              <button
                className="create-post-btn my-3 mx-0"
                style={{
                  color: "darkblue",
                  fontWeight: "bold",
                }}
              >
                Create Post
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ALTNav;
