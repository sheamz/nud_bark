import React from "react";
import "./PostMngmt.css"; 
import AdminNav from "../AdminNav"; 

function PostMngmt() {
  return (
    <div>
      <AdminNav /> 
      
      <div className="post-management-container">

        <div className="header">
          <h2>Post Management</h2>
          <div className="filters">
            <input type="text" placeholder="Search" className="search-input" />
            <select className="category-filter">
              <option value="">Category</option>
              <option value="ask">Ask the Community</option>
              <option value="news">News</option>

            </select>
            <button className="filter-button">Filter by</button>
            <button className="delete-button">DELETE</button>
          </div>
        </div>


        <table className="post-table">
          <thead className="title">
            <tr>
              <th><input type="checkbox" /></th>
              <th>Post Title</th>
              <th>Author</th>
              <th>Date</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type="checkbox" /></td>
              <td>Pano magka pera 101: Guide para sa mga walang pera.</td>
              <td>Shanilah Mendoza (@shanemz)</td>
              <td>25/3/2023</td>
              <td>Ask the Community</td>
              <td><button className="go-to-post">Go to post</button></td>
            </tr>

            <tr>
              <td><input type="checkbox" /></td>
              <td>Pano magka pera 101: Guide para sa mga walang pera.</td>
              <td>Shanilah Mendoza (@shanemz)</td>
              <td>25/3/2023</td>
              <td>Ask the Community</td>
              <td><button className="go-to-post">Go to post</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PostMngmt;
