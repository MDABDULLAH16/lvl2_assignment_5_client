// src/redux/slices/bookingSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the types for our booking state
interface BookingState {
  selectedService?: {
    name: string;
    price: number;
    duration: number;
    description: string;
    image?: string;
  };
  selectedSlot?: {
    id: string;
    serviceId: string;
    date: string;
    startTime: string;
    endTime: string;
    isBooked: string;
  };
}

const initialState: BookingState = {
  selectedService: undefined,
  selectedSlot: undefined,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setService: (
      state,
      action: PayloadAction<BookingState["selectedService"]>
    ) => {
      state.selectedService = action.payload;
    },
    setSlot: (state, action: PayloadAction<BookingState["selectedSlot"]>) => {
      state.selectedSlot = action.payload;
    },
    clearBooking: (state) => {
      state.selectedService = undefined;
      state.selectedSlot = undefined;
    },
  },
});

// Export actions for use in components
export const { setService, setSlot, clearBooking } = bookingSlice.actions;

// Export reducer to include in store
export default bookingSlice.reducer;
