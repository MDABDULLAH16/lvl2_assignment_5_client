/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define the user information type
export type TUserInfo = {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "admin" | "user";
  address: string;
};

interface UserDetailsState {
  userDetails: TUserInfo | null;
}

const initialState: UserDetailsState = {
  userDetails: null,
};

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: {
    userDetails: localStorage.getItem("userDetails")
      ? JSON.parse(localStorage.getItem("userDetails")!)
      : null,
  },
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = action.payload.userDetails;

      // Save userDetails to localStorage
      localStorage.setItem("userDetails", JSON.stringify(state.userDetails));
    },
    clearUserDetails: (state) => {
      state.userDetails = null;

      // Remove from localStorage
      localStorage.removeItem("userDetails");
    },
  },
});

// Export actions
export const { setUserDetails, clearUserDetails } = userDetailsSlice.actions;

// Export the reducer
export default userDetailsSlice.reducer;

// Selector for accessing user details in the state
export const selectUserDetails = (state: RootState) =>
  state.userDetails.userDetails;
