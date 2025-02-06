import React, { useEffect, useState } from "react";
import AdminNav from "../AdminNav";
import "./Dashboard.css";
import { Avatar, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

// charts
import Chart from "react-apexcharts";
import Ranking from "./Ranking";
import axios from "../../../backend/axios";

export default function Dashboard() {
  let [user_count, setUserCount] = useState([]);
  let [user_cat, setUserCat] = useState([]);
  let [cat_series, setCatSeries] = useState([]);
  let [cat_labels, setCatLabels] = useState([]);
  let active = location.pathname;
  // alert(active);

  let user_chart = {
    options: {
      colors: ["#34418E"],
      chart: {
        id: "user-chart",
        fontFamily: "Poppins",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: user_cat,
      },
      title: {
        text: "Registered Users",
        align: "center",
        floating: false,
        margin: 40,
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          fontFamily: "Poppins",
          color: "#263238",
        },
      },
    },
    series: [
      {
        name: "New Users", // user count
        data: user_count,
      },
    ],
  };

  let cat_chart = {
    options: {
      colors: [
        "#4A6FA5",
        "#3B5998",
        "#4666B0",
        "#5C7EA6",
        "#5078B7",
        "#6181A1",
        "#49659C",
        "#5373B9",
        "#4F79A4",
        "#5B7FB1",
      ],
      chart: { id: "cat-chart", foreColor: "#34418E", fontFamily: "Poppins" },
      title: {
        text: "Categories",
        align: "center",
        floating: false,
        margin: 40,
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          fontFamily: "Poppins",
          color: "#263238",
        },
      },
      series: cat_series,
      labels: cat_labels,
    },
  };

  useEffect(() => {
    // fetch data
    axios
      .get("/getAnalytics.php")
      .then((res) => {
        // console.log(res.data.cat_count);
        setUserCount(res.data.user_count.values);
        setUserCat(res.data.user_count.categories);
        setCatSeries(res.data.post_count.values);
        setCatLabels(res.data.post_count.categories);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <AdminNav active={active} />
      <div className="container p-0 mt-5">
        <div className="admin-dash" style={{ width: "100%" }}>
          <h2>Dashboard</h2>
          <div className="row m-0 mt-5 justify-content-around">
            <div className="users-chart rounded-3">
              <Chart
                options={user_chart.options}
                series={user_chart.series}
                type="bar"
                width="600"
              />
            </div>
            <div className="cat-chart rounded-3">
              <Chart
                options={cat_chart.options}
                series={cat_chart.options.series}
                type="pie"
                width="500"
              />
            </div>
          </div>
          <Stack
            direction={"row"}
            gap={5}
            className="my-5 justify-content-around flex-wrap"
          >
            <Ranking />
          </Stack>
        </div>
      </div>
    </div>
  );
}
