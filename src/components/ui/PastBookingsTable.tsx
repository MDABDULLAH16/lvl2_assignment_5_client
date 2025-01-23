// /components/PastBookingsTable.tsx
import React from "react";

interface Booking {
  id: string;
  date: string;
  service: string;
}

interface PastBookingsTableProps {
  bookings: Booking[];
}

const PastBookingsTable: React.FC<PastBookingsTableProps> = ({ bookings }) => (
  <table className="past-bookings-table">
    <thead>
      <tr>
        <th>Date</th>
        <th>Service</th>
      </tr>
    </thead>
    <tbody>
      {bookings.map((booking) => (
        <tr key={booking.id}>
          <td>{booking.date}</td>
          <td>{booking.service}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default PastBookingsTable;
