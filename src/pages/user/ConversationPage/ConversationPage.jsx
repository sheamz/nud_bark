import React, { useEffect } from "react";
import "./ConversationPage.css";
import Content from "./Content";
import CommentArea from "./CommentArea";
import CommentLayout from "./CommentLayout";
import ReplyLayout from "./ReplyLayout";

import { Paper } from "@mui/material";

import OtherNav from "../../../components/OtherNav";
import axios from "../../../backend/axios.jsx";

function ConversationPage() {
  const pid = window.location.pathname.split("/")[3];
  const [post, setPost] = React.useState({});

  useEffect(() => {
    axios
      .post(`/getPost.php`, { pid: pid })
      .then((res) => {
        setPost(res.data.data[0]);
      })
      .catch((err) => {
        console.error(err);
      });

    axios.post("/addView.php", { pid: pid });
  }, []);

  return (
    <>
      <OtherNav title={"Posts"} />
      <div className="container p-0 my-5">
        {/* <div className="bg"> */}
        <Paper elevation={3} sx={{ padding: "40px", width: "100%" }}>
          <Content data={post} />
          <CommentArea />
          <CommentLayout />
          <ReplyLayout />
        </Paper>
        {/* </div> */}
      </div>
    </>
  );
}

export default ConversationPage;
