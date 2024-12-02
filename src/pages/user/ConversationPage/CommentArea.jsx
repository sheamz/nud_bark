import React, { useState } from "react";
import "./ConversationPage.css";

function CommentArea() {
  const [comment, setComment] = useState("");
  const maxWords = 200;

  const countWords = (text) => {
    const words = text.trim().split(/\s+/); 
    return words[0] === "" ? 0 : words.length; 
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleCancel = () => {
    setComment("");
  };

  const handleComment = () => {
    if (countWords(comment) > 0 && countWords(comment) <= maxWords) {
      console.log("Comment Submitted:", comment);
    }
  };

  return (
    <div className="comment-layout">
      <form className="comment-form">
        <textarea
          className="comment-input"
          value={comment}
          onChange={handleChange}
          placeholder="Write your comment (max 200 words)"
        />
        <div className="comment-footer">
          <span className="char-count">{countWords(comment)}/{maxWords}</span>
          <div className="comment-buttons">
            <button type="button" className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
            <button
              type="button"
              className="comment-button"
              onClick={handleComment}
              disabled={countWords(comment) === 0 || countWords(comment) > maxWords}
            >
              Comment
            </button>
          </div>
        </div>
      </form>
      <hr className="comment-divider" /> {/* Horizontal line */}
    </div>
  );
}

export default CommentArea;
