import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state for the movies slice
const initialState = [];

// Async thunk to fetch movies from the API
export const fetchMoviesAsync = createAsyncThunk("movies", async () => {
  try {
    const { data } = await axios.get(`http://localhost:8080/api/movies`);
    return data;
  } catch (err) {
    console.log(err);
  }
});

// Async thunk to add a movie to the API
export const addMovieAsync = createAsyncThunk("addMovie", async (movie) => {
  const { data } = await axios.post(`/api/movies`, movie);
  return data;
});

// Async thunk to edit a movie in the API
export const editMovieAsync = createAsyncThunk("editMovie", async (movie) => {
  const { data } = await axios.put(`/api/movies/${movie.id}`, movie);
  return data;
});

// Async thunk to delete a movie from the API
export const deleteMovieAsync = createAsyncThunk("deleteMovie", async (id) => {
  await axios.delete(`http://localhost:8080/api/movies/${id}`);
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
      const movies = state.filter((movie) => movie.id !== action.payload);
      state = [...movies, action.payload];
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
