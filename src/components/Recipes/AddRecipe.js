import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container, StepContent } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  addRecipe,
  editRecipe,
  setCategories,
  setDate,
  setDescription,
  setDifficultyLevel,
  setEditorId,
  setImage,
  setImageUrl,
  setIngredients,
  setInstructions,
  setName,
  setStatus,
  setTimeToMake,
} from "../../store/addRecipeSlice";
import First from "../Steps/first";
import Second from "../Steps/second";
import Third from "../Steps/third";
import Fourth from "../Steps/fourth";
import { pushRecipe, setNumOfPieces } from "../../store/recipiesSlice";
import { addIngredient, deleteIngredient, editIngredient } from "../../store/ingredientsSlice";
import "../../styles/AddRecipe.css";
import DialogMessage from "../Dialogs/DialogMessage";
import { useState } from "react";
import { useNavigate } from "react-router";

const steps = ["פרטי המתכון", "מצרכים", "הוראות הכנה", "תמונות"];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [openSuccess, setOpenSuccess] = useState(false);

  const name = useSelector((state) => state.addRecipe.name);
  const description = useSelector((state) => state.addRecipe.description);
  const timeToMake = useSelector((state) => state.addRecipe.timeToMake);
  const difficultyLevel = useSelector(
    (state) => state.addRecipe.difficultyLevel
  );
  const categories = useSelector((state) => state.addRecipe.categories);
  const instructions = useSelector((state) => state.addRecipe.instructions);
  const numOfPieces = useSelector((state) => state.addRecipe.numOfPieces);
  const user = useSelector((state) => state.login.user);
  const ingredients = useSelector((state) => state.addRecipe.ingredients);
  const status = useSelector((state) => state.addRecipe.status);
  const type = useSelector((state) => state.addRecipe.type);
  const editId = useSelector((state) => state.addRecipe.editId);
  const recipies = useSelector((state) => state.recipies.recipies);
  const ingredientsList = useSelector((state) => state.ingredients.ingredients);
  const categoriesList = useSelector((state) => state.categories.categories);
