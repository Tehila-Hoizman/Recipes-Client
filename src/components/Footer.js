import { Container } from "@material-ui/core";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/Footer.css"
const Footer = () => {
    const categories = useSelector((state) => state.categories.categories);
    return ( 
        <Container className="footer-container">
                  {categories.map((category, inx) =><Link to={`/categories/${category.id}`}>{category.name}</Link>)}        
      </Container>
     );
}
 
export default Footer;