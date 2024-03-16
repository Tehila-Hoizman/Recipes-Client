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
      if (element && measures.find(m => m.id === element.measureId)) { // Check if element and measure are not undefined
        ing.push({id:element.id,name:element.name,recipeId:element.recipeId,amount:element.amount,measure:measures.find(m=>m.id===element.measureId).name,measureId:element.measureId});
        }
      });
    console.log("ing",ing);
    return ing;
  } catch (error) {
    console.log(error);
    return error;
  }
});

export const addIngredient = createAsyncThunk("addIngredient", async (ing, thunkAPI) => {
  try {

    const response = await axios.post(
      `https://localhost:7161/api/Ingredient`,
      {name: ing.name,
        amount: ing.amount,
        measureId: ing.measureId,
        recipeId: ing.recipeId,
        }      

      
    );
    console.log(response);
    thunkAPI.dispatch(pushIngredient({...response.data, measure: thunkAPI.getState().measures.measures.find(m => m.id ===ing.measureId).name}));

    return response.data;
  } catch (error) {
    return error;
  }
});
export const editIngredient = createAsyncThunk("editIngredient", async (ing, thunkAPI) => {
  try {
    
    if(thunkAPI.getState().ingredients.ingredients.find(i=>i.id===ing.id)){
      
      // thunkAPI.getState().measures.measures.find(m => m.id ===ing.measureId).name
    const response = await axios.put(
      `https://localhost:7161/api/Ingredient/${ing.id}`,
      {name: ing.name,
        amount: ing.amount,
        measureId: ing.measureId,
        recipeId: ing.recipeId,
        }      

      
    );
    console.log(response);
    // thunkAPI.dispatch(pushIngredient({...response.data, measure: thunkAPI.getState().measures.measures.find(m => m.id ===ing.measureId).name}));

    return response.data;
      }else{
        thunkAPI.dispatch(addIngredient({...ing, measureId: ing.measure}));
      }
  } catch (error) {
    return error;
  }
});
export const deleteIngredient = createAsyncThunk("deleteIngredient", async (id, thunkAPI) => {
  try {
    const response = await axios.delete(
      `https://localhost:7161/api/Ingredient/${id}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    return error;
  }
});
export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    pushIngredient: (state, action) => {
      state.ingredients = [...state.ingredients, action.payload];
    },
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
      builder.addCase(addIngredient.fulfilled, (state, action) => {
        // state.ingredients = [...state.ingredients,action.payload];
        console.log("ingredients", state.ingredients);
      });
      builder.addCase(addIngredient.rejected, (state, action) => {
          console.error("error ingredients");
        });
        builder.addCase(editIngredient.fulfilled, (state, action) => {
          // state.ingredients = [...state.ingredients,action.payload];
          console.log("ingredients", state.ingredients);
        });
        builder.addCase(editIngredient.rejected, (state, action) => {
            console.error("error ingredients");
          });
  },
});
export const {pushIngredient } =
ingredientsSlice.actions;
export default ingredientsSlice.reducer;
