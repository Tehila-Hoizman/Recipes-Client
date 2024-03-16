import * as Yup from "yup";
import { Box, Button, Container, FormControl, MenuItem, Select, TextField } from "@material-ui/core";
import { prop } from "@mdxeditor/editor";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import theme from "../Themes/CreateThemeFirst";
import ListCategory from "../Steps/FieldsComponents/ListCategory";
import { setDescription, setDifficultyLevel, setName, setNumOfPieces, setTimeToMake } from "../../store/recipiesSlice";
import { useEffect } from "react";
import { useState } from "react";

const FirstStepSchema = Yup.object().shape({
  name: Yup.string().required("זהו שדה חובה"),
  description: Yup.string().required("זהו שדה חובה"),
  timeToMake: Yup.number().required("זהו שדה חובה"),
  numOfPieces: Yup.number()
    .required("זהו שדה חובה")
    .min(1, "הכנס מספר גדול מ-1"),
});

const FirstEditStep = (props) => {
    const recipes = useSelector((state) => state.recipies.recipies);

  const handleNext = props.handleNext;
const id = props.id;
const [recipe, setRecipe] = useState(null);
const name = useSelector((state) => state.recipies.editRecipe.name);
const description = useSelector((state) => state.recipies.editRecipe.description);
const timeToMake = useSelector((state) => state.recipies.editRecipe.timeToMake);
const difficultyLevel = useSelector((state) => state.recipies.editRecipe.difficultyLevel);
const categories = useSelector((state) => state.recipies.editRecipe.categories);
const numOfPieces = useSelector((state) => state.recipies.editRecipe.numOfPieces);
let formik = useFormik({
    initialValues: {
        name: "",
        description: "",
        timeToMake: 0,
        difficultyLevel: 1,
        categories: [],
        numOfPieces: 1,
        },
    
        validationSchema: FirstStepSchema,
        onSubmit: (values) => {
          console.log("Submitted values:", values);
          dispatch(setName(values.name));
          dispatch(setDescription(values.description));
          dispatch(setTimeToMake(values.timeToMake));
          dispatch(setDifficultyLevel(values.difficultyLevel));
          // dispatch(setCategories(values.categories));
          dispatch(setNumOfPieces(values.numOfPieces));
          handleNext();
        },
      });
useEffect(() => {
    const fetchRecipe = async () => {
      const foundRecipe = await recipes.find((recipe) => recipe.id == id);
      console.log("name: ", name);
      setRecipe(foundRecipe);
      console.log("recipe aa", foundRecipe);
      formik.setValues({
        name: foundRecipe.name,
        description: foundRecipe.description,
        timeToMake: foundRecipe.durationOfPreparation,
        difficultyLevel: foundRecipe.levelOfDifficulty,
        categories: foundRecipe.categories,
        numOfPieces: foundRecipe.numOfPieces,
      });
    };
    fetchRecipe();
  }, [id, name, recipes]);
  const dispatch = useDispatch();
 
  return (
    <Container theme={theme} className="cont-form" sx={{width:"80% !important"}}>
        
      <FormControl>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name" className="label">שם המתכון</label>
          <TextField
            id="name"
            label="שם המתכון"
            variant="outlined"
            fullWidth
            className="input"
            {...formik.getFieldProps("name")}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="error">{formik.errors.name}</div>
          )}
          <label htmlFor="description" className="label">תיאור</label>
          <TextField
            id="description"
            label="תיאור"
            variant="outlined"
            fullWidth
            className="input"
            {...formik.getFieldProps("description")}
          />
          {formik.touched.description && formik.errors.description && (
            <div className="error">{formik.errors.description}</div>
          )}
          <label htmlFor="timeToMake" className="label">זמן הכנה (בדקות)</label>
          <TextField
            id="time-to-make"
            label="זמן הכנה (בדקות)"
            variant="outlined"
            fullWidth
            type="number"
            className="input"
            {...formik.getFieldProps("timeToMake")}
          />
          {formik.touched.timeToMake && formik.errors.timeToMake && (
            <div className="error">{formik.errors.timeToMake}</div>
          )}
          <label htmlFor="difficultyLevel" className="label">
            רמת קושי
          </label>
          <Select
          className="input"
            labelId="lbl-difficulty-level"
            id="cmb-difficulty-level"
            {...formik.getFieldProps("difficultyLevel")}
            fullWidth
          >
            <MenuItem value={3}>קל</MenuItem>
            <MenuItem value={2}>בינוני</MenuItem>
            <MenuItem value={1}>קשה</MenuItem>
          </Select>

          <label htmlFor="numOfPieces" className="label">מספר חתיכות</label>
          <TextField
            id="numOfPieces"
            label="מספר חתיכות"
            variant="outlined"
            fullWidth
            type="number"
            className="input"
            {...formik.getFieldProps("numOfPieces")}
          />
          {formik.touched.numOfPieces && formik.errors.numOfPieces && (
            <div className="error">{formik.errors.numOfPieces}</div>
          )}
          <label htmlFor="categories" className="label">קטגוריות</label>
          <ListCategory classNam="input" {...formik.getFieldProps("categories")} />


          {/* <label htmlFor="numOfPieces" className="label"></label>
          <QuantityInput
            id="numOfPieces"
            {...formik.getFieldProps("numOfPieces")}
          />
          {formik.touched.numOfPieces && formik.errors.numOfPieces && (
            <div className="error">{formik.errors.numOfPieces}</div>
          )} */}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button type="submit" className="btn-next">הבא</Button>
          </Box>
        </form>
      </FormControl>
    </Container>
  );
};

export default FirstEditStep;
