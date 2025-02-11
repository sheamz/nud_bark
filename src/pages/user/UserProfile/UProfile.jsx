import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import "./UProfile.css";
import axios from "../../../backend/axios";
import { jwtDecode } from "jwt-decode";
import { Cookies } from "react-cookie";

const cookie = new Cookies();

const Profile = () => {
  const navigate = useNavigate();
  // var token = cookie.get("atk");
  // var decoded = jwtDecode(token);
  // const uid = decoded.uid;

  const [userData, setUserData] = useState({
    profilePicture: "https://via.placeholder.com/150",
    f_name: "",
    m_name: "",
    l_name: "",
    suffix: "",
    email: "",
    username: "",
    firstUsedDate: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const toggleEditing = () => {
    if (isEditing) {
      // Save the changes
      // const uid = window.location.pathname.split("/")[2];
      // console.log("Sending data to backend:");
      // console.log({ uid, ...userData });
      axios
        .post("/updateProfile.php", { ...userData })
        .then((res) => {
          // console.log(res.data);
          setIsEditing(false);
        })
        .catch((err) => {
          console.error("Error updating user data:", err);
        });
    } else {
      setIsEditing(true);
    }
  };

  useEffect(() => {
    // const uid = window.location.pathname.split("/")[2];
    axios
      .post("/getProfile.php")
      .then((res) => {
        // console.log(res.data);
        setUserData((prevState) => ({
          ...prevState,
          f_name: res.data.f_name || "",
          m_name: res.data.m_name || "",
          l_name: res.data.l_name || "",
          suffix: res.data.suffix || "",
          username: res.data.username || "",
          email: res.data.email || "",
          firstUsedDate: res.data.date_created || "",
        }));
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      cookie.remove("atk");
      navigate("/");
    }
  };

  return (
    <div className="profile-container">
      <div className="upper-section">
        <div className="profile-header"></div>
      </div>

      <div className="det">
        <div className="profile-picture-page">
          <img src={userData.profilePicture} alt="Profile" />
        </div>
        <div className="profile-info">
          <div className="name">{userData.name}</div>
          <div className="email">{userData.email}</div>
        </div>
        <button className="edit-btn" onClick={toggleEditing}>
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>

      <form className="user-details">
        <label htmlFor="f_name">First Name</label>
        <input
          type="text"
          name="f_name"
          className="input-box"
          value={userData.f_name}
          onChange={handleInputChange}
          disabled={!isEditing}
        />

        <label htmlFor="m_name">Middle Name</label>
        <input
          type="text"
          name="m_name"
          className="input-box"
          value={userData.m_name}
          onChange={handleInputChange}
          disabled={!isEditing}
        />

        <label htmlFor="l_name">Last Name</label>
        <input
          type="text"
          name="l_name"
          className="input-box"
          value={userData.l_name}
          onChange={handleInputChange}
          disabled={!isEditing}
        />

        <label htmlFor="suffix">Suffix</label>
        <input
          type="text"
          name="suffix"
          className="input-box"
          value={userData.suffix}
          onChange={handleInputChange}
          disabled={!isEditing}
        />

        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          className="input-box"
          value={userData.username}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
      </form>

      <div className="email-section">
        <div className="email-info">
          <span>My email address:</span>
          <div className="email-details">
            <div className="lower-email">
              <span>
                <FaEnvelope className="email-icon" /> {userData.email}
              </span>
              <span>Date Joined: {userData.firstUsedDate}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <button className="change-password">Change Password</button>
        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
