import { Box, Button, FormControl, TextareaAutosize } from "@material-ui/core";
import "../../styles/AddComment.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addComment } from "../../store/commentsSlice";
import { set } from "immutable";
import { useNavigate } from "react-router";
import DialogMessage from "../Dialogs/DialogMessage";
import DialogAnswer from "../Dialogs/DialogAnswer";
const AddComment = (props) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const user = useSelector((state) => state.login.user);
  const isConnect = useSelector((state) => state.login.isConnect);
  const { recipeId } = props;
  const navigate = useNavigate();
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFailed, setOpenFailed] = useState(false);
  const [openValidate, setOpenValidate] = useState(false);

  const goSignIn = () => {
    navigate("/signin");
  };

  const handleClick = async () => {
    if (!isConnect) {
      setOpenFailed(true);
      return;
    }
    if(content===""){
        setOpenValidate(true);
        return;
        }
    let obj = {
      content: content,
      commentDate: new Date().toISOString(),
      replyToId: 0,
      userId: user.id,
      recipeId: recipeId,
    };
    try {
      const resultAction = await dispatch(addComment(obj));
      if (addComment.fulfilled.match(resultAction)) {
        setContent("");
        debugger;
        setOpenSuccess(true);
      }
    } catch (err) {
      console.error("Failed to add comment: ", err);
    }
  };

  const handleChange = (e) => {
    setContent(e.target.value);
    console.log("content", content);
  };

  return (
    <Box className="box-add-comment" style={{ width: "80%" }}>
      <FormControl
        className="form-add-comment-content"
        style={{ width: "100%" }}
      >
        <TextareaAutosize
          onChange={handleChange}
          value={content}
          className="txt-add-comment-content"
          style={{ width: "100%", height: "130px" }}
        />
      </FormControl>
      <Button className="btn-add-comment" onClick={handleClick}>
        שליחה
      </Button>
      <DialogMessage handleClick={()=>{}} setOpen={setOpenSuccess} open={openSuccess} message="התגובה נוספה בהצלחה"/>
      <DialogMessage handleClick={()=>{}} setOpen={setOpenValidate} open={openValidate} message="לא הוכנסה תגובה"/>
      <DialogAnswer setOpen={setOpenFailed} open={openFailed} message="על מנת להגיב עליך להתחבר לאתר"
      btn1="להתחברות" btn2="ביטול" handleBtn1={goSignIn} handleBtn2={()=>{}}/>
    </Box>
  );
};

export default AddComment;
