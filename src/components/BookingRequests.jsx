import { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import { showSuccessToast, showErrorToast, showInfoToast } from "../utils/toast";
import { RefreshCw } from "lucide-react";

const BookingRequests = ({ authUser }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processingBookingId, setProcessingBookingId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());

  // Create a memoized fetchBookings function that we can use in useEffect
  const fetchBookings = useCallback(async (showRefreshMessage = false) => {
    try {
      if (showRefreshMessage) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await fetch("https://bookmyservice.onrender.com/api/booking/business-owner", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch bookings");
      }

      // Filter for pending bookings only
      const pendingBookings = data.data.filter(booking => booking.status === "PENDING");

      // Check if we have new bookings since last refresh
      if (showRefreshMessage && pendingBookings.length > bookings.length) {
        showInfoToast(`You have ${pendingBookings.length - bookings.length} new booking request(s)!`);
      }

      setBookings(pendingBookings);
      setLastRefreshed(new Date());
    } catch (err) {
      setError("Failed to load bookings: " + err.message);
      console.error("Fetch Bookings Error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [bookings.length]);

  // Initial fetch when component mounts or authUser changes
  useEffect(() => {
    fetchBookings();
  }, [authUser._id, fetchBookings]);

  // Set up auto-refresh every 30 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchBookings(true);
    }, 30000); // 30 seconds

    return () => clearInterval(intervalId);
  }, [fetchBookings]);

  // Manual refresh function
  const handleManualRefresh = () => {
    fetchBookings(true);
  };

  const handleAcceptBooking = async (bookingId) => {
    try {
      setProcessingBookingId(bookingId);
      const response = await fetch(`https://bookmyservice.onrender.com/api/booking/confirm/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to accept booking");
      }

      showSuccessToast("Booking accepted successfully! Email notification sent to the customer.");
      // Remove the accepted booking from the list
      setBookings(prevBookings => prevBookings.filter(booking => booking._id !== bookingId));
    } catch (err) {
      console.error("Accept Booking Error:", err);
      showErrorToast(err.message || "Failed to accept booking");
    } finally {
      setProcessingBookingId(null);
    }
  };

  const handleRejectBooking = async (bookingId) => {
    try {
      setProcessingBookingId(bookingId);
      const response = await fetch(`https://bookmyservice.onrender.com/api/booking/cancel-by-provider/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to reject booking");
      }

      showSuccessToast("Booking rejected. Payment will be refunded to the customer within 1 hour.");
      // Remove the rejected booking from the list
      setBookings(prevBookings => prevBookings.filter(booking => booking._id !== bookingId));
    } catch (err) {
      console.error("Reject Booking Error:", err);
      showErrorToast(err.message || "Failed to reject booking");
    } finally {
      setProcessingBookingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  // Refresh button and last refreshed timestamp
  const RefreshButton = () => (
    <div className="flex justify-between items-center mb-4">
      <div className="text-sm text-gray-500">
        Last refreshed: {format(lastRefreshed, "h:mm:ss a")}
      </div>
      <button
        onClick={handleManualRefresh}
        disabled={refreshing}
        className="flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-600 rounded-md hover:bg-orange-200 transition-colors"
      >
        <RefreshCw size={16} className={`${refreshing ? "animate-spin" : ""}`} />
        {refreshing ? "Refreshing..." : "Refresh"}
      </button>
    </div>
  );

  if (bookings.length === 0) {
    return (
      <>
        <RefreshButton />
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-orange-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-center text-gray-500 text-lg">No pending booking requests at the moment.</p>
        </div>
      </>
    );
  }

  return (
    <div className="space-y-6">
      <RefreshButton />
      {bookings.map((booking) => (
        <div key={booking._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="bg-orange-50 p-4 border-b border-orange-100">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800">
                Booking #{booking._id.substring(booking._id.length - 6)}
              </h3>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                Pending
              </span>
            </div>
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Service Details</h4>
              <p className="text-gray-600"><span className="font-medium">Service:</span> {booking.service.name}</p>
              <p className="text-gray-600"><span className="font-medium">Category:</span> {booking.service.category}</p>
              <p className="text-gray-600"><span className="font-medium">Price:</span> ${booking.amount}</p>
              {booking.service.duration && (
                <p className="text-gray-600"><span className="font-medium">Duration:</span> {booking.service.duration} minutes</p>
              )}
            </div>

            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Customer Details</h4>
              <p className="text-gray-600"><span className="font-medium">Name:</span> {booking.user.firstName} {booking.user.lastName}</p>
              <p className="text-gray-600"><span className="font-medium">Email:</span> {booking.user.email}</p>
              <p className="text-gray-600"><span className="font-medium">Phone:</span> {booking.user.phoneNumber}</p>
            </div>
          </div>

          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-2">
              <p className="text-gray-600 flex-1">
                <span className="font-medium">Booking Date:</span> {format(new Date(booking.date), "PPP")}
              </p>
              {booking.timeSlot && (
                <p className="text-gray-600 flex-1">
                  <span className="font-medium">Time Slot:</span> {booking.timeSlot}
                </p>
              )}
            </div>

            {booking.specialRequests && (
              <div className="mt-2">
                <p className="font-medium text-gray-700">Special Requests:</p>
                <p className="text-gray-600 bg-white p-2 rounded border border-gray-200 mt-1">
                  {booking.specialRequests}
                </p>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-200 flex justify-end space-x-4">
            <button
              onClick={() => handleRejectBooking(booking._id)}
              disabled={processingBookingId === booking._id}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
            >
              {processingBookingId === booking._id ? "Processing..." : "Reject & Refund"}
            </button>
            <button
              onClick={() => handleAcceptBooking(booking._id)}
              disabled={processingBookingId === booking._id}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
            >
              {processingBookingId === booking._id ? "Processing..." : "Accept Booking"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingRequests;
