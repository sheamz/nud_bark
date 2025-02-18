import React, { useState } from "react";
import { Avatar, Box, Button, TextField, Stack } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { formatDistanceToNow } from "date-fns";

import axios from "../../../backend/axios";

import "./ConversationPage.css";

function ReplyLayout(props) {
  // console.log(props.reply);
  const [maxReply, setMaxReply] = useState(0);

  const [toggleInputReply, setToggleInputReply] = useState(false);
  const [replyData, setReplyData] = useState({
    pid: props.reply.pid,
    com: "",
    pcid: props.reply.cid,
  });
  const maxWords = 200;

  let date = new Date(props.reply.date);
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
        props.getPosts;
      })
      .catch((err) => {
        console.error(err);
      });

    setReplyData({ ...replyData, com: "" });
    setToggleInputReply(!toggleInputReply);
  };

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
            gap={3}
            justifyContent="space-between"
            alignItems="center"
          >
            <p className="replyCount">
              {replyData.com.trim() === ""
                ? 0
                : replyData.com.trim().split(/\s+/).length}
              /{maxWords} words
            </p>
            <div>
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
            </div>
          </Stack>
        </Box>
      </div>
      {/* <ReplyLayout /> */}
      <Stack gap={1}>
        {props.reply.replies && props.reply.replies.length > 0 ? (
          props.reply.replies
            .slice()
            .reverse()
            .slice(0, maxReply)
            .map((reply) => <ReplyLayout key={reply.cid} reply={reply} />)
        ) : (
          <div></div>
        )}
      </Stack>
      <Stack direction="row" justifyContent="end" gap={3}>
        {props.reply.replies && props.reply.replies.length > maxReply ? (
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

export default ReplyLayout;
