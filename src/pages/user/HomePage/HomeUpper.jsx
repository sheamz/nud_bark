import React from "react";

import "./Home.css";

import { Stack } from "@mui/material";

import Header from "../../../components/Header";

const HomeUpper = () => {
  return (
    <Stack direction="row" gap={5} m={0}>
      <Stack flex={1} gap={2}>
        <Header title={"Top Categories"} />
        <div className="card blue"></div>
        <div className="card green"></div>
        <div className="card yellow"></div>
      </Stack>

      <Stack flex={1} gap={2}>
        <Header title={"Bark News"} />
        <div className="card teal"></div>
        <div className="card teal"></div>
        <div className="card teal"></div>
      </Stack>
    </Stack>
  );
};

export default HomeUpper;
