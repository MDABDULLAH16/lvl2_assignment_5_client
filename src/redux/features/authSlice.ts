// authSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface User {
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

// Export actions
export const { setUser, clearUser } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;

// Selectors for accessing parts of the state
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
