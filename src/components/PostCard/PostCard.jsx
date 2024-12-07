import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PostCard.css";
import { Avatar, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

const PostCard = (_props) => {
  const [_current_page, setCurrentPage] = useState(0);
  const _post_per_page = _props._post_per_page ?? 5;
  const _pagination = _props._pagination ?? true;
  const _navigate = useNavigate();

  const _total_pages = Math.ceil(_props.data.length / _post_per_page);

  const handleNext = () => {
    if (_current_page < _total_pages - 1) {
      setCurrentPage(_current_page + 1);
      _navigate(`/browse`);
    }
  };

  const handlePrevious = () => {
    if (_current_page > 0) {
      setCurrentPage(_current_page - 1);
      _navigate(`/browse`);
    }
  };

  const _start_index = _current_page * _post_per_page;

  const _selected_posts = _props.data.slice(
    _start_index,
    _start_index + _post_per_page
  );

  return (
    <div className="post-list">
      {_selected_posts.map((altItem, index) => (
        <Link key={index}>
          <div className="post-container">
            <div className="post-section">
              <Avatar>r</Avatar>
              <div className="post-detail">
                {/* title */}
                <h3>{altItem.alttopicName}</h3>
                {/* category */}
                <span style={{ padding: "3px" }}>{altItem.altcategory}</span>
              </div>
            </div>

            <div className="post-section">
              <div className="post-stat">
                {/* number of views */}
                <VisibilityIcon />
                <p>599d09</p>
              </div>
              <div className="post-stat">
                {/* number of comments */}
                <CommentRoundedIcon />
                <p>59909</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
      {/* pagination */}

      {_pagination ? (
        <Stack direction="row" justifyContent="center" mb={2} gap={5}>
          <ArrowBackIosNewRoundedIcon
            onClick={handlePrevious}
            color={_current_page == 0 ? "disabled" : ""}
            sx={{
              cursor: _current_page == 0 ? "not-allowed" : "pointer",
            }}
          />
          <small>
            page {_current_page + 1} of {_total_pages}{" "}
          </small>
          <ArrowForwardIosRoundedIcon
            onClick={handleNext}
            color={_current_page + 1 == _total_pages ? "disabled" : ""}
            sx={{
              cursor:
                _current_page + 1 == _total_pages ? "not-allowed" : "pointer",
            }}
          />
        </Stack>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PostCard;
