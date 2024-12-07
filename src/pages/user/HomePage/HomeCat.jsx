import React from "react";
import "./Home.css";
import Header from "../../../components/Header";
import { Stack } from "@mui/material";

export default function HomeCat() {
  const cat = [
    { name: "Ask Community" },
    { name: "Market Place" },
    { name: "Suggestion" },
    { name: "Off Topic" },
    { name: "Issue" },
    { name: "Bark News" },
  ];

  return (
    <Stack gap={2}>
      <Header title={"Categories"} />
      <div className="box-row-cat">
        {cat.map((data, index) => (
          <div className="box" key={index} style={{}}>
            {data.name}
          </div>
        ))}
      </div>
    </Stack>
  );
}
