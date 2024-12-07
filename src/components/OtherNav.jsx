import React from "react";
import "./OtherNav.css";
import { useNavigate } from "react-router-dom";

import { Stack, IconButton } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

export default function OtherNav(props) {
  const _navigate = useNavigate();
  return (
    <div className="other-nav sticky-top">
      <div className="container p-0">
        <Stack direction="row" alignItems="center" gap={5} py={1}>
          <IconButton
            onClick={() => {
              _navigate(-1);
            }}
          >
            <ArrowBackRoundedIcon sx={{ color: "white" }} />
          </IconButton>

          <h4>{props.title ?? "title"}</h4>
        </Stack>
      </div>
    </div>
  );
}
