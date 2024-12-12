import React from "react";
import "./Home.css";
import { Stack, Typography } from "@mui/material";
import { TiMessages } from "react-icons/ti";
import { FaExclamationCircle, FaBook } from "react-icons/fa"; // Importing icons from react-icons
import Header from "../../../components/Header";

const categories = [
  { color: "blue", name: "Ask Community", icon: <TiMessages className="icon blue-icon" /> },
  { color: "green", name: "Issue", icon: <FaExclamationCircle className="icon green-icon" /> },
  { color: "yellow", name: "Off topic", icon: <FaBook className="icon yellow-icon" /> },
];

const newsItems = [
  { title: "News Title 1", date: "2023-10-01" },
  { title: "News Title 2", date: "2023-10-02" },
  { title: "News Title 3", date: "2023-10-03" },
];

const HomeUpper = () => {
  return (
    <Stack direction="row" gap={5} m={0}>
      <Stack flex={1} gap={2}>
        <Header title={"Top Categories"} />
        {categories.map((category, index) => (
          <div key={index} className={`card ${category.color}`}>
            <div className="icon-container-upper">
              {category.icon}
              <Typography variant="h6">{category.name}</Typography>
            </div>
          </div>
        ))}
      </Stack>

      <Stack flex={1} gap={2}>
        <Header title={"Bark News"} />
        {newsItems.map((news, index) => (
          <div key={index} className="card teal">
            <Typography variant="h6">{news.title}</Typography>
            <Typography variant="body2">{news.date}</Typography>
          </div>
        ))}
      </Stack>
    </Stack>
  );
};

export default HomeUpper;