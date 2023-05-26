import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state for the single movie slice
const initialState = {};

// Define an asynchronous thunk action to fetch a single movie by its ID
export const fetchSingleMovieAsync = createAsyncThunk(
  "singleMovie",
  async (id) => {
    try {
      // Make a GET request to the API to fetch the movie data
      const { data } = await axios.get(`http://localhost:8080/api/movies/${id}`);
      // Return the fetched data
      return data;
    } catch (err) {
      // Log any errors that occur
      console.log(err);
    }
  }
);

// Create a slice for the single movie data
const singleMovieSlice = createSlice({
  name: "singleMovie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle the fulfilled state of the fetchSingleMovieAsync thunk action
    builder.addCase(fetchSingleMovieAsync.fulfilled, (state, action) => {
      // Update the state with the fetched movie data
      return action.payload;
    });
  },
});

// Define a selector to get the single movie data from the state
export const selectSingleMovie = (state) => {
  return state.singleMovie;
};

// Export the reducer as the default export
export default singleMovieSlice.reducer;
