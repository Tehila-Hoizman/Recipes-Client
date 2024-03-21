import {
  Avatar,
  Box,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  Link,
  Typography,
} from "@material-ui/core";
import Item from "antd/es/list/Item";
import { Col, Container, Row } from "react-bootstrap";
import "../../styles/RecipeDetails.css";
import ImagesGallery from "./ImageGallery";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import "../../styles/ImageGallery.css";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import FitnessCenterOutlinedIcon from "@mui/icons-material/FitnessCenterOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import { Rating } from "@mui/material";
import { AddCommentOutlined, CheckBox } from "@mui/icons-material";
import AllComments from "../Comments/AllComments";
import AddComment from "../Comments/AddComment";

const RecipeDetails2 = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const recipies = useSelector((state) => state.recipies.recipies);
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const measures = useSelector((state) => state.measures.measures);
  const [recipe, setRecipe] = useState(null);
  const [user, setUser] = useState("");
  const [ingredientsToRecipe, setIngredientsToRecipe] = useState([]);
  const [value, setValue] = useState(0);
  const levelOfDifficulty = ["קשה", "בינוני", "קל"];

  const image = recipe && recipe.urlImageEditor ? recipe.urlImageEditor : null;

  useEffect(() => {
    setRecipe(recipies.find((x) => x.id == id));
    // setUser();
    setIngredientsToRecipe(ingredients.filter((x) => x.recipeId == id));
  }, [recipies, id, ingredients, measures]);

  return (
    <div>
      {!recipe && (
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
      {recipe && (
        <Grid container direction="row" spacing={2} columns={16}>
          <Grid item xs={0} sm={3}></Grid>
          <Grid item xs={12} sm={6} className="details">
            {recipe.urlImage!="error"&&<img  className="gallery" src={recipe.urlImage} />}
            <Typography variant="h5" component="h2">
              {recipe.name}
            </Typography>
            <Typography variant="body1" component="p">
              {recipe.description}
            </Typography>
            <Grid item xs={12} sm={12}>
              <Box className="user-box">
                {/* <Avatar
                  alt="Remy Sharp"
                  src="../../images/profile.png"
                  className="user-avatar"
                /> */}
                                          <Avatar sx={{ bgcolor: "primary" }}>
                      {
                        <img
                          src={image ? image : "../../images/profile.png"}
                          className="profile-image"
                        />
                      }
                      {/* {user.firstName[0]} */}
                    </Avatar>
                <Typography variant="h6" component="h6" className="user-name">
                  {recipe.editorName}
                </Typography>
              </Box>
            </Grid>
            <Grid
              container
              direction="row"
              spacing={2}
              columns={16}
              className="details-boxes"
            >
              <Grid item sm={3}>
                <Box className="detail-box">
                  <HistoryToggleOffIcon fontSize="large" />
                  <Typography variant="h6" component="h6">
                    זמן הכנה
                  </Typography>
                  <Typography variant="body1" component="p">
                    {recipe.durationOfPreparation}
                  </Typography>
                </Box>
              </Grid>
              <Grid item sm={3}>
                <Box className="detail-box">
                  <RamenDiningIcon fontSize="large" />
                  <Typography variant="h6" component="h6">
                    מרכיבים
                  </Typography>
                  <Typography variant="body1" component="p">
                    {ingredientsToRecipe.length}
                  </Typography>
                </Box>
              </Grid>
              <Grid item sm={3}>
                <Box className="detail-box">
                  <FitnessCenterOutlinedIcon fontSize="large" />
                  <Typography variant="h6" component="h6">
                    רמת קושי
                  </Typography>
                  <Typography variant="body1" component="p">
                    {levelOfDifficulty[recipe.levelOfDifficulty - 1]}
                  </Typography>
                </Box>
              </Grid>
              <Grid item sm={3}>
                <Box className="detail-box">
                  <RestaurantOutlinedIcon fontSize="large" />
                  <Typography variant="h6" component="h6">
                    מס' מנות
                  </Typography>
                  <Typography variant="body1" component="p">
                    {recipe.numOfPieces}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Grid
              container
              direction="row"
              spacing={2}
              columns={16}
              className="share-boxes"
            >
              <Grid item xs={4} sm={4}>
                <Box className="share-box">
                  <Typography variant="h6" component="h6">
                    כבר הכנתם?
                  </Typography>
                  <a href="#share" className="share-link">
                    שתפו אותנו
                  </a>
                </Box>
              </Grid>
              <Grid item xs={4} sm={4}>
                <Box className="share-box">
                  <Typography variant="h6" component="h6">
                    דרגו את המתכון
                  </Typography>
                  <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={4} sm={4}>
                <Box className="share-box">
                  <Typography variant="h6" component="h6">
                    רוצים להגיב?
                  </Typography>
                  <a href="#share" className="share-link">
                    לחצו כאן
                  </a>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography
                variant="h6"
                component="h3"
                className="ingredient-title"
              >
                מצרכים
              </Typography>
              {ingredientsToRecipe.length > 0 && (
                <Box>
                  {ingredientsToRecipe.map((ingredient, index) => (
                    <Box className="ingredient-box1" key={index}>
                      {/* <CheckBox color="primary"   className="ingredient-checkBox"/>
                      <Typography variant="h6" component="h3"  className="ingredient-text">
                      {ingredient.amount + " " + ingredient.measure + " " + ingredient.name}
                   </Typography> */}
                      <FormControlLabel
                        className="ingredient1"
                        control={<Checkbox color="#76110a" />}
                        label={
                          ingredient.amount +
                          " " +
                          ingredient.measure +
                          " " +
                          ingredient.name
                        }
                      />
                    </Box>
                  ))}
                </Box>
              )}
            </Grid>
            <Grid item sm={12}>
              <Typography
                variant="h6"
                component="h3"
                className="instruction-title"
              >
                אופן ההכנה
              </Typography>
              <Box className="instruction-box">
                <Typography className="instruction-text">
                  {recipe.instructions}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={0} sm={12} className="comments">
              <div id="share">
                <Typography
                  variant="h6"
                  component="h3"
                  className="comments-title"
                >
                  תגובות
                </Typography>
              </div>
              <AddComment recipeId={recipe.id} />
              <AllComments id={recipe.id} />
            </Grid>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default RecipeDetails2;
