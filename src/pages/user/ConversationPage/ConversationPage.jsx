import React, { useEffect, useState } from "react";
import "./ConversationPage.css";
import Content from "./Content";
import ReplyLayout from "./ReplyLayout.jsx";

import { Paper, Avatar, Stack, IconButton, Button } from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

import { formatDistanceToNow } from "date-fns";
import { Cookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

import OtherNav from "../../../components/OtherNav";
import axios from "../../../backend/axios.jsx";

let cookies = new Cookies();

function ConversationPage() {
  const pid = window.location.pathname.split("/")[3];
  const uid = jwtDecode(cookies.get("atk")).uid;
  const [post, setPost] = React.useState({});
  const [maxComCount, setMaxComCount] = useState(5);

  useEffect(() => {
    axios
      .post(`/getPost.php`, { pid: pid })
      .then((res) => {
        // console.log(res.data.data.comments);
        setPost(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });

    axios.post("/addView.php", { pid: pid });
  }, []);

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
    <>
      <OtherNav title={"Posts"} />
      <div className="container p-0 my-5">
        <Paper elevation={3} sx={{ padding: "40px", width: "100%" }}>
          <Content data={post} />
          {/* create comment form */}
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
                    disabled={
                      countWords(com) === 0 || countWords(com) > maxWords
                    }
                  >
                    Comment
                  </button>
                </div>
              </div>
            </form>
            <hr className="comment-divider" />
          </div>
          {/* comments */}
          {post.comments && post.comments.length > 0 ? (
            post.comments.slice(0, maxComCount).map((com) => {
              let date = new Date(com.date);
              let formattedDate = isNaN(date)
                ? "Invalid date"
                : formatDistanceToNow(date, { addSuffix: true });
              return (
                <div key={com.cid}>
                  <div className="comment-container">
                    <div className="comment-header">
                      <Avatar></Avatar>
                      <div className="author-info">
                        <p className="author-name">{com.uname ?? com.uid}</p>
                        <p className="comment-date">{formattedDate}</p>
                      </div>
                    </div>
                    <p>{com.content}</p>
                  </div>
                  {com.replies && com.replies.length > 0 ? (
                    com.replies.map((reply) => (
                      <ReplyLayout key={reply.cid} reply={reply} />
                    ))
                  ) : (
                    <div></div>
                  )}
                </div>
              );
            })
          ) : (
            <small>
              <i>no comments</i>
            </small>
          )}

          {post.comments && post.comments.length > maxComCount ? (
            <Stack direction="row" justifyContent="end" alignItems="center">
              <Button
                size="small"
                sx={{ color: "grey", textTransform: "lowercase" }}
                onClick={() => {
                  setMaxComCount(maxComCount + 3);
                }}
              >
                see more <KeyboardArrowDownIcon />
              </Button>
            </Stack>
          ) : (
            <div />
          )}
        </Paper>
      </div>
    </>
  );
}

export default ConversationPage;
