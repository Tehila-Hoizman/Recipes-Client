import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Recipe from "../Recipes/Recipe";
import "../../styles/EditorDetails.css";
const EditorDetails = () => {
  const { id } = useParams();
  const editors = useSelector((state) => state.recipies.editors);
  const recipes = useSelector((state) => state.recipies.recipies);
  const [recipesByEditor, setRecipesByEditor] = useState([]);
  const [editor, setEditor] = useState(null);
  useEffect(() => {
    setEditor(editors.find((x) => x.id == id));
    window.scrollTo(0, 0);

    setRecipesByEditor(recipes.filter((x) => x.editorId == id));
  }, [, editors, recipes]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }
  ,[]);
  return (
    <div>
      {!editor && (
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
      {editor && (
            <Box className="editor-details-box">
          <Box className="editor-details-profile-box">
            <Avatar
              className="editor-details-profile"
              alt="Remy Sharp"
              src={
                editor && editor.image
                  ? editor.image
                  : "../../images/profile.png"
              }
              sx={{ width: "200px", height: "200px" }}
            />
            <Typography className="editor-details-name">
              {editor.name}
            </Typography>
            </Box>
            <Button className="editor-details-to-follow">עקוב</Button>

          </Box>

      )}
      {recipesByEditor && recipesByEditor.length == 0 && (
        <h1>אין מתכונים למשתמש זה</h1>
      )}

      {recipesByEditor &&<div>
        <Typography className="editor-details-num-recipes">
            {" "}
            מתכונים({recipesByEditor.length})
          </Typography>
        {recipesByEditor.map((recipe, inx) => {
          return <Recipe key={inx} recipe={recipe} />;
        })}
        </div>}
    </div>
  );
};

export default EditorDetails;
