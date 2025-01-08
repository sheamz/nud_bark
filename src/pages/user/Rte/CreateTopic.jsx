import React, { useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import JoditEditor from "jodit-react";
import "./CreateTopic.css";
import NavUser from "../../../components/NavUser";
import OtherNav from "../../../components/OtherNav";
import CircleIcon from "@mui/icons-material/Circle";
import { Cookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "../../../backend/axios.jsx";

import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Stack,
} from "@mui/material";

let cookie = new Cookies();

const CreateTopic = () => {
  const navigate = useNavigate();
  const editor = useRef(null);
  const [form_data, setFormData] = useState({
    uid: jwtDecode(cookie.get("atk")).uid,
    tit: "",
    cat: "",
    con: "",
  });

  const categories = [
    { name: "Ask Community", col: "cyan" },
    { name: "Marketplace", col: "lightblue" },
    { name: "Ask Suggestion", col: "green" },
    { name: "Off Topic", col: "yellow" },
    { name: "Issue", col: "pink" },
    { name: "Bark News", col: "violet" },
  ];

  const handlePublish = () => {
    // console.log(form_data);
    axios
      .post("/createPost.php", form_data)
      .then((res) => {
        if (res.data.status == 200) {
          alert(res.data.message);
          navigate(-1);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleClose = () => {
    navigate(-1);
  };

  const setData = (e) => {
    setFormData({ ...form_data, [e.target.name]: e.target.value });
  };

  const handleJodit = (e) => {
    // e.preventDefault();
    // console.log("teet");
    setFormData({ ...form_data, con: e });
  };

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typings...",
      // removeButtons: ["Break"],
      // showXPathInStatusbar: false,
      // showCharsCounter: false,
      // showWordsCounter: false,
      toolbarAdaptive: false,
      uploader: { insertImageAsBase64URI: true },
      addNewLine: false,
      statusbar: false,
      buttons: [
        "bold",
        "italic",
        "underline",
        "|",
        "strikethrough",
        "superscript",
        "subscript",
        "|",
        "ul",
        "ol",
        "|",
        "font",
        "align",
        "|",
        "link",
        "image",
      ],
    }),
    []
  );

  return (
    <div className="blue-bg">
      <OtherNav title={"Create New Topic"} />
      <div className="container p-0 mt-5">
        <div className="create-topic-container">
          <Stack direction="row" gap={5}>
            <TextField
              id="input_title"
              label="Title*"
              variant="outlined"
              name="tit"
              sx={{ borderRadius: "20px", width: "100%" }}
              onInput={setData}
            />

            <FormControl sx={{ minWidth: 250 }}>
              <InputLabel id="input_id_label">Select a Category</InputLabel>
              <Select
                labelId="input_id_label"
                id="input_id"
                value={form_data.cat}
                onChange={setData}
                autoWidth
                label="Select a Category"
                sx={{ borderRadius: "20px" }}
                name="cat"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>

                {categories.map((data, index) => (
                  <MenuItem value={data.name} key={index}>
                    <Stack direction="row" gap={2} alignItems="center">
                      <CircleIcon fontSize="small" sx={{ color: data.col }} />
                      {data.name}
                    </Stack>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <JoditEditor
            ref={editor}
            value={form_data.con}
            config={config}
            onBlur={handleJodit}
            // onChange={handleJodit}
          />

          <div className="buttons">
            <button className="close-btn" onClick={handleClose}>
              Close
            </button>
            <button className="publish-btn" onClick={handlePublish}>
              <FiSend style={{ marginRight: "8px" }} /> Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTopic;
