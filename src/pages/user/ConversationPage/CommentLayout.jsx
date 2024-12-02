import React from 'react';
import './ConversationPage.css'; 

function CommentLayout({ author, date, text }) {
  return (
    <div className="comment-container">
      <div className="comment-header">
        <div className="author-avatar">

        </div>
        <div className="author-info">
          <p className="author-name">{author}</p>
          <p className="comment-date">{date}</p>
        </div>
      </div>
      <div className="comment-body">
        <p>{text}</p>
      </div>
    </div>
  );
}

export default CommentLayout;