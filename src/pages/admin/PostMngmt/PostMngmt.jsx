import React from "react";
import "./PostMngmt.css"; 
import AdminNav from "../AdminNav"; // Import AdminNav for the sidebar and top navigation

function PostMngmt() {
  return (
    <div>
      <AdminNav /> {/* AdminNav component renders sidebar and top navigation */}
      
      {/* Post Management Content */}
      <div className="post-management-container">
        {/* Header with filters */}
        <div className="header">
          <h2>Post Management</h2>
          <div className="filters">
            <input type="text" placeholder="Search" className="search-input" />
            <select className="category-filter">
              <option value="">Category</option>
              <option value="ask">Ask the Community</option>
              <option value="news">News</option>
              {/* Add more categories as needed */}
            </select>
            <button className="filter-button">Filter by</button>
            <button className="delete-button">DELETE</button>
          </div>
        </div>

        {/* Post Table */}
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
            {/* Add more rows here */}
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
