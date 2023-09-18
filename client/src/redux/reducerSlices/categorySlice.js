import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  name: "",
  slug: "",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    changeCategoryDetails: (state, actions) => {
      state.categoryDetails = actions.payload;
    },
  },
});

export const { changeCategoryDetails } = categorySlice.actions;
export default categorySlice.reducer;
