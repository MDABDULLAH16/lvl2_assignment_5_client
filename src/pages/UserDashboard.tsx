import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RootState } from "../redux/store";

import CountdownTimer from "@/components/ui/CountdownTImer";
import PastBookingsTable from "@/components/ui/PastBookingsTable";
import UpcomingBookings from "@/components/ui/UpcomingBookings";
import { useAppSelector } from "@/redux/hooks";

const UserDashboard: React.FC = () => {
  const dispatch = useDispatch();

  const userInfo = useAppSelector(
    (state: RootState) => state.userDetails.userDetails
  );
  const bookings = useAppSelector((state: RootState) => state.bookings);

  useEffect(() => {
    // Example actions to fetch user and bookings
    // dispatch(fetchUserInfo());
    // dispatch(fetchBookings());
  }, [dispatch]);

  const nextSlot = bookings?.upcoming?.[0];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
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

      <main className="container mx-auto p-6">
        <section className="bg-white shadow-sm rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-2">
            Welcome, {userInfo?.name || "Guest"}!
          </h2>
          <p className="text-gray-600">
            Manage your bookings and account information below.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Past Bookings */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Past Bookings</h3>
            <PastBookingsTable bookings={bookings?.past || []} />
          </div>

          {/* Upcoming Bookings */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Upcoming Bookings</h3>
            <UpcomingBookings bookings={bookings?.upcoming || []} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default UserDashboard;
