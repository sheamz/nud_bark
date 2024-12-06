import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import JoditEditor from "jodit-react";
import "./CreateTopic.css";
import NavUser from "../../../components/NavUser";
import OtherNav from "../../../components/OtherNav";

const CreateTopic = () => {
  const [question, setQuestion] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [category, setCategory] = useState("");

  const categories = [
    "Ask Community",
    "Marketplace",
    "Suggestions",
    "Off Topic",
    "Issue",
    " Bark News",
  ];

  const handlePublish = () => {
    console.log("Topic Published");
    console.log("Question:", question);
    console.log("Content:", editorContent);
    console.log("Category:", category);
  };

  const handleClose = () => {
    console.log("Topic Creation Closed");
  };

  return (
    <>
      {/* <NavUser /> */}
      <OtherNav title={"Create New Topic"} />
      <div className="container p-0 mt-5">
        <div className="create-topic-container">
          {/* <header className="header">
          <button className="plus-sign">
            <FaPlus />
          </button>
          <h1>CREATE NEW TOPIC</h1>
          <span className="date">{new Date().toLocaleDateString()}</span>
        </header> */}

          <div className="form-container">
            <div className="form-left">
              <label htmlFor="question">WHAT IS YOUR QUESTION OR TOPIC?</label>
              <textarea
                id="question"
                placeholder="Title *"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>

            <div className="form-right">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled>
                  -- Select a category --
                </option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <JoditEditor
            value={editorContent}
            config={{ readonly: false }}
            onChange={(newContent) => setEditorContent(newContent)}
          />

          <div className="buttons">
            <button className="publish-btn" onClick={handlePublish}>
              <FiSend style={{ marginRight: "8px" }} /> Publish
            </button>
            <button className="close-btn" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateTopic;
