import { createSlice } from "@reduxjs/toolkit";
import { register, login, logout, fetchCurrentUser } from "./auth-operations";

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshCurrentUser: false,
};

const authorizationSlice = createSlice({
  name: "authorization",
  initialState,
  extraReducers: {
    [register.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },

    [login.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },

    [logout.fulfilled](state, action) {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    },
    [fetchCurrentUser.pending](state, _) {
      state.isRefreshCurrentUser = true;
    },
    [fetchCurrentUser.fulfilled](state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isRefreshCurrentUser = false;
    },
    [fetchCurrentUser.rejected](state, _) {
      state.isRefreshCurrentUser = false;
    },
  },
});

export default authorizationSlice.reducer;
