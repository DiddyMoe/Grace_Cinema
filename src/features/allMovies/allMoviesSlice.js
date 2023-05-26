import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create an axios instance with the base URL pre-configured
const api = axios.create({
  baseURL: `http://localhost:8080/api/movies`,
});

// Initial state for the movies slice
const initialState = [];

// Async thunk to fetch movies from the API
export const fetchMoviesAsync = createAsyncThunk("movies", async () => {
  try {
    const { data } = await api.get("/");
    return data;
  } catch (err) {
    console.log(err);
  }
});

// Async thunk to add a movie to the API
export const addMovieAsync = createAsyncThunk("addMovie", async (movie) => {
  const { data } = await api.post("/", movie);
  return data;
});

// Async thunk to edit a movie in the API
export const editMovieAsync = createAsyncThunk("editMovie", async (movie) => {
  const { data } = await api.put(`/${movie.id}`, movie);
  return data;
});

// Async thunk to delete a movie from the API
export const deleteMovieAsync = createAsyncThunk("deleteMovie", async (id) => {
  await api.delete(`/${id}`);
  return id;
});

// Create the movies slice
const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle fulfilled fetchMoviesAsync action
    builder.addCase(fetchMoviesAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    // Handle fulfilled addMovieAsync action
    builder.addCase(addMovieAsync.fulfilled, (state, action) => {
      state.push(action.payload);
    });
    // Handle fulfilled editMovieAsync action
    builder.addCase(editMovieAsync.fulfilled, (state, action) => {
      const index = state.findIndex((movie) => movie.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    });
    // Handle fulfilled deleteMovieAsync action
    builder.addCase(deleteMovieAsync.fulfilled, (state, action) => {
      return state.filter((movie) => movie.id !== action.payload);
    });
  },
});

// Selector to get movies from the state
export const selectMovies = (state) => {
  return state.movies;
};

// Export the reducer
export default moviesSlice.reducer;
