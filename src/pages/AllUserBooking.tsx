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

  const bookings: Booking[] = apiResponse?.data || [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
          Loading bookings...
        </p>
      </div>
    );
  }

  if (isError || !apiResponse?.success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-lg font-semibold text-red-600 dark:text-red-400">
          Failed to load bookings. Please try again later.
        </p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
          No bookings available.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6 text-center">
          All User Bookings
        </h1>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {booking.serviceName}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                <strong>User Email:</strong> {booking.email}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                <strong>Time:</strong> {booking.time}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                <strong>Description:</strong> {booking.description}
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold mt-2">
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
