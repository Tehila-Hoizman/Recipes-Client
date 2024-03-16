import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
const initialState = {
  comments: [],
  status: "init",
};

export const fetchComments = createAsyncThunk("fetchComments", async (_,thunkAPI) => {
  try {
    const res = await axios.get(`https://localhost:7161/api/Comment`);
    let r = [];
    let img="";
    await Promise.all(
      res.data.map(async (c) => {
        if(c.urlImageUser){
          img =  (await thunkAPI.dispatch(getImageComment(c.urlImageUser))).payload;
        }
        r.push({ ...c, urlUpdateImageUser: img });
      })
    );
    console.log("recipe res ", r);
    return r;
  }  catch (error) {
    console.log(error);
    return "error  ";
  }
});

export const addComment = createAsyncThunk(
  "addComment",
  async (comment, thunkAPI) => {
    try {
      const response = await axios.post(`https://localhost:7161/api/Comment`, {
        content: comment.content,
        commentDate: comment.commentDate,
        replyToId: comment.replyToId,
        userId: comment.userId,
        recipeId: comment.recipeId,
      });
      
      console.log(response);
      let c = response.data;
      c= {...c,urlUpdateImageUser:thunkAPI.getState().login.user.urlUpdateImage,userName:thunkAPI.getState().login.user.firstName+" "+thunkAPI.getState().login.user.lastName}
      thunkAPI.dispatch(pushComment(c));

      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const getImageComment = createAsyncThunk("getImageComment", async (image) => {
  if(image){
    
  try {
    const res = await axios.get(
      `https://localhost:7161/api/User/getImage/${image.toString()}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
});
export const deleteComment = createAsyncThunk(
  "deleteComment",
  async (id, thunkAPI) => {
    console.log("in deleteComment");
    const response = await axios.delete(
      `https://localhost:7161/api/Comment/${id}`
    );
    console.log(response);
    return response.data;
  }
);
export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    pushComment: (state, action) => {

      let date = new Date(action.payload.commentDate);
      let utcUploadTime = Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds()
      );
      utcUploadTime = utcUploadTime - 7200000;
      action.payload.commentDate = utcUploadTime;
      state.comments = [...state.comments, action.payload];
    },
    popComment: (state, action) => {
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.comments = action.payload;
      console.log("comments", state.comments);
    });
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.status = "rejected";
        console.error("error comments");
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.status = "fulfilled";
      
      console.log("comments", state.comments);
    });
    builder.addCase(addComment.rejected, (state, action) => {
      state.status = "rejected";
        console.error("error comments");
      });
      // builder.addCase(getImageComment.fulfilled, (state, action) => {
      //   // state.imgStatus = "fulfilled";
      //   // state.image = action.payload;
      //   state.status = "fulfilled";
      //   // state.user.urlUpdateImage = action.payload;
      //   // console.log("img", state.user.urlImage);
      // });
  },
});
export const {pushComment,popComment} = commentsSlice.actions;
export default commentsSlice.reducer;
