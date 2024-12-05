import React from "react";
import "./ALT.css";

const ALTtblTemplate = () => {
  const alt = [
    {
      alttopicName: "Looking for my section: INF290",
      altcategory: "Ask Community",
      altauthor: "basher",
      altusername: "@basher",
      altreplies: 100,
      altviews: 100,
      altdatePosted: "11/29/2024",
    },
  ];

  return (
    <div className="your-alt">
      <div className="header-alt">
        <div className="alt-header">Topic</div>
        <div className="alt-header-details">
            <div>Author</div>
          <div>Replies</div>
          <div>Views</div>
          <div>Date Posted</div>
        </div>
      </div>

      {alt.map((altItem, index) => (
        <div key={index} className="alt-box">
          <div className="alt-header">
            <h3>{altItem.alttopicName}</h3>
            <span className="category-alt">{altItem.altcategory}</span>
          </div>
          <div className="alt-body">
            <div className="alt-details">
                <div className="authordet">
                <div>{altItem.altauthor}</div>
                <div>{altItem.altusername}</div>

                </div>
              <div>{altItem.altreplies}</div>
              <div>{altItem.altviews}</div>
              <div>{altItem.altdatePosted}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ALTtblTemplate;
