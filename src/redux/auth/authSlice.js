// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // User data will be stored here
  token: null, // Auth token
  status: "idle", // Status of authentication (idle, loading, succeeded, failed)
  error: null, // Any error messages
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.status = "loading";
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.status = "succeeded";
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    loginFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = "idle";
    },
    registerStart: (state) => {
      state.status = "loading";
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.status = "succeeded";
      state.user = action.payload.data;
      state.token = action.payload.token;
    },
    registerFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, registerStart, registerSuccess, registerFailure } =
  authSlice.actions;

export default authSlice.reducer;
