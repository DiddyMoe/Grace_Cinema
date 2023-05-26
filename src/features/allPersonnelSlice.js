import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state for the personnel slice
const initialState = [];

// Define an asynchronous thunk action to fetch personnel data from the API
export const fetchPersonnelAsync = createAsyncThunk(
  "personnel/fetchPersonnel",
  async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/personnel`);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

// Define a slice for the personnel data
const personnelSlice = createSlice({
  name: "personnel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle the fulfilled state of the fetchPersonnelAsync action
    builder.addCase(fetchPersonnelAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

// Define a selector to get the personnel data from the state
export const selectPersonnel = (state) => state.personnel;

// Export the reducer as the default export
export default personnelSlice.reducer;
