/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TService = {
  _id?: string;
  name: string;
  price: number;
  description: string;
  duration: number;
  image: string;
};

type TInitialState = {
  services: TService[]; // Explicitly define the 'services' property
  [x: string]: any; // Allow additional properties of any type if needed
};

const initialState: TInitialState = {
  services: [],
};

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setServiceDetails(state, action: PayloadAction<TService>) {
      const serviceIndex = state.services.findIndex(
        (service) => service._id === action.payload._id
      );

      if (serviceIndex !== -1) {
        // Update the existing service
        state.services[serviceIndex] = action.payload;
      } else {
        // Add a new service
        state.services.push(action.payload);
      }
    },
    clearServiceDetails() {
      return initialState;
    },
    deleteService(state, action: PayloadAction<string>) {
      state.services = state.services.filter(
        (service) => service._id !== action.payload
      );
    },
  },
});

export const { setServiceDetails, clearServiceDetails, deleteService } =
  serviceSlice.actions;
export default serviceSlice.reducer;
