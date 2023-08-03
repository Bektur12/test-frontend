import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jwt: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    baseAuth(state, action) {
      const user = action.payload;
      state.jwt = user.jwt;
    },
    logout(state) {
      state.jwt = null;
    },
  },
});
export const { baseAuth, logout } = authSlice.actions;
export default authSlice;
