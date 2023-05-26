import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state of the orders
const initialState = [];

// Async thunk to fetch orders from the API
export const fetchOrdersAsync = createAsyncThunk("orders", async () => {
  try {
    const { data } = await axios.get(`http://localhost:8080/api/orders`);
    return data;
  } catch (err) {
    console.log(err);
  }
});

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle the fulfilled action of fetchOrdersAsync
    builder.addCase(fetchOrdersAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

// Selector to get orders from the state
export const selectOrders = (state) => {
  return state.orders;
};

export default ordersSlice.reducer;
