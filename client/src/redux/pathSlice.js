import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../utils/axios";

// Fetch All Path thunk
export const fetchAllPath = createAsyncThunk(
  "path/fetchAllPath",
  async (_, { rejectWithValue }) => {
    try {
      //   const { date } = data;
      const response = await axios.get("/", {
        headers: {},
        params: {},
      });

      //   console.log(response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch Single Vehicle Path thunk
export const fetchSinglePath = createAsyncThunk(
  "path/fetchSinglePath",
  async (data, { rejectWithValue }) => {
    try {
      const { vehicleId } = data;
      const response = await axios.get(`/vehicle/${vehicleId}`, {
        headers: {},
        params: {},
      });

      //   console.log(response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

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
      })
      .addCase(fetchSinglePath.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSinglePath.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.path = action.payload;
      })
      .addCase(fetchSinglePath.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectVehiclePaths = (state) => state.path.path;
export default pathSlice.reducer;
