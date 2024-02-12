import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../utils/axios";

export const fetchAllPath = createAsyncThunk("path/fetchAllPath", async () => {
  try {
    //   const { vehicleId, date } = data;
    const response = await axios.get("/");

    console.log(response);

    return response;
  } catch (error) {
    return error.response;
  }
});

const pathSlice = createSlice({
  name: "path",
  initialState: {
    path: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPath.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllPath.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.path = action.payload;
      })
      .addCase(fetchAllPath.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default pathSlice.reducer;
