import React, { useState } from "react";
import { FiMenu } from "react-icons/fi"; // Import the hamburger menu icon from react-icons
import "./UserManagement.css";
import AdminNav from "../AdminNav";

function UserManagement() {
  const [showMenu, setShowMenu] = useState(null);

  const toggleMenu = (index) => {
    // Toggle the menu visibility based on the index
    setShowMenu(showMenu === index ? null : index);
  };

  return (
    <div>
      <AdminNav />
      <div className="user-management-container">
        <div className="user-header">
          <h2>User Management</h2>
          <div className="user-filters">
            <button className="user-filter-button">Filter by:</button>
            <button className="user-delete-button">DELETE</button>
          </div>
        </div>

        <table className="user-post-table">
          <thead className="user-title">
            <tr>
              <th><input type="checkbox" /></th>
              <th>Full Name</th>
              <th>Username</th>
              <th>Email Address</th>
              <th>Date Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type="checkbox" /></td>
              <td>
                <div className="profile">
                  <img src="https://via.placeholder.com/40" alt="Profile" className="profile-pic" />
                  Leslie Maya
                </div>
              </td>
              <td>LMaya</td>
              <td>leslie@gmail.com</td>
              <td>10/2/2024</td>
              <td>
                <button className="hamburger-button" onClick={() => toggleMenu(0)}>
                  <FiMenu size={24} />
                </button>
                {showMenu === 0 && (
                  <div className="dropdown-menu">
                    <button className="edit-button">Edit</button>
                    <button className="delete-button">Delete</button>
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserManagement;