import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";

const initialState = {
  measures: [],
  status: "init",
};

export const fetchMeasures = createAsyncThunk("fetchMeasures", async () => {
  try {
    const res = await axios.get(`https://localhost:7161/api/Measure`);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
    return "error  ";
  }
});

export const measuresSlice = createSlice({
  name: "measures",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMeasures.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.measures = action.payload;
      console.log("measures", state.measures);
    });
  },
});
export const {} = measuresSlice.actions;
export default measuresSlice.reducer;
