import { Button } from "@material-ui/core";
import { Box } from "@mui/material";
import { Typography } from "antd";
import "../../styles/Category.css"
import { Link } from "react-router-dom";
const Category = (props) => {
    const {category} = props;
    return ( 
        <div className="categoryCard"> 
        <Box className = "categoryCard-box">
        <Link to={`/categories/${category.id}`}>
            <Button className="categoryCard-btn">
                {category&&category.image&&<img className="categoryCard-img" src={category.image} alt={category.name} />}
                {category&&category.name&&<Typography className="categoryCard-txt">{category.name}</Typography>}
      </Button></Link>

        </Box></div>
     );
}
 
export default Category;