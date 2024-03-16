import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { pushRecipe } from "./recipiesSlice";
import { List } from "immutable";
import { pushRecipeToCategory } from "./categoriesSlice";
const initialState = {
  name: "",
  description: "",
  timeToMake: 1,
  difficultyLevel: 3,
  categories: [],
  instructions: "",
  ingredients: [{ name: "", amount: "", measure: "" ,id:0}],
  image: null,
  imageUrl: "",
  numOfPieces: 1,
  editorId: 0,
  status: "init",
  type:"edit",
  editId:49,

};

export const addRecipe = createAsyncThunk(
  "addRecipe",
  async (recipe, thunkAPI) => {
    try {
      const state = thunkAPI.getState(); // Get the current state
      const {
        categories,
        image,
      } = state.addRecipe;
      const formData = new FormData();
      recipe.categories.forEach((c) => {
        formData.append("CategoriesId", c.id);
      });

      formData.append('FilelImage', image);
      formData.append("Name", recipe.name);
      formData.append("Description", recipe.description);
      formData.append("Instructions", recipe.instructions);
      formData.append("DurationOfPreparation", recipe.durationOfPreparation);
      formData.append("LevelOfDifficulty", recipe.levelOfDifficulty);
      formData.append("NumOfPieces", recipe.numOfPieces);
      formData.append("EditorId", recipe.editorId);
      formData.append("UploadTime", new Date().toISOString());
      formData.append("UrlImage", null);
      console.log("images", image);
      const response = await axios.post(
        `https://localhost:7161/api/Recipe`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(response);
      let r = response.data;
      r = {
        ...r,
        urlUpdateImageEditor: thunkAPI.getState().login.user.urlUpdateImage,
        editorName:
          thunkAPI.getState().login.user.firstName +
          " " +
          thunkAPI.getState().login.user.lastName,
      };

      thunkAPI.dispatch(pushRecipe(r));
      console.log(categories);
debugger
      categories.forEach((c) => {
      thunkAPI.dispatch(pushRecipeToCategory({recipe:r,categoryId:c.id}));
      });

      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);
export const editRecipe = createAsyncThunk(
  "editRecipe",
  async (recipe, thunkAPI) => {
    try {
      const state = thunkAPI.getState(); // Get the current state
      const {
        name,
        description,
        timeToMake,
        difficultyLevel,
        categories,
        instructions,
        ingredients,
        image,
        numOfPieces,
        date,
        editorId,
        editId
      } = state.addRecipe;
      const formData = new FormData();
      recipe.categories.forEach((c) => {
        formData.append("CategoriesId", c.id);
      });

      formData.append('FilelImage', image);
      formData.append("Name", recipe.name);
      formData.append("Description", recipe.description);
      formData.append("Instructions", recipe.instructions);
      formData.append("DurationOfPreparation", recipe.durationOfPreparation);
      formData.append("LevelOfDifficulty", recipe.levelOfDifficulty);
      formData.append("NumOfPieces", recipe.numOfPieces);
      formData.append("EditorId", recipe.editorId);
      formData.append("UploadTime", new Date().toISOString());
      formData.append("UrlImage", null);
      console.log("images", image);
      const response = await axios.put(
        `https://localhost:7161/api/Recipe/${editId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(response);
      // let r = response.data;
      // r = {
      //   ...r,
      //   urlUpdateImageEditor: thunkAPI.getState().login.user.urlUpdateImage,
      //   editorName:
      //     thunkAPI.getState().login.user.firstName +
      //     " " +
      //     thunkAPI.getState().login.user.lastName,
      // };

      // thunkAPI.dispatch(pushRecipe(r));
      // console.log(categories);

      // categories.forEach((c) => {
      // thunkAPI.dispatch(pushRecipeToCategory({recipe:r,categoryId:c.id}));
      // });

      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const addRecipeSlice = createSlice({
  name: "addRecipe",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
      console.log("setName", state.name);
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setTimeToMake: (state, action) => {
      state.timeToMake = action.payload;
    },
    setDifficultyLevel: (state, action) => {
      state.difficultyLevel = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setInstructions: (state, action) => {
      state.instructions = action.payload;
    },
    setIngredients: (state, action) => {
      state.ingredients = action.payload;
    },
    setImage: (state, action) => {
      state.image = action.payload;
      console.log("setImage", state.image);
    },
    setNumOfPieces: (state, action) => {
      state.numOfPieces = action.payload;
      console.log("setNumOfPieces", state.numOfPieces);
    },
    setEditorId: (state, action) => {
      state.editorId = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setEditId: (state, action) => {
      state.editId = action.payload;
    },
    setImageUrl: (state, action) => {
      state.imageUrl = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addRecipe.fulfilled, (state, action) => {
      state.status = "fulfilled";
    });
    builder.addCase(addRecipe.rejected, (state, action) => {
      state.status = "rejected";
      console.error(action.error);
    });
    builder.addCase(editRecipe.fulfilled, (state, action) => {
      state.status = "fulfilled";
    });
    builder.addCase(editRecipe.rejected, (state, action) => {
      state.status = "rejected";
      console.error(action.error);
    });
  },
});
export const {
  setName,
  setStatus,
  setDescription,
  setTimeToMake,
  setDifficultyLevel,
  setCategories,
  setInstructions,
  setIngredients,
  setImage,
  setNumOfPieces,
  setEditorId,
  setEditId,
  setType,
  setImageUrl,
} = addRecipeSlice.actions;
export default addRecipeSlice.reducer;
