import React, { useEffect, useState } from "react";
import "./ConversationPage.css";
import Content from "./Content";
import CommentLayout from "./CommentLayout.jsx";

import { Paper, Stack, Button } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { formatDistanceToNow } from "date-fns";

import OtherNav from "../../../components/OtherNav";
import axios from "../../../backend/axios.jsx";

function ConversationPage() {
  const pid = window.location.pathname.split("/")[3];
  const [post, setPost] = React.useState({});
  const [maxComCount, setMaxComCount] = useState(5);

  const getPosts = () => {
    axios
      .post(`/getPost.php`, { pid: pid })
      .then((res) => {
        setPost(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getPosts();
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
        .post("/createComment.php", { pid, com })
        .then((res) => {
          alert(res.data.message);
          getPosts();
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
          <Stack gap={1}>
            {post.comments && post.comments.length > 0 ? (
              post.comments
                .slice()
                .reverse()
                .slice(0, maxComCount)
                .map((com) => {
                  let date = new Date(com.date);
                  let formattedDate = isNaN(date)
                    ? "Invalid date"
                    : formatDistanceToNow(date, { addSuffix: true });
                  return (
                    <CommentLayout
                      key={com.cid}
                      com={com}
                      getPosts={getPosts}
                    />
                  );
                })
            ) : (
              <small>
                <i>no comments</i>
              </small>
            )}
          </Stack>

          <Stack direction="row" justifyContent="center" gap={3}>
            {post.comments && post.comments.length > maxComCount ? (
              <Button
                size="small"
                sx={{ color: "grey", textTransform: "lowercase" }}
                onClick={() => {
                  setMaxComCount(maxComCount + 3);
                }}
              >
                see more <KeyboardArrowDownIcon />
              </Button>
            ) : (
              <div />
            )}
            {maxComCount > 5 && (
              <Button
                size="small"
                sx={{ color: "grey", textTransform: "lowercase" }}
                onClick={() => {
                  setMaxComCount(5);
                }}
              >
                hide comments <KeyboardArrowUpIcon />
              </Button>
            )}
          </Stack>
        </Paper>
      </div>
    </>
  );
}

export default ConversationPage;
