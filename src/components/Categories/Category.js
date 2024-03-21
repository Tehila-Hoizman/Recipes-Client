import { Button } from "@material-ui/core";
import { Box } from "@mui/material";
import { Typography } from "antd";
import "../../styles/Category.css"
import { Link } from "react-router-dom";
import { useEffect } from "react";
const Category = (props) => {
    const {category} = props;
    useEffect(() => {
        window.scrollTo(0, 0);
      }
      ,[]);
    return ( 
        <div className="categoryCard"> 
        <Box className = "categoryCard-box">
        <Link to={`/categories/${category.id}`}>
            <Button className="categoryCard-btn">
                {category&&category.urlImage&&<img className="categoryCard-img" src={category.urlImage} alt={category.name} />}
                {category&&category.name&&<Typography className="categoryCard-txt">{category.name}</Typography>}
      </Button></Link>

        </Box></div>
     );
}
 
export default Category;