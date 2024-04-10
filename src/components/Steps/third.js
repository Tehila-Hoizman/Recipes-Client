import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/Third.css";
import { useState } from "react";
import { useEffect } from "react";
import { setIngredients } from "../../store/addRecipeSlice";
import "../../styles/AddRecipeForm.css"
import DeleteIcon from '@mui/icons-material/Delete';
const Third = (props) => {
    const handleNext = props.handleNext;
    const handleBack = props.handleBack;
    const setIngToDelete = props.setIngToDelete;
    const ingToDelete = props.ingToDelete;
    const measures = useSelector((state) => state.measures.measures);
    const ingredients = useSelector((state) => state.addRecipe.ingredients);
    let m =Array.isArray(measures)?measures[0].id:"";
  const [measureSelected, setMeasureSelected] = useState(m);
  const dispatch = useDispatch();

  const handleChange = (e,value, index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = {
        ...updatedIngredients[index],
        [e.target.name]: e.target.value,
      };
     dispatch( setIngredients(updatedIngredients));
  }
  const handleClick = () => {
    
    dispatch(setIngredients([...ingredients, { name: "", amount: "", measure: "",id:0, }]));
  }
  const handleNextValidate = () => {
    let isValid = true;
    ingredients.forEach((v) => {
      if (v.name === "" || v.amount === "" || v.measure === "") {
        isValid = false;
      }
    });
    if (isValid) {
      handleNext();
    } else {
      alert("יש למלא את כל השדות");
    }
  };

  useEffect(() => {
    console.log(ingredients);
  }, []);
  return (
    <Container>
      <FormControl
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: " flex-start",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
        }}
      >
        {ingredients.map((v,i)=>{return(<Box 
         className="ingredient-box">
          <TextField
            id="name"
            label="שם הרכיב"
            variant="outlined"
            value={v.name}
            onChange={(e) => handleChange(e, "name", i)}
        name="name"
            sx={{
              width: "30%",
              display: "inline-block ",
              marginBottom: "0px",
              marginRight: "5px",
              xs: { width: "100%" },
            }}
          />
          <Select
            labelId="lbl-measure"
            id="cmb-measure"
            name="measure"
            value={v.measureId}
            onChange={(e) => handleChange(e, "measure", i)}
            sx={{
              width: "30%",
              display: "inline-block ",
              marginBottom: "0px",
              marginRight: "5px",
              xs: { width: "100%" },
              padding: "0 !important",
            }}
          >
            {measures.map((measure) => (
              <MenuItem value={measure.id}>{measure.name}</MenuItem>
            ))}
          </Select>
          <TextField
            type="number"
            id="amount"
            label="כמות"
            variant="outlined"
            value={v.amount}
            name="amount"
            onChange={(e) => handleChange(e, "amount", i)}

            sx={{
              width: "30%",
              display: "inline-block ",
              marginBottom: "0px",
              xs: { width: "100%" },
              marginRight: "5px",
            }}
          />
          <Button
          sx={{margin:"0 !important",marginRight:"1px !important", padding:"0 !important", width:"30px !important", height:"30px !important", minWidth:"30px !important", minHeight:"30px !important", borderRadius:"50% !important", color:"rgb(66, 0, 21) !important", fontSize:"20px !important", lineHeight:"20px !important", "&:hover":{backgroundColor:"#f3e1e2 !important", fontSize:"20px !important", lineHeight:"20px !important", width:"30px !important", height:"30px !important", minWidth:"30px !important", minHeight:"30px !important", borderRadius:"50% !important", padding:"0 !important 0 !important", margin:"0 !important 0 !important",}} }
            className="btn-removeIngredient"
            onClick={() => {
              if(ingredients.length===1)
              alert("על המתכון להכיל לפחות רכיב אחד")
              else{
                if(v.id!==0)
                setIngToDelete([...ingToDelete,v.id]);
                dispatch(setIngredients(ingredients.filter((_, j) => j !== i)));

              }
            }}
          >
           <DeleteIcon sx={{width:"100%"}}/>
          </Button>
          {/* <InputLabel id="lbl-measure">מידה</InputLabel>  */}
        </Box>)})}
        <Box className="box-addIngredient">
            <Button className="btn-addIngredient" onClick={handleClick}>+</Button>
        </Box>
      </FormControl>

<Box className="box-btns">
<Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
              קודם
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button type="submit" onClick={handleNextValidate} className="btn-next">הבא</Button>

          </Box>
      </Box>
    </Container>

  );
};

export default Third;
