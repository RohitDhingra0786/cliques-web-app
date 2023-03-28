import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isUser: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.isUser = true;
    },

    onLogout: (state, action) => {
      state.isUser = false;
    },
  },
});

export const { setUser, onLogout } = authSlice.actions;

export default authSlice.reducer;
