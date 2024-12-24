import React from "react";
import { Avatar } from "@mui/material";

import { formatDistanceToNow } from "date-fns";

import "./ConversationPage.css";

function ReplyLayout(props) {
  // console.log(props.reply);

  let date = new Date(props.reply.date);
  let formattedDate = isNaN(date)
    ? "Invalid date"
    : formatDistanceToNow(date, { addSuffix: true });

  return (
    <div className="reply-root">
      <div className="reply-container">
        <div className="reply-header">
          {/* <div className="reply-author-avatar"></div> */}
          <Avatar size="small" sx={{ marginRight: "10px" }}></Avatar>

          <div className="reply-author-info">
            <small className="reply-author-name">
              {props.reply.uname ?? props.reply.uid}
            </small>
            <p className="reply-date">posted {formattedDate}</p>
          </div>
        </div>
        <div className="reply-body">
          <p>{props.reply.content}</p>
        </div>
      </div>
      {/* <ReplyLayout /> */}
    </div>
  );
}

export default ReplyLayout;
