import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
const initialState = {
  recipeDetailsId: null,
    status:"init",
    recipe:null
};
export const getRecipe = createAsyncThunk('getRecipe',async (recipeId, thunkAPI) => {
    console.log('in getRecipe');
    try{
    const response = await axios.get(`https://localhost:7161/api/Recipe/${recipeId}`)
    console.log("recipe44 ",response);
    if(response.data){
        return response.data;
    }
    }catch(error){
        return error;
    }    
},
)

export const detailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    setRecipeDetailsId: (state, action) => {
      state.recipeDetailsId = action.payload;
      console.log("state.recipeDetailsId", state.recipeDetailsId);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getRecipe.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.recipe = action.payload;
    });
}
});
export const { setRecipeDetailsId } =
detailsSlice.actions;
export default detailsSlice.reducer;
