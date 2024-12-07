import React from "react";
import "./ConversationPage.css";
import Content from "./Content";
import CommentArea from "./CommentArea";
import CommentLayout from "./CommentLayout";
import ReplyLayout from "./ReplyLayout";
import OtherNav from "../../../components/OtherNav";

function ConversationPage() {
  return (
    <>
      <OtherNav title={"Posts"} />
      <div className="container p-0 mt-5">
        <div className="bg">
          <Content />
          <CommentArea />
          <CommentLayout />
          <ReplyLayout />
        </div>
      </div>
    </>
  );
}

export default ConversationPage;
