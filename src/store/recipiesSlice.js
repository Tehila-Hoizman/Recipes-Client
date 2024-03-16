import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getImageComment } from "./commentsSlice";
import { getImage } from "./loginSlice";
const initialState = {
  recipies: [],
  status: "init",
  recipe: null,
  editors: [],
  editRecipe: {
    name: "tyr",
    description: "",
    timeToMake: 1,
    difficultyLevel: 3,
    categories: [],
    instructions: "",
    ingredients: [{ name: "", amount: "", measure: "" }],
    image: null,
    imageUrl: "",
    numOfPieces: 1,
    editorId: 0,
    status: "init",
  },
};
export const fetchRecipies = createAsyncThunk(
  "fetchRecipies",
  async (_, thunkAPI) => {
    console.log("in fetchRecipies");
    try {
      const response = await axios.get("https://localhost:7161/api/Recipe");
      let r = [];

      await Promise.all(
        response.data.map(async (recipe) => {
          let imgRecipe = "";
          if(recipe.urlImage){
             imgRecipe =  (await thunkAPI.dispatch(getImageRecipe(recipe.urlImage))).payload;
          }
          let img = "";
          if(recipe.urlImageEditor){
            console.log("recipe.urlImageEditor",recipe.urlImageEditor);
            img =  (await thunkAPI.dispatch(getImageComment(recipe.urlImageEditor))).payload;
          }
          r.push({ ...recipe, image: imgRecipe,urlUpdateImageEditor: img  });
        })
      );
      console.log("recipe res ", r);
      thunkAPI.dispatch(getEditors());
      return r;
    } catch (error) {
      return error;
    }
  }
);
export const getImageRecipe = createAsyncThunk("getImageRecipe", async (url) => {
  try {
    const res = await axios.get(
      `https://localhost:7161/api/Recipe/GetImage/${url.toString()}`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
});
export const deleteRecipe = createAsyncThunk(
  "deleteRecipe",
  async (id, thunkAPI) => {
    console.log("in deleteRecipe");
    const response = await axios.delete(
      `https://localhost:7161/api/Recipe/${id}`
    );
    console.log(response);
    return response.data;
  }
);
export const addFavorite = createAsyncThunk("addFavorite", async (id, thunkAPI) => {
  try {
    let r = thunkAPI.getState().recipies.recipies.find((recipe) => recipe.id === id);
    const formData = new FormData();
    if (r.categories) {
      r.categories.forEach((c) => {
        formData.append("CategoriesId", c.id);
      });
    }

    formData.append('FilelImage', r.image);
    formData.append("Name", r.name);
    formData.append("Description", r.description);
    formData.append("Instructions", r.instructions);
    formData.append("DurationOfPreparation", r.durationOfPreparation);
    formData.append("LevelOfDifficulty", r.levelOfDifficulty);
    formData.append("NumOfPieces", r.numOfPieces);
    formData.append("EditorId", r.editorId);
    formData.append("UploadTime", r.uploadTime);
    formData.append("UrlImage", r.urlImage);

    if (Array.isArray(r.usersId)) {
      r.usersId.forEach((u) => {
        formData.append("usersId", u.id);
      });
    }
    formData.append("usersId", thunkAPI.getState().login.user.id);

    // Send the POST request
    // const response = await axios.put(
    //   `https://localhost:7161/api/Recipe`,
    //   formData,
    //   {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   }
    // );

    // Send the PUT request
    await axios.put(`https://localhost:7161/api/Recipe/${id}`, formData);

  } catch (error) {
    console.log(error);
  }
});
export const removeFavorite = createAsyncThunk("removeFavorite", async (id,thunkAPI) => {
  try {
    thunkAPI.getState().recipies.recipies.find((recipe) => recipe.id === id).UsersId.filter(x=>x.id!=thunkAPI.getState().login.user.id);
    axios.put(`https://localhost:7161/api/Recipe/${id}`,thunkAPI.getState().recipies.recipies.find((recipe) => recipe.id === id));
    
  } catch (error) {
    console.log(error);
  }
});
export const pushRecipe = createAsyncThunk(
  'pushRecipe',
  async (recipe, thunkAPI) => {
    let date = new Date(recipe.uploadTime);
    let utcUploadTime = Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    );
    utcUploadTime = utcUploadTime - 7200000;
    recipe.uploadTime = utcUploadTime;
    let imgRecipe = "";
    if(recipe.urlImage){
      imgRecipe =  (await thunkAPI.dispatch(getImageRecipe(recipe.urlImage))).payload;
    }
    let img = "";
    if(recipe.urlImageEditor){
      console.log("recipe.urlImageEditor",recipe.urlImageEditor);
      img =  (await thunkAPI.dispatch(getImageComment(recipe.urlImageEditor))).payload;
    }
    recipe.image= imgRecipe
    recipe.urlUpdateImageEditor= img;

     return recipe;
  }
);
export const recipiesSlice = createSlice({
  name: "recipies",
  initialState,
  reducers: {
    getRecipeById: (state, action) => {
      const recipe = state.recipies.find(
        (recipe) => recipe.id === action.payload
      );
      if (recipe) {
        state.selectedRecipe = recipe;
      }
    },
    // pushRecipe:async (state, action)  => {
    //   let date = new Date(action.payload.uploadTime);
    //   let utcUploadTime = Date.UTC(
    //     date.getUTCFullYear(),
    //     date.getUTCMonth(),
    //     date.getUTCDate(),
    //     date.getUTCHours(),
    //     date.getUTCMinutes(),
    //     date.getUTCSeconds()
    //   );
    //   utcUploadTime = utcUploadTime - 7200000;
    //   action.payload.uploadTime = utcUploadTime;
    //   let imgRecipe = "";
    //   if(action.payload.urlImage){
    //      imgRecipe =  (await thunkAPI.dispatch(getImageRecipe(action.payload.urlImage))).payload;
    //   }
    //   let img = "";
    //   if(action.payload.urlImageEditor){
    //     console.log("recipe.urlImageEditor",action.payload.urlImageEditor);
    //     img =  (await thunkAPI.dispatch(getImageComment(action.payload.urlImageEditor))).payload;
    //   }
    //   action.payload.image= imgRecipe
    //   action.payload.urlUpdateImageEditor= img  ;
    //   state.recipies = [...state.recipies, action.payload];
    // },
    popRecipe: (state, action) => {
      state.recipies = state.recipies.filter(
        (recipe) => recipe.id !== action.payload
      );
    },
   getEditors:(state, action) =>{
      const recipies = state.recipies;
  
      let editors = recipies.reduce((unique, v) => {
        if (!unique.some(editor => editor.id === v.editorId)) {
          unique.push({
            id: v.editorId,
            name: v.editorName,
            image: v.urlUpdateImageEditor
          });
        }
        return unique;
      }, []);
      state.editors= editors;
   },
   setName: (state, action) => {
    state.editRecipe.name = action.payload;
    console.log("setName", state.name);
  },
  setDescription: (state, action) => {
    state.editRecipe.description = action.payload;
  },
  setTimeToMake: (state, action) => {
    state.editRecipe.timeToMake = action.payload;
  },
  setDifficultyLevel: (state, action) => {
    state.editRecipe.difficultyLevel = action.payload;
  },
  setCategories: (state, action) => {
    state.editRecipe.categories = action.payload;
  },
  setInstructions: (state, action) => {
    state.editRecipe.instructions = action.payload;
  },
  setIngredients: (state, action) => {
    state.editRecipe.ingredients = action.payload;
  },
  setImage: (state, action) => {
    state.editRecipe.image = action.payload;
    console.log("setImage", state.image);
  },
  setNumOfPieces: (state, action) => {
    state.editRecipe.numOfPieces = action.payload;
    console.log("setNumOfPieces", state.numOfPieces);
  },
  setEditorId: (state, action) => {
    state.editRecipe.editorId = action.payload;
  },
  setStatus: (state, action) => {
    state.editRecipe.status = action.payload;
  },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRecipies.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.recipies = action.payload;
    });
    builder.addCase(fetchRecipies.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(pushRecipe.fulfilled, (state, action) => {
      state.recipies = [...state.recipies, action.payload];
      console.log("recipies", state.recipies);
    });
    builder.addCase(pushRecipe.rejected, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(deleteRecipe.fulfilled, (state, action) => {
      popRecipe(action.payload.id)
    });
    // builder.addCase(getImage.fulfilled, (state, action) => {
    //     state.imgStatus = "fulfilled";
    //     state.image = action.payload;
    //   });
  },
});
export const { getRecipeById,popRecipe,getEditors,  setName,
  setStatus,
  setDescription,
  setTimeToMake,
  setDifficultyLevel,
  setCategories,
  setInstructions,
  setIngredients,
  setImage,
  setNumOfPieces,
  setEditorId, } = recipiesSlice.actions;
export default recipiesSlice.reducer;
