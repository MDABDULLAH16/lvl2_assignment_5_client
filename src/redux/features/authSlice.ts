import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: {
    email: string;
    name: string;
    // Add more fields as per your user data structure
  } | null;
  token: string | null;
}

const initialState: UserState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ user: UserState["user"]; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
