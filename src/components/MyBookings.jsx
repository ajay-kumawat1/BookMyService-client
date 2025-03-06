import React, { useState, useEffect } from 'react';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  // Dummy booking data (replace with real data from an API or local storage)
  useEffect(() => {
    const dummyBookings = [
      {
        id: 1,
        serviceName: "Website Development",
        date: "25th November 2023",
        time: "2:00 PM",
        price: "$499",
        status: "Confirmed",
      },
      {
        id: 2,
        serviceName: "SEO Optimization",
        date: "28th November 2023",
        time: "11:00 AM",
        price: "$299",
        status: "Pending",
      },
    ];
    setBookings(dummyBookings);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">My Bookings</h1>

        {bookings.length === 0 ? (
          <p className="text-center text-gray-600">You have no bookings yet.</p>
        ) : (
          <ul className="space-y-6">
            {bookings.map((booking) => (
              <li key={booking.id} className="border p-4 rounded-lg shadow-sm hover:shadow-md transition">
                <h2 className="text-xl font-semibold">{booking.serviceName}</h2>
                <p><strong>Date:</strong> {booking.date}</p>
                <p><strong>Time:</strong> {booking.time}</p>
                <p><strong>Price:</strong> {booking.price}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={booking.status === "Confirmed" ? "text-green-600" : "text-yellow-500"}>
                    {booking.status}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8 text-center">
          <a href="/" className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition">
            Back to Homepage
          </a>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
