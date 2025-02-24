import React, { useEffect, useState } from "react";
import AdminNav from "../AdminNav";
import "./Dashboard.css";
import { Stack } from "@mui/material";

import Chart from "react-apexcharts";
import Ranking from "./Ranking";
import axios from "../../../backend/axios";

export default function Dashboard() {
  let [analyticsData, setAnalyticsData] = useState({
    user_label: [],
    user_count: [],
    cat_label: [],
    cat_count: [],
    top_contributors: [],
    most_popular_posts: [],
    most_viewed_posts: [],
  });
  let active = location.pathname;

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
        categories: analyticsData.user_label,
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
        data: analyticsData.user_count,
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
      series: analyticsData.cat_count,
      labels: analyticsData.cat_label,
    },
  };

  useEffect(() => {
    axios
      .get("/getAnalytics.php")
      .then((res) => {
        setAnalyticsData({
          user_label: res.data.user_count.categories,
          user_count: res.data.user_count.values,
          cat_label: res.data.post_count.categories,
          cat_count: res.data.post_count.values,
          top_contributors: res.data.top_contributors,
          most_popular_posts: res.data.most_popular_posts,
          most_viewed_posts: res.data.most_viewed_posts,
        });
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
            <Ranking analyticsData={analyticsData} />
          </Stack>
        </div>
      </div>
    </div>
  );
}
