import React from "react";
import "./ConversationPage.css";

function ReplyLayout(props) {
  return (
    <>
      <div className="reply-container">
        <div className="reply-header">
          <div className="reply-author-avatar"></div>
          <div className="reply-author-info">
            <p className="reply-author-name">{}</p>
            <p className="reply-date">{}</p>
          </div>
        </div>
        <div className="reply-body">
          <p>{}</p>
        </div>
      </div>
      {/* <ReplyLayout /> */}
    </>
  );
}

export default ReplyLayout;
