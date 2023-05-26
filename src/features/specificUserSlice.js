import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state for the specific user slice
const initialState = {};

// Define an asynchronous thunk action to fetch a specific user by ID
export const fetchSpecificUserAsync = createAsyncThunk(
  "user",
  async (id) => {
    try {
      // Make a GET request to the API to fetch the user data
      const { data } = await axios.get(`http://localhost:8080/api/users/${id}`);
      // Return the fetched user data
      return data;
    } catch (err) {
      // Log any errors that occur
      console.log(err);
    }
  }
);

// Create a slice for the specific user data
const specificUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSpecificUserAsync.fulfilled, (state, action) => {
      // When the fetchSpecificUserAsync action is fulfilled,
      // update the state with the fetched user data
      return action.payload;
    });
  },
});

// Define a selector to get the specific user data from the state
export const selectSpecificUser = (state) => {
  return state.user;
};

// Export the reducer for the specific user slice
export default specificUserSlice.reducer;
