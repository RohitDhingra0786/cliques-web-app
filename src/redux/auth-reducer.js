import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isUser: false,
    user_id: 125888,
    usersList: [],
    user: null,
    selectedUser: null,
    selectedUserDetail: null,
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload?.handler_details;
      // state.user_id = payload?.assigned_users?.[0]?.user_id || null;
      state.usersList = payload?.assigned_users;
      state.isUser = true;
      state.selectedUser = payload?.assigned_users?.[0];
    },

    setSelectedUser: (state, { payload }) => {
      // state.user_id = payload?.user_id || null;
      state.user_id = 125888;
      state.selectedUser = payload;
    },

    setSelectedUserDetail: (state, { payload }) => {
      state.selectedUserDetail = payload;
    },

    onLogout: (state, action) => {
      state.isUser = false;
      state.user = null;
      state.user_id = null;
      state.usersList = [];
      state.selectedUser = null;
    },
  },
});

export const { setUser, setSelectedUser, setSelectedUserDetail, onLogout } =
  authSlice.actions;

export default authSlice.reducer;
