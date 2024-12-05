import React from 'react';
import { FaEnvelope } from 'react-icons/fa';  
import './UProfile.css';

const Profile = () => {
  const userData = {
    profilePicture: 'https://via.placeholder.com/150', 
    name: 'John Doe',
    email: 'john.doe@example.com',
    username: 'john_doe123',
    firstUsedDate: '2022-01-01',
  };

  return (
    <div className="profile-container">
      <div className="upper-section">
        <div className="profile-header">
        </div>
      </div>

      <div className='det'>
            <div className="profile-picture-page">
                <img src={userData.profilePicture} alt="Profile" />
            </div>
          <div className="profile-info">
            <div className="name">{userData.name}</div>
            <div className="email">{userData.email}</div>
          </div>
          <button className="edit-btn">Edit</button>
      </div>


      <div className="user-details">
        <label htmlFor="full-name">Full Name</label>
        <div className="input-box">{userData.name}</div>

        <label htmlFor="username">Username</label>
        <div className="input-box">{userData.username}</div>
      </div>

      <div className="email-section">
        <div className="email-info">
          <span>My email address:</span>
          <div className="email-details">
            <div className='lower-email'>
            <span> <FaEnvelope className="email-icon" /> {userData.email}</span>
            <span>First used: {userData.firstUsedDate}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <button className="change-password">Change Password</button>
        <button className="logout">Logout</button>
      </div>
    </div>
  );
};

export default Profile;
