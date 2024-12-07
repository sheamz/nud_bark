import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header(props) {
  return (
    <div className="header-prop">
      <h3>{props.title ?? "title"}</h3>
      {props.link ? (
        <Link to={props.link}>
          <small>see more {">>"}</small>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
