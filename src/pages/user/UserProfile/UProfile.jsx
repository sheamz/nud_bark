import React, { useEffect, useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';  
import './UProfile.css';
import axios from '../../../backend/axios';

const Profile = () => {
  const [userData, setUserData] = useState({
    profilePicture: 'https://via.placeholder.com/150', 
    fname: '',
    mname: '',
    lname: '',
    suffix: '',
    email: '',
    username: '',
    firstUsedDate: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    const uid = window.location.pathname.split("/")[2];
    console.log(uid);
    const userId = 'USER_ID'; // Replace with actual user ID
    // fetch(`http://localhost/nud_bark/src/backend/api/getProfile.php?uid=${userId}`)
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data);
    //     // setUserData(prevState => ({
    //     //   ...prevState,
    //     //   email: data.email,
    //     //   firstUsedDate: data.date_created,
    //     // }));
    //   })
      // .catch(error => console.error('Error fetching user data:', error));
      axios.post("/getProfile.php",{uid:uid}).then((res) => {console.log(res.data);
        setUserData(prevState => ({
          ...prevState,
          email: res.data.email,
          firstUsedDate: res.data.date_created,
        }));
      }).catch((err) => {});
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      // Perform logout logic here, e.g., clearing user session, tokens, etc.
      console.log("User logged out");
      // Redirect to login page after logout
      window.location.href = '/';
    }
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
        <button className="edit-btn" onClick={toggleEditing}>{isEditing ? 'Save' : 'Edit'}</button>
      </div>

      <form className="user-details">
        <label htmlFor="first-name">First Name</label>
        <input type='text' className="input-box" disabled={!isEditing}></input>

        <label htmlFor="middle-name">Middle Name</label>
        <input type='text' className="input-box"></input>

        <label htmlFor="last-name">Last Name</label>
        <input type='text' className="input-box"></input>

        <label htmlFor="suffix">Suffix</label>
        <input type='text' className="input-box"></input>

        <label htmlFor="username">Username</label>
        <input type='text' className="input-box"></input>
      </form>

      <div className="email-section">
        <div className="email-info">
          <span>My email address:</span>
          <div className="email-details">
            <div className='lower-email'>
              <span><FaEnvelope className="email-icon" /> {userData.email}</span>
              <span>Date Joined: {userData.firstUsedDate}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <button className="change-password">Change Password</button>
        <button className="logout" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;