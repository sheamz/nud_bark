import React from "react";
import "./Footer.css";
import logo from "../assets/logo.png"; // Adjust the path to your logo
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope, FaPhone } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="footer">
      <div className="container p-0">
        <div className="footer-content">
          <img src={logo} alt="Logo" className="footer-logo" />
          <div className="footer-description-container">
            <p className="footer-description">
              An online platform designed for students of National University Dasmariñas to connect, share experiences, and seek academic support. This forum fosters a sense of community and engagement, helping students stay informed and involved in university life.
            </p>
          </div>
          <div className="vertical-line-footer"></div>
          <div className="footer-contact">
            <div className="social-icons-footer">
              <FaFacebook className="icon-footer" />
              <FaInstagram className="icon-footer" />
              <FaTwitter className="icon-footer" />
              <FaEnvelope className="icon-footer" />
              <FaPhone className="icon-footer" />
            </div>
            <div className="contact-info-footer">
              <p>Email: example@example.com</p>
              <p>Phone: +1234567890</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}