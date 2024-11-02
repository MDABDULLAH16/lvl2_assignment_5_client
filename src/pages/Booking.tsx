// src/pages/Booking.tsx

import { clearBooking } from "@/redux/features/bookingSlice";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { RootState } from "@/redux/store";

import React from "react";

const Booking: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(
    (state: RootState) => state.userDetails.userDetails
  );
  const selectedService = useAppSelector(
    (state: RootState) => state.booking.selectedService
  );
  const selectedSlot = useAppSelector(
    (state: RootState) => state.booking.selectedSlot
  );

  const handlePayment = () => {
    // Implement payment processing logic here
    console.log("Processing payment...");
    dispatch(clearBooking());
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left Side - Service and Slot Details */}
      <div className="p-4">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">
          Service Summary
        </h2>
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-6">
          <h3 className="text-xl font-bold text-gray-800">
            {selectedService?.name}
          </h3>
          <p className="text-gray-600 mb-2">Price: ${selectedService?.price}</p>
          <p className="text-gray-600 mb-2">
            Duration: {selectedService?.duration} minutes
          </p>
          <p className="text-gray-600">
            Description: {selectedService?.description}
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700">Selected Slot</h3>
          <p className="text-gray-600 mt-2">Date: {selectedSlot?.date}</p>
          <p className="text-gray-600">
            Time: {selectedSlot?.startTime} - {selectedSlot?.endTime}
          </p>
        </div>
      </div>

      {/* Right Side - User Information Form */}
      <div className="p-4">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">
          Booking Information
        </h2>
        <form className="space-y-4">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={user?.name || ""}
              readOnly
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Selected Time Display */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Selected Time
            </label>
            <input
              type="text"
              value={`${selectedSlot?.date} ${selectedSlot?.startTime} - ${selectedSlot?.endTime}`}
              readOnly
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Pay Now Button */}
          <button
            type="button"
            className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-md"
            onClick={handlePayment}
            disabled={!selectedService || !selectedSlot}
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
