/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetUserBookingQuery } from "@/redux/api/baseApi";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from "react";

const UserBooking = () => {
  const { data: myBookings } = useGetUserBookingQuery(undefined);

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h1 className="text-2xl font-bold text-blue-600 mb-6">Your Bookings</h1>

        {/* Booking Cards */}
        {myBookings?.data && myBookings.data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myBookings?.data.map(
              (booking: {
                _id: Key | null | undefined;
                service: {
                  name:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | null
                    | undefined;
                  description:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | null
                    | undefined;
                  price:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | null
                    | undefined;
                };
                slot: {
                  date:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | null
                    | undefined;
                  startTime:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | null
                    | undefined;
                  endTime:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | null
                    | undefined;
                };
              }) => (
                <div
                  key={booking._id}
                  className="bg-white shadow-md rounded-lg overflow-hidden"
                >
                  {/* Image */}
                  {/* <img
                  src={booking.service.image}
                  alt={booking.service.name}
                  className="w-full h-40 object-cover"
                /> */}

                  {/* Booking Details */}
                  <div className="p-4 space-y-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {booking.service.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      <strong>Date:</strong> {booking.slot.date}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Time:</strong> {booking.slot.startTime} -{" "}
                      {booking.slot.endTime}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Description:</strong>{" "}
                      {booking.service.description}
                    </p>
                    <p className="text-sm text-blue-600 font-semibold">
                      <strong>Price:</strong> ${booking.service.price}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          <p className="text-center text-gray-600">
            No bookings found. Book a service to see details here.
          </p>
        )}
      </div>
    </div>
  );
};

export default UserBooking;
