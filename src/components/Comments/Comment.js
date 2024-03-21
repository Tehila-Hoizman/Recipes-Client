import { Avatar, Box } from "@material-ui/core";
import { Typography } from "antd";
import TimeAgo from "../Recipes/TimeAgo.js";
import "../../styles/Comments.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteComment, popComment } from "../../store/commentsSlice.js";
const Comment = (props) => {
  const { comment } = props;
  const dispatch = useDispatch();
  const image =comment && comment.urlImageUser ? comment.urlImageUser : null;

  const handleClick = () => {
    dispatch(deleteComment(comment.id));
    dispatch(popComment(comment.id));
  };

  useEffect(() => {
    console.log(comment);
  }, [comment]);
  return (
    <Box className="comment-container">
      {/* <Avatar
        alt="Remy Sharp"
        src="../../images/profile.png"
        className="user-avatar user-avatar-comment"
      /> */}
      <Avatar sx={{ bgcolor: "primary" }}>
        {
          <img
            src={image ? image : "../../images/profile.png"}
            className="profile-image"
          />
        }
        {/* {user.firstName[0]} */}
      </Avatar>
      <Box className="comment-box">
        <Box className="comment-detail-box">
          <Box className="user-box">
            <Typography variant="h6" component="h6" className="user-name">
              {comment.userName}
            </Typography>
          </Box>
          <Box className="time-ago-box">
            <TimeAgo date={new Date(comment.commentDate)} />
          </Box>
        </Box>
        <Box className="comment-content-box">
          <Typography
            variant="body1"
            component="p"
            className="comment-content-text"
          >
            {comment.content}
          </Typography>
        </Box>
        {/* <button onClick={handleClick} className="btn btn-danger">מחק</button> */}
      </Box>
    </Box>
  );
};

export default Comment;
