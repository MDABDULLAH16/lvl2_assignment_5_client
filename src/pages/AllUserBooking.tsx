import React from "react";
import { useGetAllUserBookingQuery } from "@/redux/api/baseApi";

interface Booking {
  serviceName: string;
  email: string;
  time: string;
  description: string;
  price: number;
  _id: string;
}

const AllUserBooking: React.FC = () => {
  const {
    data: apiResponse,
    isLoading,
    isError,
  } = useGetAllUserBookingQuery(undefined);

  // Extract the `data` array from the API response
  const bookings: Booking[] = apiResponse?.data || [];
  console.log("bookings", bookings);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-semibold text-blue-600">
          Loading bookings...
        </p>
      </div>
    );
  }

  // Error state
  if (isError || !apiResponse?.success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-semibold text-red-600">
          Failed to load bookings. Please try again later.
        </p>
      </div>
    );
  }

  // No bookings
  if (bookings.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-medium text-gray-600">
          No bookings available.
        </p>
      </div>
    );
  }

  // Main content
  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          All User Bookings
        </h1>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              {/* Booking Details */}
              <h3 className="text-lg font-semibold text-gray-800">
                {booking.serviceName}
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                <strong>User Email:</strong> {booking.email}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <strong>Time:</strong> {booking.time}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <strong>Description:</strong> {booking.description}
              </p>
              <p className="text-sm text-blue-600 font-semibold mt-2">
                <strong>Price:</strong> ${booking.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllUserBooking;
