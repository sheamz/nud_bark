import React, { useState } from "react";

import { formatDistanceToNow } from "date-fns";
import { Avatar, Button, Box, TextField, Stack } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import SendIcon from "@mui/icons-material/Send";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CloseIcon from "@mui/icons-material/Close";

import ReplyLayout from "./ReplyLayout";

import "./ConversationPage.css";
import axios from "../../../backend/axios.jsx";

function CommentLayout(props) {
  const [maxReply, setMaxReply] = useState(0);
  const [toggleInputReply, setToggleInputReply] = useState(false);
  const [replyData, setReplyData] = useState({
    pid: props.com.pid,
    com: "",
    pcid: props.com.cid,
  });
  const maxWords = 200;
  let date = new Date(props.com.date);
  let formattedDate = isNaN(date)
    ? "Invalid date"
    : formatDistanceToNow(date, { addSuffix: true });

  const handleChange = (e) => {
    const words = e.target.value.trim().split(/\s+/);
    if (words.length <= maxWords) {
      setReplyData({ ...replyData, [e.target.name]: e.target.value });
    }
  };

  const submitReply = (e) => {
    e.preventDefault();

    axios
      .post("/createComment.php", replyData)
      .then((res) => {
        props.getPosts();
      })
      .catch((err) => {
        console.error(err);
      });

    setReplyData({ ...replyData, com: "" });
    setToggleInputReply(!toggleInputReply);
  };

  return (
    <div>
      <div className="comment-container">
        <div className="comment-header">
          <Avatar size="small"></Avatar>
          <div className="author-info">
            <small className="author-name">
              {props.com.uname ?? props.com.uid}
            </small>
            <p className="comment-date">posted {formattedDate}</p>
          </div>
        </div>
        <p className="content">{props.com.content}</p>
        <Button
          variant="text"
          startIcon={<ReplyIcon />}
          size="small"
          sx={{
            color: "grey",
            textTransform: "capitalize",
            borderRadius: "20px",
            display: !toggleInputReply ? "inline" : "none",
          }}
          onClick={() => {
            setToggleInputReply(!toggleInputReply);
          }}
        >
          Reply
        </Button>
        <Box
          component="form"
          display={toggleInputReply ? "block" : "none"}
          onSubmit={submitReply}
          marginTop="20px"
        >
          <TextField
            id="input_reply"
            name="com"
            placeholder="Say something..."
            value={replyData.com}
            multiline
            rows={4}
            sx={{ width: "100%" }}
            onChange={handleChange}
          />
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <p className="replyCount">
              {replyData.com.trim() === ""
                ? 0
                : replyData.com.trim().split(/\s+/).length}
              /{maxWords} words
            </p>
            <Stack direction="row" gap={3}>
              <Button
                variant="text"
                startIcon={<CloseIcon />}
                size="small"
                sx={{
                  width: "fit-content",
                  color: "grey",
                  textTransform: "capitalize",
                  borderRadius: "20px",
                }}
                onClick={() => {
                  setToggleInputReply(!toggleInputReply);
                  setReplyData({ ...replyData, com: "" });
                }}
              >
                Cancel
              </Button>
              <Button
                variant="text"
                startIcon={<SendIcon />}
                type="submitButton"
                size="small"
                sx={{
                  width: "fit-content",
                  color: "grey",
                  textTransform: "capitalize",
                  borderRadius: "20px",
                }}
              >
                Send
              </Button>
            </Stack>
          </Stack>
        </Box>
      </div>
      <Stack gap={1}>
        {props.com.replies && props.com.replies.length > 0 ? (
          props.com.replies
            .slice()
            .reverse()
            .slice(0, maxReply)
            .map((reply) => (
              <ReplyLayout
                key={reply.cid}
                reply={reply}
                getPosts={props.getPosts()}
              />
            ))
        ) : (
          <div></div>
        )}
      </Stack>
      <Stack direction="row" justifyContent="end" gap={3}>
        {props.com.replies && props.com.replies.length > maxReply ? (
          <Button
            size="small"
            sx={{ color: "grey", textTransform: "lowercase" }}
            onClick={() => {
              setMaxReply(maxReply + 2);
            }}
          >
            see more <KeyboardArrowDownIcon />
          </Button>
        ) : (
          <div></div>
        )}
        {maxReply > 0 && (
          <Button
            size="small"
            sx={{ color: "grey", textTransform: "lowercase" }}
            onClick={() => {
              setMaxReply(0);
            }}
          >
            hide replies <KeyboardArrowUpIcon />
          </Button>
        )}
      </Stack>
    </div>
  );
}

export default CommentLayout;
