import React from "react";
import "./ConversationPage.css"

function Content() {
    return (
        <div className="app-container">
          <header className="header">
            <div className="profile">
              <img
                src="profile-placeholder.png" // Replace with your image URL
                alt="Profile"
                className="profile-pic"
              />
              <div className="profile-info">
                <span className="username">@Golanginya</span>
                <span className="date">12 November 2023 19:55</span>
              </div>
            </div>
          </header>
          <main className="content-area">
            <h1 className="title">Title Area</h1>
            <p className="description">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text ever
              since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not only
              five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s with
              the release of Letraset sheets containing Lorem Ipsum passages, and
              more recently with desktop publishing software like Aldus PageMaker
              including versions of Lorem Ipsum.
            </p>
          </main>
        </div>
      );
}

export default Content;
