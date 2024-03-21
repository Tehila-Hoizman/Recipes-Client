import { Box, Container, Typography } from "@material-ui/core";
import Category from "../Categories/Category";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../styles/ByEditor.css"
import Editor from "./Editor";
import { useEffect } from "react";
const ByEditors = () => {
    const recipies = useSelector((state) => state.recipies.recipies);

    const editors = useSelector((state) => state.recipies.editors);
    useEffect(() => {
      window.scrollTo(0, 0);
    }
    ,[]);
  return (
    <div className="design-container">
    <Container className="byEditors">
      <Typography className="byEditors-title">העורכים שלנו...</Typography>
      {editors.slice(0,6).map((editor,inx)=>{
        return(
      <Box className="byEditors-box">
      <Editor key={inx} editor = {editor}/>
      </Box>)})}
      <Box className="to-all-editors">
              <Link to="/editors">לכל העורכים שלנו</Link>

      </Box>
    </Container></div>
  );
};

 
export default ByEditors;