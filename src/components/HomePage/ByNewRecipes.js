import { Box, Container, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import Recipe from "../Recipes/Recipe";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../styles/ByNewRecipes.css";
const ByNewRecipes = () => {
    const recipies = useSelector((state) => state.recipies.recipies);
    const [newRecipies, setNewRecipies] = useState([]);

    useEffect(() => {
      if(Array.isArray(recipies)){
        setNewRecipies([...recipies]);
        console.log("newRecipies", newRecipies);

        setNewRecipies(newRecipies=>newRecipies.sort((a,b)=>new Date(b.uploadTime)-new Date(a.uploadTime)).slice(0, 4))
        console.log("newRecipies", newRecipies);
    }
  }
    ,[recipies]);
    return ( 
        <div className="design-container-byNewRecipes">
        <Container className="byNewRecipes">
          <Typography className="byNewRecipes-title">
            החדשים שלנו...
          </Typography>
  
          {Array.isArray(newRecipies)&&newRecipies.map((recipe, inx) =>  <Recipe recipe={recipe} key={inx} />)}
          <Box className="to-all-recipes">
            <Link to="/recipies">לכל המתכונים</Link>
          </Box>
        </Container>
      </div>
     );
}
 
export default ByNewRecipes;