import React from "react";
import { Avatar } from "@mui/material";
import { formatDistanceToNow } from "date-fns";

import "./ConversationPage.css";

function Content(props) {
  let date = new Date(props.data.date);
  let formattedDate = isNaN(date)
    ? "Invalid date"
    : formatDistanceToNow(date, { addSuffix: true });

  return (
    <div className="content-container">
      <header>
        <div className="profile">
          <Avatar sx={{ width: "60px", height: "60px" }}>
            {props.data.uname == null ? "user" : props.data.uname[1]}
          </Avatar>
          <div className="profile-info">
            <span className="username">
              {props.data.uname ?? props.data.uid}
            </span>
            <span className="date">{`posted ${formattedDate}`}</span>
          </div>
        </div>
      </header>
      <main className="content-area">
        <h1 className="title">{props.data.tit}</h1>
        <div dangerouslySetInnerHTML={{ __html: props.data.content }} />
      </main>
    </div>
  );
}

export default Content;
