// /components/UpcomingBookings.tsx
import React from "react";
import CountdownTimer from "./CountdownTImer";

interface Booking {
  id: string;
  date: string;
  service: string;
}

interface UpcomingBookingsProps {
  bookings: Booking[];
}

const UpcomingBookings: React.FC<UpcomingBookingsProps> = ({ bookings }) => (
  <div className="upcoming-bookings">
    {bookings.map((booking) => (
      <div className="booking-card" key={booking.id}>
        <h4>{booking.service}</h4>
        <p>{booking.date}</p>
        <CountdownTimer targetDate={booking.date} />
      </div>
    ))}
  </div>
);

export default UpcomingBookings;
