import { useEffect, useRef } from "react";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setInstructions, setName } from "../../store/addRecipeSlice";
import * as Yup from "yup";
import { useFormik } from "formik";
import TextArea from "antd/es/input/TextArea";
import "../../styles/Second.css"
import "../../styles/AddRecipeForm.css"
import { Editor } from 'primereact/editor';

const SecondStepSchema = Yup.object().shape({
    instructions: Yup.string().required("זהו שדה חובה"),
});

const Second = (props) => {
  const handleNext = props.handleNext;
  const handleBack = props.handleBack;

  const instructions = useSelector((state) => state.addRecipe.instructions);

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
        instructions: instructions,
    },
    validationSchema: SecondStepSchema,
    onSubmit: (values) => {
      console.log("Submitted values:", values);
      dispatch(setInstructions(values.instructions));
      handleNext();
    },
  });
  useEffect(() => {
    formik.setValues({
      instructions: instructions,
    });
  }
  , [instructions]);
  return (
    <>
      <FormControl>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="instructions" className="label">הוראות הכנה</label>
          <TextArea
          sx={{height: "400px !important" }}
            id="instructions"
            label="הוראות הכנה"
            variant="outlined"
            fullWidth
            className="input"
            {...formik.getFieldProps("instructions")}
            classNames="instructions"
          />
          {formik.touched.instructions && formik.errors.instructions && (
            <div className="error">{formik.errors.instructions}</div>
          )}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
              קודם
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button type="submit" className="btn-next">הבא</Button>

          </Box>
        </form>
      </FormControl>
    </>
  );
};

export default Second;
