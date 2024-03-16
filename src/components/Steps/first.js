import { useEffect, useRef } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategories,
  setDescription,
  setDifficultyLevel,
  setName,
  setNumOfPieces,
  setTimeToMake,
} from "../../store/addRecipeSlice";
import * as Yup from "yup";
import { useFormik } from "formik";
import ListCategory from "./FieldsComponents/ListCategory";
import QuantityInput from "./FieldsComponents/NumberPieces";
import theme from "../Themes/CreateThemeFirst";
import "../../styles/First.css";
import "../../styles/AddRecipeForm.css"
const FirstStepSchema = Yup.object().shape({
  name: Yup.string().required("זהו שדה חובה"),
  description: Yup.string().required("זהו שדה חובה"),
  timeToMake: Yup.number().required("זהו שדה חובה"),
  numOfPieces: Yup.number()
    .required("זהו שדה חובה")
    .min(1, "הכנס מספר גדול מ-1"),
});

const First = (props) => {
  const handleNext = props.handleNext;
  const name = useSelector((state) => state.addRecipe.name);
  const description = useSelector((state) => state.addRecipe.description);
  const timeToMake = useSelector((state) => state.addRecipe.timeToMake);
  const difficultyLevel = useSelector(
    (state) => state.addRecipe.difficultyLevel
  );
  const categories = useSelector((state) => state.addRecipe.categories);
  const numOfPieces = useSelector((state) => state.addRecipe.numOfPieces);

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: name,
      description: description,
      timeToMake: timeToMake,
      difficultyLevel: difficultyLevel,
      categories: categories,
      numOfPieces: numOfPieces,
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
    formik.setFieldValue("name", name);
    formik.setFieldValue("description", description);
    formik.setFieldValue("timeToMake", timeToMake);
    formik.setFieldValue("difficultyLevel", difficultyLevel);
    formik.setFieldValue("categories", categories);
    formik.setFieldValue("numOfPieces", numOfPieces);
    
  }
    , [name, description, timeToMake, difficultyLevel, numOfPieces]);
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

export default First;
