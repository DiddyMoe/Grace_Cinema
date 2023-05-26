import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Initial state of the cart
const initialState = {
  // Get cart items from local storage or set to an empty array if not found
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add a movie to the cart
    addToCart(state, action) {
      // Check if the movie is already in the cart
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        // If the movie is already in the cart, increase its quantity
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.info(`Increased ${state.cartItems[itemIndex].title} cart quantity`, {
          position: "bottom-left",
        });
      } else {
        // If the movie is not in the cart, add it with a quantity of 1
        const tempMovies = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempMovies);
        toast.success(`Added ${action.payload.title} to the cart`, {
          position: "bottom-left",
        });
      }

      // Update local storage with new cart items
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    // Remove a movie from the cart
    removeFromCart(state, action) {
      const nextCartItem = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
      state.cartItems = nextCartItem;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

      toast.error(`${action.payload.title} removed from cart`, {
        position: "bottom-left",
      });
    },
    // Decrease the quantity of a movie in the cart
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      // If the quantity is greater than 1, decrease it by 1
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        toast.info(`Decreased ${action.payload.title} cart quantity`, {
          position: "bottom-left",
        });
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        // If the quantity is equal to 1, remove the movie from the cart
        const nextCartItem = state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        );
        state.cartItems = nextCartItem;

        toast.error(`${action.payload.title} removed from cart`, {
          position: "bottom-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    // Clear all items from the cart
    clearCart(state, action) {
      state.cartItems = [];
      toast.error(`Cart cleared`, {
        position: "bottom-left",
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    // Calculate total quantity and amount of items in the cart
    getTotals(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        { total: 0, quantity: 0 }
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
  },
});

export const { addToCart, removeFromCart, decreaseCart, clearCart, getTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
