import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import Category from "./Category";
import { useSelector } from "react-redux";
import "../../styles/ByCategory.css";
import { Link } from "react-router-dom";
import { useState } from "react";
const ByCategories = () => {
  const categories = useSelector((state) => state.categories.categories);



  return (
    <div className="design-container">
      <Container className="byCategories">
        <Typography className="byCategories-title">
          הקטגוריות שלנו...
        </Typography>

        {Array.isArray(categories)&&categories.slice(0, 8).map((category, inx) => {
          return (
            <Box className="byCategories-box">
              <Category key={inx} category={category} />
            </Box>
          );
        })}
        <Box className="to-all-categories">
          <Link to="/categories">לכל הקטגוריות</Link>
        </Box>
      </Container>
    </div>
  );
};

export default ByCategories;
