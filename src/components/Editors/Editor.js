import { Avatar } from "@material-ui/core";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../../styles/Editor.css"
const Editor = (props) => {
    let {editor} = props;
useEffect(() => {
    console.log(editor);
    }
    , [editor]);
  return (        

    <Box className="editor-box"><Link to={`/editors/${editor.id}`}>
      <Avatar
        alt="Remy Sharp"
        src={editor&&editor.image ? editor.image : "../../images/profile.png"}
        sx={{ width: "200px", height: "200px" }}
        className="editor-profile"
      />
      <Typography  className="editor-name">{editor.name}</Typography></Link>
    </Box>
  );
};

export default Editor;
