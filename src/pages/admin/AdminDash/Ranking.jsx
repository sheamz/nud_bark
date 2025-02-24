import React from "react";

import "./Ranking.css";

import Paper from "@mui/material/Paper";
import { Avatar, Button, Stack } from "@mui/material";
import Divider from "@mui/material/Divider";

export default function Ranking(props) {
  let top_contributors = props.analyticsData.top_contributors ?? [];
  let total_post = 0;
  top_contributors.forEach((element) => {
    total_post += element.count;
  });
  let most_popular = props.analyticsData.most_popular_posts ?? [];
  let total_comments = 0;
  most_popular.forEach((element) => {
    total_comments += element.com_count;
  });
  let most_viewed_posts = props.analyticsData.most_viewed_posts.post ?? [];
  let total_views = props.analyticsData.most_viewed_posts.total_views ?? 0;

  return (
    <>
      <Paper
        elevation={5}
        sx={{ width: "fit-content", height: "fit-content" }}
        className="top-contibutor p-4 rounded-3"
      >
        <h6>Top Contributor</h6>
        <Divider sx={{ border: "2px solid gray", borderRadius: "10px" }} />

        {top_contributors.map((data, index) => (
          <Stack
            key={index}
            sx={{ mt: "20px" }}
            justifyContent={"space-between"}
            spacing={2}
            direction={"row"}
          >
            <Avatar>
              {data.username == null
                ? data.uid.substring(0, 1)
                : data.username.substring(0, 1)}
            </Avatar>
            <div>
              <p className="uname">{data.username ?? data.uid}</p>
              <p className="email">{data.email}</p>
            </div>
            <p className="count">
              {data.count} <small>posts</small>
            </p>
            <p className="percent">
              {((data.count / total_post) * 100).toFixed(1)}%
            </p>
          </Stack>
        ))}
      </Paper>
      <Paper
        elevation={5}
        sx={{ width: "fit-content", height: "fit-content" }}
        className="top-contibutor p-4 rounded-3"
      >
        <h6>Most Popular</h6>
        <Divider sx={{ border: "2px solid gray", borderRadius: "10px" }} />

        {most_popular.map((data, index) => {
          return (
            <Stack
              key={index}
              sx={{
                mt: "20px",
              }}
              spacing={2}
              direction={"row"}
              justifyContent={"space-between"}
            >
              <div>
                <p className="uname">{data.title}</p>
                <p className="email">{data.category}</p>
              </div>
              <p className="count">
                {data.com_count} <small>comments</small>
              </p>
              <p className="percent">
                {" "}
                {((data.com_count / total_comments) * 100).toFixed(1)}%
              </p>
            </Stack>
          );
        })}
      </Paper>
      <Paper
        elevation={5}
        sx={{ width: "fit-content", height: "fit-content" }}
        className="top-contibutor p-4 rounded-3"
      >
        <h6>Most Views</h6>
        <Divider sx={{ border: "2px solid gray", borderRadius: "10px" }} />

        {most_viewed_posts.map((data, index) => {
          return (
            <Stack
              sx={{ mt: "20px" }}
              justifyContent={"space-between"}
              spacing={2}
              direction={"row"}
              key={index}
            >
              <div>
                <p className="uname">{data.title}</p>
                <p className="email">{data.category}</p>
              </div>
              <p className="count">
                {data.view_count}
                <small>views</small>{" "}
              </p>
              <p className="percent">
                {((data.view_count / total_views) * 100).toFixed(1)}%
              </p>
            </Stack>
          );
        })}
      </Paper>
    </>
  );
}
