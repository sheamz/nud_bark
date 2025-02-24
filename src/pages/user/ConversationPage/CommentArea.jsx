import React, { useState } from "react";
import "./ConversationPage.css";
import axios from "../../../backend/axios";
import { Cookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

let cookies = new Cookies();

function CommentArea() {
  const pid = window.location.pathname.split("/")[3];

  const [com, setComment] = useState("");
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

  const submitComment = (e) => {
    e.preventDefault();
    if (countWords(com) > 0 && countWords(com) <= maxWords) {
      // alert(comment);

      axios
        .post("/createComment.php", { pid, uid, com })
        .then((res) => {
          alert(res.data.message);
          setComment("");
        })
        .catch();
    }
  };

  return (
    <div className="comment-layout">
      <form className="comment-form" onSubmit={submitComment}>
        <textarea
          className="comment-input"
          value={com}
          onChange={handleChange}
          placeholder="Write your comment (max 200 words)"
        />
        <div className="comment-footer">
          <span className="char-count">
            {countWords(com)}/{maxWords}
          </span>
          <div className="comment-buttons">
            <button
              type="button"
              className="cancel-button"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="comment-button"
              disabled={countWords(com) === 0 || countWords(com) > maxWords}
            >
              Comment
            </button>
          </div>
        </div>
      </form>
      <hr className="comment-divider" />
    </div>
  );
}

export default CommentArea;
