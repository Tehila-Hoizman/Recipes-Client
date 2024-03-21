import { Box, CircularProgress, FormControl, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Recipe from "../Recipes/Recipe";
import "../../styles/CategoryDetails.css";
const CategoryDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const categories = useSelector((state) => state.categories.categories);
  const [orderBy, setOrderBy] = useState(1);
  const [category, setCategory] = useState(null);
  const [recipes, setRecipes] = useState([]);

  const handleChange = (event) => {
    const newOrderBy = event.target.value;
    setOrderBy(newOrderBy);
    if(recipes.length>0){
    let sortedRecipes;

    switch (newOrderBy) {
      case 1:
        sortedRecipes = [...recipes].sort((a, b) => new Date(a.uploadTime) - new Date(b.uploadTime));

         console.log("sortedRecipes",sortedRecipes);
        break;
      case 2:
        sortedRecipes = [...recipes].sort((a, b) => new Date(b.uploadTime) - new Date(a.uploadTime));

        console.log("sortedRecipes",sortedRecipes);

        break;

      case 3:
        categories.recipes.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        break;
      case 4:
        categories.recipes.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
        break;
      default:
        break;
    }
    setCategory(prevCategory => ({ ...prevCategory, recipes: sortedRecipes }));

  }
  };
  useEffect(() => {
    if(category)
    setRecipes(category.recipes);
  console.log("recipes ca",recipes);
      window.scrollTo(0, 0);
  
  }, [categories, id, category,recipes]);
useEffect(() => {
  setCategory(categories.find((x) => x.id == id));
}, []);
  return (
    <div>
      {!category && (
        <div
          className="loading"
          style={{
            height: "90vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress disableShrink />
        </div>
      )}
            {category&&category.recipes.length==0&&<h1>אין מתכונים בקטגוריה</h1>}


        {category && category.recipes&&category.recipes.length>0&&recipes.length>0&&<div>
          <Box className="allCategories-header" >
    <Typography className="allCategories-header-title">{category.name}</Typography>

  </Box>
  <Box className="allCategories-sort" >
          <FormControl style={{width:"10%",marginLeft:"33px"}} >
          <InputLabel id="demo-simple-select-label">סדר על פי</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={orderBy}
            label="orderBy"
            onChange={handleChange}
          >
            <MenuItem value={1}>ישן לחדש</MenuItem>
            <MenuItem value={2}>חדש לישן</MenuItem>
            <MenuItem value={3}>א-ת</MenuItem>
            <MenuItem value={3}>ת-א</MenuItem>
          </Select>
        </FormControl>
        </Box>
        <Typography className="editor-details-num-recipes">
            {" "}
            מתכונים({recipes.length})
          </Typography>
        {recipes.map((recipe,inx)=>{
                return(<Recipe key={inx} recipe = {recipe}/>)})}
                </div>
        }
    </div>
  );
};

export default CategoryDetails;
