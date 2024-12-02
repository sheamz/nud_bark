import React from "react";
import "./ConversationPage.css"
import Content from "./Content";
import CommentArea from "./CommentArea";
import CommentLayout from "./CommentLayout"
import ReplyLayout from "./ReplyLayout";

function ConversationPage() {
    return (
        <div className="bg"> 
          <Content />
          <CommentArea />
          <CommentLayout />
          <ReplyLayout />
        </div>
      );
}

export default ConversationPage;
