import React from "react";
import "./Home.css";

const HomeUpper = () => {
  return (
    <div className="container">
      <div className="section">
        <div className="header">
          <h3>TOP CATEGORIES</h3>
          <a href="#">SEE MORE</a>
        </div>
        <div className="card blue">
          {/* <div className="icon">?</div> */}
        </div>
        <div className="card green"></div>
        <div className="card yellow"></div>
      </div>
      <div className="section">
        <div className="header">
          <h3>BARK NEWS</h3>
          <a href="#">SEE MORE</a>
        </div>
        <div className="card teal"></div>
        <div className="card teal"></div>
        <div className="card teal"></div>
      </div>
    </div>
  );
};

export default HomeUpper;
