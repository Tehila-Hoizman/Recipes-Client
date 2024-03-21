import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isConnect: false,
  user: {urlImage:""},
  status: "init",
  image: null,
};

export const getUser = createAsyncThunk("getUser", async (user,thunkAPI) => {
  try {
    const res = await axios.get(
      `https://localhost:7161/api/User/${user.email}/${user.password}`
    );
  return res.data;
  } catch (error) {
    console.log(error);
    thunkAPI.dispatch(setStatus("rejected"));
    throw new Error("this user doesnt exist");
  }
});
export const addUser = createAsyncThunk("addUser", async (user, thunkApi) => {
  try {
    const formData = new FormData();
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("level", user.level);
    formData.append("wantNewsletter", user.wantNewsletter);
    formData.append("filelImage", user.filelImage);
    formData.append("urlImage", user.urlImage);
    const response = await axios.post(
      `https://localhost:7161/api/User`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    return error;
  }
});
export const updateUser = createAsyncThunk(
  "updateUser",
  async (user, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("firstName", user.firstName);
      formData.append("lastName", user.lastName);
      formData.append("email", user.email);
      formData.append("password", user.password);
      formData.append("level", user.level);
      formData.append("wantNewsletter", user.wantNewsletter);
      formData.append("filelImage", user.filelImage);
      formData.append("urlImage", null);
      console.log("user", user);
      const response = await axios.put(
        `https://localhost:7161/api/User/${user.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      let u = response.data;
      let img = "";
      if(response.data.urlImage)
      img =  (await thunkAPI.dispatch(getImageUser(response.data.urlImage))).payload;
      u = {...u,urlImage:img};
      return u;
    } catch (error) {
      return error;
    }
  }
);
export const getImageUser = createAsyncThunk("getImageUser", async (image) => {
  if(image){
    debugger
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

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    disconnect: (state) => {
      state.isConnect = false;
      state.user = {UrlImage:""};
      state.status = "init";
    },
    connect: (state) => {
      state.isConnect = true;
    },
    setUser: (state, action) => {
      state.user = {
        ...action.payload,
        FilelImage: action.payload.FilelImage ? action.payload.FilelImage.name : null,
      };  
    },
    setStatus: (state, action) => {
      state.status = action.payload;
      console.log(state.status);
    },
    setImageProfile: (state, action) => {
      state.image = action.payload;
      console.log(state.status);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.user = action.payload;

    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.status = "rejected";
      console.error(action.error);
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.user = action.payload;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.status = "rejected";
      console.error(action.error);
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.user = action.payload;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.status = "rejected";
      state.user = action.payload;
      console.log("get-user-complete: ",state.status);
    });
  },
});
export const { disconnect, connect, setUser, setAlert, setStatus,setImageProfile } =loginSlice.actions;
export default loginSlice.reducer;
