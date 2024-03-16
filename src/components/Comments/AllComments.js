import { useSelector } from "react-redux";
import Comment from "./Comment.js";
import { Box } from "@material-ui/core";
import { useEffect, useState } from "react";
import { array } from "yup";

const AllComments = (props) => {
  const comments = useSelector((state) => state.comments.comments);
  const {id} = props;
  const [filteredComments,setFilteredComments] = useState([]);
  useEffect(() => {
    if(Array.isArray(comments)){
      setFilteredComments(comments
        .filter((comment) => comment.recipeId === id)
        .sort((a, b) => new Date(b.commentDate) - new Date(a.commentDate))
      );    }
}
    ,[comments])
  return (
    <>
      {Array.isArray(filteredComments)&&filteredComments.length > 0 && (
        <Box className="all-comments">
          {filteredComments.map((comment) => {
            return <Comment key={comment.id} comment={comment} />;
          })}
        </Box>
      )}
    </>
  );
};

export default AllComments;
