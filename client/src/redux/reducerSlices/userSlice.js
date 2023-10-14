import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  token: "",
  userDetails: {},
  isLoggedIn: false,
  avatarImage: {},
  cartList: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoginDetails: (state, actions) => {
      const { token, isLoggedIn, userInfo } = actions.payload;
      return {
        ...state,
        token,
        isLoggedIn,
        userDetails: userInfo,
      };
    },
    changeUserDetails: (state, actions) => {
      state.userDetails = actions.payload;
    },
    logout: (state) => {
      return {
        ...initialState,
        cartList: [],
      };
    },
  },
});

export const { setLoginDetails, logout, changeUserDetails } = userSlice.actions;
export default userSlice.reducer;
