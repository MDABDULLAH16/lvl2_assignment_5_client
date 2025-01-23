import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RootState } from "../redux/store";

import { useAppSelector } from "@/redux/hooks";
import { useGetUserBookingQuery } from "@/redux/api/baseApi";
import CountdownTimer from "@/components/ui/CountdownTImer";
import UserBooking from "./UserBooking";

const UserDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { data: myBookings } = useGetUserBookingQuery(undefined);

  const userInfo = useAppSelector(
    (state: RootState) => state.userDetails.userDetails
  );

  const nextSlot = myBookings?.upcoming?.[0];

  useEffect(() => {
    // Example actions to fetch user and bookings
    // dispatch(fetchUserInfo());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">User Dashboard</h1>
          {nextSlot && (
            <div className="flex items-center space-x-2">
              <p className="text-sm text-gray-600">Next Booking:</p>
              <CountdownTimer targetDate={nextSlot.date} />
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto p-6">
        {/* Welcome Section */}
        <section className="bg-white shadow-sm rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-2">
            Welcome, {userInfo?.name || "Guest"}!
          </h2>
          <p className="text-gray-600">
            Manage your bookings and account information below.
          </p>
        </section>

        {/* Bookings Section */}
        <section className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">Your Bookings</h3>
          {/* Use the UserBooking Component */}
          <UserBooking />
        </section>
      </main>
    </div>
  );
};

export default UserDashboard;
