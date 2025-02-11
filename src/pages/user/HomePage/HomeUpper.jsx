import React, { useEffect, useState } from "react";
import "./Home.css";
import { Stack, Typography } from "@mui/material";
import { TiMessages } from "react-icons/ti";
import { FaExclamationCircle, FaBook } from "react-icons/fa"; // Importing icons from react-icons
import Header from "../../../components/Header";
import axios from "../../../backend/axios";
import { Link } from "react-router-dom";

// const categories = [
//   {
//     color: "blue",
//     name: "Ask Community",
//     icon: <TiMessages className="icon blue-icon" />,
//   },
//   {
//     color: "green",
//     name: "Issue",
//     icon: <FaExclamationCircle className="icon green-icon" />,
//   },
//   {
//     color: "yellow",
//     name: "Off topic",
//     icon: <FaBook className="icon yellow-icon" />,
//   },
// ];

// const newsItems = [
//   { title: "News Title 1", date: "2023-10-01" },
//   { title: "News Title 2", date: "2023-10-02" },
//   { title: "News Title 3", date: "2023-10-03" },
// ];

const HomeUpper = () => {
  var [newsItems, setNewsItems] = useState([]);
  var [categories, setCategories] = useState([]);
  useEffect(() => {
    axios
      .get("getLatestNews.php")
      .then((res) => {
        setNewsItems(res.data.latest_news);
      })
      .catch((err) => {
        console.error("error in fetching data", err);
      });

    axios
      .get("getTopCategories.php")
      .then((res) => {
        setCategories(res.data.top_categories);
      })
      .catch((err) => {
        console.error("error in fetching data", err);
      });
  }, []);

  return (
    <Stack direction="row" gap={5} m={0}>
      <Stack flex={1} gap={2}>
        <Header title={"Top Categories"} />

        {categories.length == 0 ? (
          <div className={`card`}>
            <div className="icon-container-upper">
              <Typography variant="h6">no posts yet</Typography>
            </div>
          </div>
        ) : (
          categories.map((category, index) => {
            let bdr_left = "";
            let icon = "";

            switch (category.name) {
              case "Ask Community":
                bdr_left = "5px solid cyan";
                icon = (
                  <TiMessages className="icon" style={{ color: "cyan" }} />
                );
                break;

              case "Marketplace":
                bdr_left = "5px solid lightblue";
                icon = (
                  <TiMessages className="icon" style={{ color: "lightblue" }} />
                );

                break;

              case "Ask Suggestion":
                bdr_left = "5px solid green";
                icon = (
                  <TiMessages className="icon" style={{ color: "green" }} />
                );

                break;

              case "Off Topic":
                bdr_left = "5px solid yellow";
                icon = <FaBook className="icon" style={{ color: "yellow" }} />;

                break;

              case "Issue":
                bdr_left = "5px solid pink";
                icon = (
                  <FaExclamationCircle
                    className="icon"
                    style={{ color: "pink" }}
                  />
                );

                break;

              default:
                bdr_left = "5px solid violet";
                icon = (
                  <TiMessages className="icon" style={{ color: "violet" }} />
                );

                break;
            }

            return (
              <div
                key={index}
                className={`card`}
                style={{ borderLeft: bdr_left }}
              >
                <div className="icon-container-upper">
                  {icon}
                  <Typography variant="h6">{category.name}</Typography>
                </div>
              </div>
            );
          })
        )}
      </Stack>

      <Stack flex={1} gap={2}>
        <Header title={"Bark News"} />
        {newsItems.length == 0 ? (
          <div className="card">
            <Typography variant="h6">no news yet</Typography>
          </div>
        ) : (
          newsItems.map((news, index) => {
            return (
              <Link
                key={index}
                to={"/browse/post/" + news.pid}
                style={{ textDecoration: "none" }}
              >
                <div key={index} className="card teal">
                  <Typography variant="h6">{news.title}</Typography>
                  <Typography variant="body2">{news.date_created}</Typography>
                </div>
              </Link>
            );
          })
        )}
      </Stack>
    </Stack>
  );
};

export default HomeUpper;
