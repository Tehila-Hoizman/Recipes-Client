import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  recipeDetailsId: null,
    status:"init",
    recipe:null
};
export const getRecipe = createAsyncThunk('getRecipe',async (recipeId, thunkAPI) => {
    try{
    const response = await axios.get(`https://localhost:7161/api/Recipe/${recipeId}`)
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
