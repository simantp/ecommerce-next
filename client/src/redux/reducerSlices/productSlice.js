import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  cartList: [],
  cartToatalQuantity: 0,
  cartTotalAMount: 0,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      //state.productData = [...state.productData, action.payload];
      const newItem = action.payload;
      const existingItem = state.cartList.find(
        (item) => item._id === newItem._id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartList.push({ ...newItem, quantity: 1 });
      }
      return state;
    },
    increaseQuantity: (state, action) => {
      const existingItem = state.cartList.find(
        (item) => item._id === action.payload._id
      );
      existingItem && existingItem.quantity++;
    },
    decreaseQuantity: (state, action) => {
      const existingItem = state.cartList.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem?.quantity === 1) {
        existingItem.quantity = 1;
      } else {
        existingItem.quantity--;
      }
    },
    deleteProduct: (state, action) => {
      state.cartList = state.cartList.filter(
        (item) => item._id !== action.payload
      );
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, deleteProduct } =
  productSlice.actions;
export default productSlice.reducer;
