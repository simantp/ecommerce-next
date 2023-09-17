import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  cartList: "",
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addtoCart: (state, actions) => {
      return {};
    },
  },
});

export const { setLoginDetails } = productSlice.actions;
export default productSlice.reducer;
