import React from "react";
import AdminNav from "../AdminNav";
import "./Dashboard.css";
import { Avatar, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
// import Stack from "@mui/material";
// table
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";

// charts
import Chart from "react-apexcharts";
import Ranking from "./Ranking";

const rows = [
  {
    uid: "usr-1000",
    uname: "reztydde",
    email: "ddd@email.com",
    count: 9823,
    percent: "68%",
  },
  {
    uid: "usr-1002",
    uname: "shasha",
    email: "ddd@email.com",
    count: 9823,
    percent: "68%",
  },
];

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
        data: [30, 40, 45, 50, 49, 600, 70, 91],
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
            <div className="users-chart rounded-3">
              <Chart
                options={user_chart.options}
                series={user_chart.series}
                type="bar"
                width="600"
              />
              {/* <Button variant="contained">go</Button>? */}
              {/* <Link to={"/user-management"}>manage users --{">"}</Link> */}
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
