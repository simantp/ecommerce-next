import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  token: "",
  userDetails: {},
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoginDetails: (state, actions) => {
      const { token, isLoggedIn, userInfo } = actions.payload;
      const { password, ...userInfoWithoutPassword } = userInfo;
      return {
        ...state,
        token,
        isLoggedIn,
        userInfoWithoutPassword,
      };
    },
    logout: (state) => {
      return {
        ...state,
        token: null,
        isLoggedIn: false,
        userInfo: null,
        userInfoWithoutPassword: null,
      };
    },
  },
});

export const { setLoginDetails, logout } = userSlice.actions;
export default userSlice.reducer;
