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
  initialState: (() => {
    try {
      const storedUserDetails = localStorage.getItem("userDetails");
      if (storedUserDetails) {
        return { userDetails: JSON.parse(storedUserDetails) };
      }
    } catch (error) {
      console.error("Error parsing userDetails from localStorage:", error);
      localStorage.removeItem("userDetails"); // Clear corrupted data
    }
    return initialState;
  })(),
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = action.payload.userDetails;
      localStorage.setItem("userDetails", JSON.stringify(state.userDetails));
    },
    clearUserDetails: (state) => {
      state.userDetails = null;
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
