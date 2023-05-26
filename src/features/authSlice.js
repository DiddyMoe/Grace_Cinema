import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const TOKEN = 'token';

// Async thunk to get user information
export const me = createAsyncThunk("auth/me", async () => {
 try {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
   const res = await axios.get('/auth/me', {
    headers: {
     authorization: token,
    },
   });
   return res.data;
  } else {
   return {};
  }
 } catch (err) {
  if(err.response.data) {
   return thunkAPI.rejectWithValue(err.response.data);
  } else {
   return 'There is an issue with your request'
  }
 }
});

// Async thunk to authenticate user
export const authenticate = createAsyncThunk('auth/authenticate', async ({ email, password, method }, thunkAPI) => {
 try{
  const res = await axios.post(`/auth/${method}`, { email, password });
  window.localStorage.setItem(TOKEN, res.data.token);
  thunkAPI.dispatch(me());
 }catch(err) {
  if (err.response.data) {
   return thunkAPI.rejectWithValue(err.response.data);
  } else {
   return 'There was an issue with your request.';
  }
 }
})

// Slice to handle authentication state
export const authSlice = createSlice({
 name: 'auth',
 initialState: {
  me: {},
  error: null,
 },
 reducers: {
  logout(state, action) {
   window.localStorage.removeItem(TOKEN);
   state.me = {};
   state.error = null;
  },
 },
 extraReducers: (builder) => {
  builder.addCase(me.fulfilled, (state, action) => {
   state.me = action.payload;
  });
  builder.addCase(me.rejected, (state, action) => {
   state.error = action.error;
  });
  builder.addCase(authenticate.rejected, (state, action) => {
   state.error = action.payload;
  });
 },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
