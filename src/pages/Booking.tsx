import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import {
  useGetSingleServiceQuery,
  useCreateBookingMutation,
} from "@/redux/api/baseApi";
import { clearBooking } from "@/redux/features/bookingSlice";
import { TService } from "@/types/TServices";

const Booking: React.FC = () => {
  const { _id } = useParams<{ _id: string }>();
  const dispatch = useAppDispatch();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
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
    if (!selectedService || !selectedSlot || !selectedService._id) {
      console.log("Missing data:", {
        selectedService,
        selectedSlot,
        user,
      });
      return;
    }

    setIsProcessing(true);

    try {
      const bookingData = {
        customer: user?._id || "guest",
        serviceId: selectedService._id, // Assured to be a string
        slotId: selectedSlot.id,
        serviceName: selectedService.name,
        userName: user?.name || "Guest",
        email: user?.email || "No email provided",
        price: selectedService.price,
        time: `${selectedSlot.startTime} - ${selectedSlot.endTime}`,
      };

      // console.log("Booking data to be sent:", bookingData);

      const response = await createBooking(bookingData).unwrap();
      // console.log("Booking successful:", response);
      if (response.success ===true) {
        window.location.href = response.data.payment_url
      }
      dispatch(clearBooking());
      // setIsModalOpen(true); // Open the confirmation modal
    } catch (error) {
      console.error("Booking failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/services");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-4xl w-full p-6 bg-white rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side - Service and Slot Details */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-blue-600">
            Service Summary
          </h2>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-2">
            {selectedService ? (
              <>
                <h3 className="text-xl font-bold text-gray-800">
                  {selectedService.name}
                </h3>
                <p className="text-gray-600">
                  <strong>Price:</strong> ${selectedService.price}
                </p>
                <p className="text-gray-600">
                  <strong>Duration:</strong> {selectedService.duration} minutes
                </p>
                <p className="text-gray-600">
                  <strong>Description:</strong> {selectedService.description}
                </p>
                {!selectedSlot && (
                  <p className="text-red-500 mt-2">
                    No slots available for this service at the moment.
                  </p>
                )}
              </>
            ) : (
              <p className="text-red-500">No service selected.</p>
            )}
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700">
              Selected Slot
            </h3>
            {selectedSlot ? (
              <div className="text-gray-600 mt-2 space-y-1">
                <p>
                  <strong>Date:</strong> {selectedSlot.date}
                </p>
                <p>
                  <strong>Time:</strong> {selectedSlot.startTime} -{" "}
                  {selectedSlot.endTime}
                </p>
              </div>
            ) : (
              <p className="text-red-500">No slot selected.</p>
            )}
          </div>
        </div>

        {/* Right Side - User Information Form */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-blue-600">
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
              onClick={handlePayment}
              disabled={isProcessing || !selectedService || !selectedSlot}
              className={`w-full mt-4 py-2 px-4 rounded-lg font-semibold shadow-md transition-all duration-200 ${
                isProcessing || !selectedService || !selectedSlot
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {isProcessing ? "Processing..." : "Pay Now"}
            </button>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h3 className="text-xl font-semibold text-green-600">
              Booking Confirmed!
            </h3>
            <p className="mt-2 text-gray-700">
              Your booking for <strong>{selectedService?.name}</strong> has been
              successfully confirmed.
            </p>
            <button
              onClick={closeModal}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
