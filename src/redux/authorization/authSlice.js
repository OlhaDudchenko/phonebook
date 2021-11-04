import { createSlice } from "@reduxjs/toolkit";
// import { RootState } from "src/app/store";

export const auth = createSlice({
  name: "auth",
  initialState: { user: null, token: null, isLoggedIn: false, isLogout: false },
  reducers: {
    setCredentials: (state, { payload: { user, token } }) => {
      state.user = user;
      state.token = token;
      state.isLoggedIn = true;
    },
    unsetCredentials: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.isLogout = true;
    },
    refreshCredentials: (state, { payload }) => {
      state.user = payload;
      // state.token = token;
      state.isLoggedIn = true;
    },
  },
  extraReducers: (builder) => {},
});
// console.log(authSlice)

export const { setCredentials, unsetCredentials, refreshCredentials } =
  auth.actions;
// console.log(setCredentials)

export default auth.reducer;

// export const selectCurrentUser = (state) => state.auth.user;
