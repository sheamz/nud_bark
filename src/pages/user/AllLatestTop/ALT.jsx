import React, { useState } from "react"; 
import NavUser from "../../../components/NavUser"; 
import { Link } from "react-router-dom";
import ALTNav from "./ALTNav";
import ALTtblTemplate from "./ALTtblTemplate";
import "./ALT.css";

const ALT = () => { 
  return (
    <>
      <NavUser /> 
      <ALTNav />
      <ALTtblTemplate />
    </>
  );
};

export default ALT;
