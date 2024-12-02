import React from "react";
import "./Home.css";

export default function HomeCat() {
  return (
    <div className="container-cat">
      <div className="box-header-cat">
        <h3>CATEGORIES</h3>
      </div>
      <div className="box-row-cat">
        <div className="box blue-border"></div>
        <div className="box green-border"></div>
        <div className="box red-border"></div>
      </div>
      <div className="box-row-cat"> 
        <div className="box purple-border"></div>
        <div className="box orange-border"></div>
        <div className="box yellow-border"></div>
      </div>
    </div>
  );
}
