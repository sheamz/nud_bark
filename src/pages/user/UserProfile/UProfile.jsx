import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import "./UProfile.css";
import axios from "../../../backend/axios";
import { Cookies } from "react-cookie";
import NavUser from "../../../components/NavUser";

import { Avatar, Box, DialogContent, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

const cookie = new Cookies();

const Profile = () => {
  const navigate = useNavigate();

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
    if (!confirmLogout) return;
    axios.get("/logOut.php").then((res) => {
      cookie.remove("atk");
      navigate("/");
    });
  };

  const [isPassDialog, setIsPassDialog] = useState(false);
  const [passData, setPassData] = useState({});

  const openPassDialog = () => {
    setIsPassDialog(true);
  };

  const closePassDialog = () => {
    setIsPassDialog(false);
  };

  const handlePassChange = (e) => {
    const { name, value } = e.target;
    setPassData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitNewPassword = (e) => {
    e.preventDefault();
    if (passData.new_pass !== passData.confirm_pass) {
      alert("Confirm Password do not match");
      return;
    }
    axios
      .post("/updatePassword.php", { ...passData })
      .then((res) => {
        if (res.data.status === 200) {
          alert(res.data.message);
          closePassDialog();
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.error("Error changing password:", err);
      });
  };

  return (
    <div className="blue-bg" style={{ minHeight: "100vh" }}>
      <NavUser></NavUser>
      <div
        className="profile-container"
        inert={isPassDialog ? "true" : undefined}
      >
        <div className="upper-section">
          <div className="profile-header"></div>
        </div>

        <div className="det ">
          <Avatar sx={{ width: "70px", height: "70px" }}>
            {userData.f_name}
          </Avatar>
          <div className="profile-info">
            <div className="name">{userData.username}</div>
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
          <button className="change-password" onClick={openPassDialog}>
            Change Password
          </button>
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <Dialog
          open={isPassDialog}
          onClose={closePassDialog}
          aria-labelledby="new-password-label"
          aria-describedby="new-password-decription"
        >
          <DialogTitle>{"Change password?"}</DialogTitle>
          <DialogContent dividers>
            <Box
              component={"form"}
              onSubmit={submitNewPassword}
              sx={{
                flexDirection: "column",
                display: "flex",
                minWidth: "300px",
                gap: "20px",
              }}
            >
              <TextField
                required
                type="password"
                name="old_pass"
                id="old_pass_id"
                label="Old Password"
                variant="outlined"
                size="small"
                onInput={handlePassChange}
              />
              <TextField
                required
                inputProps={{ minLength: 8 }}
                type="password"
                name="new_pass"
                id="new_pass_id"
                label="New Password"
                variant="outlined"
                size="small"
                onInput={handlePassChange}
              />
              <TextField
                required
                type="password"
                name="confirm_pass"
                id="confirm_pass_id"
                label="Confirm New Password"
                variant="outlined"
                size="small"
                onInput={handlePassChange}
              />
              <Stack direction="row" spacing={2} alignSelf={"end"}>
                <Button onClick={closePassDialog} sx={{ color: "grey" }}>
                  Disagree
                </Button>
                <Button type="submit">Agree</Button>
              </Stack>
            </Box>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Profile;
