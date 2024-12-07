import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PostCard.css";
import { Avatar, Stack, IconButton } from "@mui/material";
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
      {_selected_posts.map((data, index) => (
        <Link key={index} to={"/browse/post/pid=" + data.uname}>
          <div className="post-container">
            <div className="post-section">
              <Avatar alt={data.uname}>{data.uname[1]}</Avatar>
              <div className="post-detail">
                {/* title */}
                <h3>{data.tit}</h3>
                {/* category */}
                <span style={{ padding: "3px" }}>{data.cat}</span>
              </div>
            </div>

            <div className="post-section">
              <div className="post-stat">
                {/* number of views */}
                <VisibilityIcon />
                <p>{data.views}</p>
              </div>
              <div className="post-stat">
                {/* number of comments */}
                <CommentRoundedIcon />
                <p>{data.com}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
      {/* pagination */}

      {_pagination ? (
        <Stack
          direction="row"
          justifyContent="center"
          mb={2}
          gap={5}
          alignItems="center"
        >
          <IconButton
            disabled={_current_page == 0 ? true : false}
            onClick={handlePrevious}
          >
            <ArrowBackIosNewRoundedIcon />
          </IconButton>

          <small>
            page {_current_page + 1} of {_total_pages}{" "}
          </small>
          <IconButton
            disabled={_current_page + 1 == _total_pages ? true : false}
            onClick={handleNext}
          >
            <ArrowForwardIosRoundedIcon />
          </IconButton>
        </Stack>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PostCard;
