import {
  useGetSingleServiceQuery,
  useCreateBookingMutation,
} from "@/redux/api/baseApi";
import { clearBooking } from "@/redux/features/bookingSlice";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { TService } from "@/types/TServices";

import React, { useState } from "react";
import { useParams } from "react-router-dom";

const Booking: React.FC = () => {
  const { _id } = useParams<{ _id: string }>();
  const dispatch = useAppDispatch();
  const [isProcessing, setIsProcessing] = useState(false); // To handle payment loading state
  const user = useAppSelector(
    (state: RootState) => state.userDetails.userDetails
  );
  const { data: services } = useGetSingleServiceQuery(_id!);
  const [createBooking] = useCreateBookingMutation();
  const selectedService: TService | undefined = services?.data;

  const selectedSlot = useAppSelector(
    (state: RootState) => state.booking.selectedSlot
  );

  const handlePayment = async () => {
    if (!selectedService || !selectedSlot) {
      alert("Please select a service and a slot!");
      return;
    }

    setIsProcessing(true);

    try {
      const bookingData = {
        customer: user?.id || "guest",
        serviceId: selectedService._id,
        slotId: selectedSlot.id,
      };

      const response = await createBooking(bookingData).unwrap();
      console.log("Booking successful:", response);

      // Clear booking data after successful payment
      dispatch(clearBooking());
      alert("Payment successful!");
    } catch (error) {
      console.error("Booking failed:", error);
      alert("An error occurred while booking. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left Side - Service and Slot Details */}
      <div className="p-4">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">
          Service Summary
        </h2>
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-6">
          {selectedService ? (
            <>
              <h3 className="text-xl font-bold text-gray-800">
                {selectedService.name}
              </h3>
              <p className="text-gray-600 mb-2">
                Price: ${selectedService.price}
              </p>
              <p className="text-gray-600 mb-2">
                Duration: {selectedService.duration} minutes
              </p>
              <p className="text-gray-600">
                Description: {selectedService.description}
              </p>
            </>
          ) : (
            <p className="text-red-500">No service selected.</p>
          )}
        </div>

        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700">Selected Slot</h3>
          {selectedSlot ? (
            <>
              <p className="text-gray-600 mt-2">Date: {selectedSlot.date}</p>
              <p className="text-gray-600">
                Time: {selectedSlot.startTime} - {selectedSlot.endTime}
              </p>
            </>
          ) : (
            <p className="text-red-500">No slot selected.</p>
          )}
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
              value={user?.name || "Guest"}
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
              value={user?.email || "Not provided"}
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
              value={
                selectedSlot
                  ? `${selectedSlot.date} ${selectedSlot.startTime} - ${selectedSlot.endTime}`
                  : "No time selected"
              }
              readOnly
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Pay Now Button */}
          <button
            type="button"
            className={`w-full mt-4 ${
              isProcessing || !selectedService || !selectedSlot
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-md`}
            onClick={handlePayment}
            disabled={isProcessing || !selectedService || !selectedSlot}
          >
            {isProcessing ? "Processing..." : "Pay Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
