import { Container } from "@material-ui/core";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/Footer.css";
import { Typography } from "antd";
const Footer = () => {
  const categories = useSelector((state) => state.categories.categories);
  
  return (
    <Container className="footer-container">
      <Box className="categories-footer">
        <Typography className="title-categories-footer">קטגוריות</Typography>
        <Box className="categories-items-footer">
          {Array.isArray(categories) &&
            categories.map((category, inx) => (
              <div className="a-category-footer">
                <Link to={`/categories/${category.id}`}>{category.name}</Link>
              </div>
            ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Footer;
