import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getImageRecipe } from "./recipiesSlice";
import { getImageComment } from "./commentsSlice";
const initialState = {
  categories: [],
  status: "init",
};
export const getCategories = createAsyncThunk(
  "getCategories",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`https://localhost:7161/api/Category`);
      console.log("res.data categories slice", res.data);
      return res.data;
    } catch (error) {
      console.log(error);
      return "error";
    }
  }
);
export const pushRecipeToCategory = createAsyncThunk(
  "pushRecipeToCategory",
  async (obj, thunkAPI) => {
    try {
      let recipe = obj.recipe;
      let date = new Date(recipe.uploadTime);
      let utcUploadTime = Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds()
      );
      utcUploadTime = utcUploadTime; 
      recipe.uploadTime = utcUploadTime;
      let imgRecipe = "";
      if (recipe.urlImage) {
        imgRecipe = (await thunkAPI.dispatch(getImageRecipe(recipe.urlImage))).payload;
      }
      let img = "";
      if (recipe.urlImageEditor) {
        console.log("recipe.urlImageEditor", recipe.urlImageEditor);
        img = (await thunkAPI.dispatch(getImageComment(recipe.urlImageEditor))).payload;
      }
      let recipeCopy = { ...recipe };
      recipeCopy.image = imgRecipe;
      recipeCopy.urlUpdateImageEditor = img;
      return { recipe: recipeCopy, categoryId: obj.categoryId };
      // return { recipe: recipe, categoryId: obj.categoryId };
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);
export const addUser = createAsyncThunk(
  "addUser", 
  (userObj) => {
  axios.post("https://localhost:7161/api/User", userObj)
    .then(function (response) {
      console.log(response);
      if (response.status === 200) {
        return response.data;
      } else {
        console.log("error");
        return "error";
      }
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });
});
export const addCategory = createAsyncThunk(
  "addCategory",
  (category, thunkAPI) => {
    const formData = new FormData();
    formData.append("name", category.name);
    formData.append("filelImage", category.filelImage);
    axios.post("https://localhost:7161/api/Category", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          thunkAPI.dispatch(pushCategory(response.data));
          return response.data;
        } else {
          console.log("error");
          return "error";
        }
      })
      .catch(function (error) {
        console.log(error);
        return error;
      });
  }
);
export const getImageCategory = createAsyncThunk(
  "getImageCategory",
  async (image) => {
    if (image) {
      try {
        const res = await axios.get(`https://localhost:7161/api/Category/getImage/${image.toString()}`);
        return res.data;
      } catch (error) {
        console.log(error);
      }
    }
  }
);
export const pushCategory = createAsyncThunk(
  "pushCategory",
  async (category, thunkAPI) => {
    let imgCategory = "";
    if (category.urlImage) {
      imgCategory = (
        await thunkAPI.dispatch(getImageCategory(category.urlImage))
      ).payload;
    }
    category.urlImage = imgCategory;
    category.title = category.name;
    return category;
  }
);
export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.categories = action.payload;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.status = "rejected";
      console.error("error comments");
    });
    builder.addCase(pushRecipeToCategory.fulfilled, (state, action) => {
      let category = state.categories.find(
        (x) => x.id === action.payload.categoryId
      );
      category.recipes.push(action.payload.recipe);
    });
    builder.addCase(pushCategory.fulfilled, (state, action) => {
      state.categories = [...state.categories, action.payload];
    });
  },
});
export const {} = categoriesSlice.actions;
export default categoriesSlice.reducer;
