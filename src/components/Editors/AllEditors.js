import { useDispatch, useSelector } from "react-redux";
import Editor from "./Editor";
import { useEffect } from "react";
import { Box, Container, Typography } from "@material-ui/core";
import "../../styles/AllEditors.css"
import { getEditors } from "../../store/recipiesSlice";
const AllEditors = () => {
  const dispatch = useDispatch();
    const editors = useSelector((state) => state.recipies.editors);
    return ( 
      <Container className="allEditors">
        <Box className="allEditors-header">
          <Typography className="allEditors-header-title">העורכים שלנו</Typography>
        </Box>
      {editors.map((editor, inx) => {
        return (
          <Box className="byEditors-box">
            <Editor key={inx} editor={editor} />
          </Box>
        );
      })}
    </Container>
     );
}
 
export default AllEditors;