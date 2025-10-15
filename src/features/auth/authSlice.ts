import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { LoginResponse } from "@/types/authTypes";
import type { AuthState } from "./types";

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  userType: localStorage.getItem("userType"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<LoginResponse>) => {
      state.token = action.payload.authentication;
      state.userType = action.payload.userType;
      localStorage.setItem("token", action.payload.authentication);
      localStorage.setItem("userType", action.payload.userType);
    },
    logout: (state) => {
      state.token = null;
      state.userType = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userType");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
