import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
const initialState = {
  ingredients: [],   
  status: 'init'
};
// const dispatch = useDispatch();
export const fetchIngredients = createAsyncThunk("fetchIngredients", async (_, thunkAPI) => {
console.log('in fetchIngredients');
  try {
    const measures = thunkAPI.getState().measures.measures;

    const res = await axios.get(`https://localhost:7161/api/Ingredient`);
    console.log(res);
    let ing = [];
    console.log("res ing",res);
    res.data.map((element,index) => {
      console.log("measured",measures);
      if (element && measures.find(m => m.id === element.measureId)) { // Check if element and measure are not undefined
        ing.push({name:element.name,recipeId:element.recipeId,amount:element.amount,measure:measures.find(m=>m.id===element.measureId).name});
        }
      });
    console.log("ing",ing);
    return ing;
  } catch (error) {
    console.log(error);
    return error;
  }
});


export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.ingredients = action.payload;
      console.log("ingredients", state.ingredients);
    });
    builder.addCase(fetchIngredients.rejected, (state, action) => {
        state.status = "rejected";
        // state.ingredients = action.payload;
        console.error("error ingredients");
      });
  },
});
export const { } =
ingredientsSlice.actions;
export default ingredientsSlice.reducer;
