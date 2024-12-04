import React from "react";
import AdminNav from "../AdminNav";
import "./Dashboard.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

// charts
import Chart from "react-apexcharts";

export default function Dashboard() {
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
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
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
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  };

  let cat_chart = {
    options: {
      colors: [
        "#1F2A6B",
        "#4A5ABD",
        "#1A204C",
        "#5072D4",
        "#1C2844",
        "#3C55AD",
        "#17234E",
        "#536ED0",
        "#1F295C",
        "#4756C2",
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
      series: [44, 55, 13, 33],
      labels: ["Apple", "Mango", "Orange", "Watermelon"],
    },
  };

  return (
    <div>
      <AdminNav active={active} />
      <div className="container p-0 mt-5">
        <div className="admin-dash" style={{ width: "100%" }}>
          <h2>Dashboard</h2>
          <div className="row m-0 mt-5 justify-content-around">
            <div className="users-chart">
              <Chart
                options={user_chart.options}
                series={user_chart.series}
                type="bar"
                width="600"
              />
              {/* <Button variant="contained">go</Button>? */}
              {/* <Link to={"/user-management"}>manage users --{">"}</Link> */}
            </div>
            <div className="cat-chart">
              <Chart
                options={cat_chart.options}
                series={cat_chart.options.series}
                type="pie"
                width="500"
              />
            </div>
          </div>

          <div className="row m-0 mt-5 justify-content-around">
            <div className="users-chart">
              <Chart
                options={user_chart.options}
                series={user_chart.series}
                type="bar"
                width="600"
              />
              {/* <Button variant="contained">go</Button>? */}
              {/* <Link to={"/user-management"}>manage users --{">"}</Link> */}
            </div>
            <div className="cat-chart">
              <Chart
                options={cat_chart.options}
                series={cat_chart.options.series}
                type="pie"
                width="500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
