import {
  Box,
  Button,
  Container,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import DialogMessage from "../Dialogs/DialogMessage";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import First from "../Steps/first";
import Second from "../Steps/second";
import Third from "../Steps/third";
import Fourth from "../Steps/fourth";
import FirstEditStep from "../EditRecipeSteps/FirstEditStep";
import SecondEditStep from "../EditRecipeSteps/SecondEditStep";
import ThirdEditStep from "../EditRecipeSteps/ThirdEditStep";
import FourthEditStep from "../EditRecipeSteps/FourthEditStep";
import {
  setCategories,
  setDescription,
  setDifficultyLevel,
  setIngredients,
  setInstructions,
  setName,
  setNumOfPieces,
  setTimeToMake,
} from "../../store/recipiesSlice";
import AddRecipe from "./AddRecipe";

const steps = ["פרטי המתכון", "מצרכים", "הוראות הכנה", "תמונות"];

const EditRecipe = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [openSuccess, setOpenSuccess] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const recipes = useSelector((state) => state.recipies.recipies);
  const [recipe, setRecipe] = useState(null);
  const handleNext = () => {};
  useEffect(() => {
    // if (!recipe) {
    //   navigate("/privateArea");
    // }
    setRecipe(recipes.find((recipe) => recipe.id == id));
    console.log("id", id);
    console.log("recipe ss", recipe);
    if (recipe) {
      dispatch(setName(recipe.name));
      dispatch(setDescription(recipe.description));
      dispatch(setTimeToMake(recipe.timeToMake));
      dispatch(setDifficultyLevel(recipe.difficultyLevel));
      dispatch(setCategories(recipe.categories));
      dispatch(setInstructions(recipe.instructions));
      dispatch(setNumOfPieces(recipe.numOfPieces));
      dispatch(setIngredients(recipe.ingredients));
      console.log("recipe", recipe);
      console.log("recipe.name", recipe.name);
    }
    console.log("recipes sss", recipes);
  }, [recipe,recipes]);
  const isStepOptional = (step) => {
    return step === 3;
  };
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  const handleCloseMessage = () => {
    navigate("/");
  };
  //   const clearFields = () => {
  //     dispatch(setIngredients([{ name: "", amount: "", measure: "" }]));
  //     dispatch(setCategories(null));
  //     dispatch(setDescription(""));
  //     dispatch(setDifficultyLevel(1));
  //     dispatch(setName(""));
  //     dispatch(setTimeToMake(0));
  //     dispatch(setInstructions(""));
  //   };
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
        if (!recipe) {
          return null;
        }
        return <FirstEditStep id={id} handleNext={handleNext} />;
        break;
      case 1:
        return (
          <SecondEditStep
            recipe={recipe}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        );
      case 2:
        return (
          <ThirdEditStep
            recipe={recipe}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        );
      case 3:
        return (
          <FourthEditStep
            recipe={recipe}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        );
      default:
        return null;
    }
  };
  return (
    <Container sx={{ width: "50%" }} className="my-stepper-container">
      {/* <Box sx={{ width: "100%" }} className="my-stepper-box">
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
              <DialogMessage
                handleClick={handleCloseMessage}
                setOpen={setOpenSuccess}
                open={openSuccess}
                message="המתכון נוסף בהצלחה"
              />
            </Container>
          </React.Fragment>
        )}
      </Box> */}
      <AddRecipe/>
    </Container>
  );
};

export default EditRecipe;
