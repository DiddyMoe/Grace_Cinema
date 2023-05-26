import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Set initial state to an empty array
const initialState = [];

// Async thunk to fetch users from API
export const fetchUsersAsync = createAsyncThunk("users", async () => {
 try {
   // Make GET request to API endpoint
   const { data } = await axios.get(`http://localhost:8080/api/users`);
   // Return the data received from the API
   return data;
 } catch (err) {
   // Log any errors
   console.log(err);
 }
});

// Async thunk to add a user to the API
export const addUserAsync = createAsyncThunk("addUser", async (user) => {
 // Make POST request to API endpoint with user data
 const { data } = await axios.post(`/api/users`, user);
 // Return the data received from the API
 return data;
});

// Create a slice for users
const usersSlice = createSlice({
 name: "users",
 initialState,
 reducers: {},
 extraReducers: (builder) => {
   // Handle fulfilled fetchUsersAsync action
   builder.addCase(fetchUsersAsync.fulfilled, (state, action) => {
     // Set state to the payload received from the API
     return action.payload;
   });
   // Handle fulfilled addUserAsync action
   builder.addCase(addUserAsync.fulfilled, (state, action) => {
     // Add the new user to the state array
     state.push(action.payload);
   });
 },
});

// Selector to get users from state
export const selectUsers = (state) => {
 return state.users;
};

// Export the reducer as default
export default usersSlice.reducer;
