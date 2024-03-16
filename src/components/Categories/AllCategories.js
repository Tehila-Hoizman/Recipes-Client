import { Box, Button, Typography } from "@material-ui/core";
import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import Category from "./Category";
import "../../styles/AllCategories.css";
import { useNavigate } from "react-router";
const AllCategories = () => {
  const categories = useSelector((state) => state.categories.categories);
  const navigate = useNavigate();
const handleClick = () => {
    navigate("/addCategory");
  }

  return (
    <Container className="allCategories">
              {/* <Box className="allCategories-header">
    <Typography className="allCategories-header-title">הקטגוריות שלנו</Typography>
  </Box> */}
      
 
            <Box className="categories-box">
          <Box className="categories-title-box">
            <Typography className="categories-title-txt">
              הקטגוריות שלנו
            </Typography>
            </Box>
            <Box  className="add-category-btn-box">
            <Button className="add-category-btn" onClick={handleClick}>הוספת קטגוריה</Button>
</Box>
          </Box>


      {categories.map((category, inx) => {
        return (
          <Box className="allCategories-box">
            <Category key={inx} category={category} />
          </Box>
        );
      })}
    </Container>
  );
};

export default AllCategories;
