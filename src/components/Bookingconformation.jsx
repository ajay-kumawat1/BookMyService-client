// import { useState } from 'react';

// const BookingConfirmation = () => {
//   const [isPaid, setIsPaid] = useState(false);

//   // Dummy booking data (replace with real data as needed)
//   const bookingDetails = {
//     serviceName: "Website Development",
//     date: "25th November 2023",
//     time: "2:00 PM",
//     price: "$499",
//     businessName: "Your Business Name",
//     contact: "+1 234 567 890 | info@yourbusiness.com"
//   };

//   // Payment handler (dummy function for now)
//   const handlePayment = (e) => {
//     e.preventDefault();
//     setIsPaid(true); // Simulate successful payment
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-12 px-4">
//       <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
//         <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">Booking Confirmation</h1>

//         {/* Booking Summary */}
//         <section className="mb-8">
//           <h2 className="text-2xl font-semibold mb-4">Booking Summary</h2>
//           <div className="space-y-2">
//             <p><strong>Service:</strong> {bookingDetails.serviceName}</p>
//             <p><strong>Date:</strong> {bookingDetails.date}</p>
//             <p><strong>Time:</strong> {bookingDetails.time}</p>
//             <p><strong>Price:</strong> {bookingDetails.price}</p>
//             <hr className="my-4" />
//             <p><strong>Business:</strong> {bookingDetails.businessName}</p>
//             <p><strong>Contact:</strong> {bookingDetails.contact}</p>
//           </div>
//         </section>

//         {/* Payment Gateway */}
//         {!isPaid ? (
//           <section className="mb-8">
//             <h2 className="text-2xl font-semibold mb-4">Payment Gateway</h2>
//             <form className="space-y-4" onSubmit={handlePayment}>
//               <input type="text" placeholder="Cardholder Name" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400" required />
//               <input type="text" placeholder="Card Number" maxLength="16" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400" required />
//               <div className="flex gap-4">
//                 <input type="text" placeholder="MM/YY" maxLength="5" className="w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-orange-400" required />
//                 <input type="text" placeholder="CVV" maxLength="3" className="w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-orange-400" required />
//               </div>
//               <button type="submit" className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all">
//                 Complete Payment
//               </button>
//             </form>
//           </section>
//         ) : (
//           // Booking Status After Payment
//           <section className="text-center">
//             <h2 className="text-2xl font-semibold text-green-600 mb-4">🎉 Payment Successful!</h2>
//             <p className="mb-4">Thank you for booking <strong>{bookingDetails.serviceName}</strong> on <strong>{bookingDetails.date}</strong> at <strong>{bookingDetails.time}</strong>.</p>
//             <p className="mb-6">A confirmation email has been sent to you.</p>

//             {/* Buttons */}
//             <div className="flex justify-center gap-4">
//               <a href="/" className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition">Go Back to Homepage</a>
//               <a href="/my-bookings" className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">View My Bookings</a>
//             </div>
//           </section>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookingConfirmation;