const [ingToDelete,setIngToDelete] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isStepOptional = (step) => {
    return step === 3;
  };
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  const handleCloseMessage = () => {
    navigate("/");
  };
  const clearFields = () => {
    dispatch(setIngredients([{ name: "", amount: "", measure: "" ,id:0}]));
    dispatch(setCategories(null));
    dispatch(setDescription(""));
    dispatch(setDifficultyLevel(1));
    dispatch(setName(""));
    dispatch(setTimeToMake(0));
    dispatch(setInstructions(""));
  };
  const handleNext = async (event) => {
    let newSkipped = skipped;
    console.log(user);
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    if (activeStep === steps.length - 1) {
      event.preventDefault();
      console.log(event);
      let obj = {
        name: name,
        description: description,
        instructions: instructions,
        durationOfPreparation: timeToMake,
        levelOfDifficulty: difficultyLevel,
        numOfPieces: numOfPieces,
        categories: categories,
        editorId: user.id,
      };
      console.log(obj);
      console.log("category", categories);

      console.log("status", status);
      if (type == "add") {
        const resultAction = await dispatch(addRecipe(obj));
        if (addRecipe.fulfilled.match(resultAction)) {
          clearFields();
          dispatch(setStatus("init"));
          const addAllIngredients = ingredients.map(async (ingredient) => {
            let obj = {
              id: ingredient.id,
              name: ingredient.name.toString(),
              amount: ingredient.amount,
              measureId: ingredient.measure,
              recipeId: resultAction.payload.id,
            };
            console.log(obj);
            return dispatch(addIngredient(obj));
          });
          let res = await Promise.all(addAllIngredients);
          setOpenSuccess(true);
        }
      }
      if (type == "edit") {
        console.log("editId", editId);
        const resultAction = await dispatch(editRecipe(obj));
        if (editRecipe.fulfilled.match(resultAction)) {
          clearFields();
          dispatch(setStatus("init"));
          try {
            const editAllIngredients = ingredients.map(async (ingredient) => {
              let obj = {
                id: ingredient.id,
                name: ingredient.name.toString(),
                amount: ingredient.amount,
                measureId: ingredient.measureId,
                measure: ingredient.measure,
                recipeId: editId,
              };
              console.log("ooo",obj);
              return dispatch(editIngredient(obj));
            });
            let res = await Promise.all(editAllIngredients);
            setOpenSuccess(true);
            const deleteAllIngredients = ingToDelete.map(async (id) => {
              return dispatch(deleteIngredient(id));
            });
            let resDelete = await Promise.all(deleteAllIngredients);
            setOpenSuccess(true);
          } catch (e) {
            console.log(e);
          }
        }
      }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("אינך יכול לדלג על שלב זה, הוא כולל שדות חובה");
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };
  const handleReset = () => {
    setActiveStep(0);
  };
  const renderStepForm = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <First handleNext={handleNext} />;
      case 1:
        return <Second handleNext={handleNext} handleBack={handleBack} />;
      case 2:
        return <Third ingToDelete={ingToDelete} setIngToDelete={setIngToDelete} handleNext={handleNext} handleBack={handleBack} />;
      case 3:
        return <Fourth handleNext={handleNext} handleBack={handleBack} />;
      default:
        return null;
    }
  };
  const newRecipe = () => {
    dispatch(setStatus("init"));
    dispatch(setIngredients([{ name: "", amount: "", measure: "" }]));
    dispatch(setCategories([]));
    dispatch(setDescription(""));
    dispatch(setDifficultyLevel(1));
    dispatch(setName(""));
    dispatch(setTimeToMake(1));
    dispatch(setInstructions(""));
    dispatch(setImageUrl(""));
    dispatch(setNumOfPieces(1));
  };
  const editRecipeDetails = () => {
    console.log("editId", editId);
    console.log("recipies", recipies);
    if (
      Array.isArray(recipies) &&
      Array.isArray(ingredientsList) &&
      Array.isArray(categoriesList)
    ) {
      const r = recipies.find((r) => r.id === editId);
      if (r) {
        console.log("r", r);
        console.log("ingredientsList", ingredientsList);
        dispatch(setStatus("init"));
        dispatch(
          setIngredients(ingredientsList.filter((i) => i.recipeId === editId))
        );
        dispatch(
          setCategories(
            categoriesList.filter((category) =>
              category.recipes.some((recipe) => recipe.id === editId)
            )
          )
        );
        dispatch(setDescription(r.description));
        dispatch(setDifficultyLevel(r.levelOfDifficulty));
        dispatch(setName(r.name));
        dispatch(setTimeToMake(r.durationOfPreparation));
        dispatch(setInstructions(r.instructions));
        dispatch(setNumOfPieces(r.numOfPieces));
        dispatch(setImageUrl(r.urlImage));
        dispatch(setImage(r.image));
      }
    }
  };
  React.useEffect(() => {
    if (type === "add") {
      newRecipe();
    }
    if (type === "edit") {
      editRecipeDetails();
    }
  }, [type, recipies, ingredientsList, categoriesList, editId]);
  return (
    <Container sx={{ width: "50%" }} className="my-stepper-container">
      <Box sx={{ width: "100%" }} className="my-stepper-box">
        <Stepper activeStep={activeStep} className="my-stepper">
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption" className="my-step-title">
                  אופציונלי
                </Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps} className="my-step">
                <StepLabel className="my-step-label" {...labelProps}>
                  {label}
                </StepLabel>
                .
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>המתכון נוסף בהצלחה!</Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>איפוס</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Container>
              {renderStepForm(activeStep)}
              {/* <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>*/}
              {/* <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  קודם
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    דלג
                  </Button>
                )} */}

              {/* <Button onClick={(event) => handleNext(event)} type="submit">
                  {activeStep === steps.length - 1 ? "סיום" : "הבא"}
                </Button> */}
              {/* </Box>  */}
              <DialogMessage
                handleClick={handleCloseMessage}
                setOpen={setOpenSuccess}
                open={openSuccess}
                message={type=="add"? "המתכון נוסף בהצלחה":"המתכון עודכן בהצלחה"}
              />
            </Container>
          </React.Fragment>
        )}
      </Box>
    </Container>
  );
}
