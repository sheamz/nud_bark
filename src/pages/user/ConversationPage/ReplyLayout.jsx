import React from 'react';
import './ConversationPage.css'; 

function ReplyLayout({ author, date, text }) {
  return (
    <div className="reply-container">
      <div className="reply-header">
        <div className="reply-author-avatar">

        </div>
        <div className="reply-author-info">
          <p className="reply-author-name">{author}</p>
          <p className="reply-date">{date}</p>
        </div>
      </div>
      <div className="reply-body">
        <p>{text}</p>
      </div>
    </div>
  );
}

export default ReplyLayout;