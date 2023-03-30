import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isUser: false,
    user_id: 125888,
  },
  reducers: {
    setUser: (state, action) => {
      state.isUser = true;
    },

    setId: (state, action) => {
      state.user_id = 125888;
    },

    onLogout: (state, action) => {
      state.isUser = false;
    },
  },
});

export const { setUser, onLogout, setId } = authSlice.actions;

export default authSlice.reducer;
