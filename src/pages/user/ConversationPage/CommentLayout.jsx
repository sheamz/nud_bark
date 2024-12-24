import React from "react";

import { formatDistanceToNow } from "date-fns";
import { Avatar } from "@mui/material";

import "./ConversationPage.css";

function CommentLayout(props) {
  if (!props.comments || props.comments.length === 0) {
    return (
      <>
        <p>no comments</p>
      </>
    ); // or return a message indicating no comments
  } else {
    let date = new Date(props.comments.date);
    let formattedDate = isNaN(date)
      ? "Invalid date"
      : formatDistanceToNow(date, { addSuffix: true });
    return (
      <>
        {props.comments.map((com) => (
          <div key={com.cid} className="comment-container">
            <div className="comment-header">
              <Avatar></Avatar>
              <div className="author-info">
                <p className="author-name">{com.uname ?? com.uid}</p>
                <p className="comment-date">{formattedDate}</p>
              </div>
            </div>
            {/* <div className="comment-body"> */}
            <p>{com.content}</p>
            {/* </div> */}
            {/* {com.reply && com.reply.length > 0 && (
              <div className="comment-replies">
                <CommentLayout comments={com.replies} />
              </div>
            )} */}
          </div>
        ))}
      </>
    );
  }
}

export default CommentLayout;
