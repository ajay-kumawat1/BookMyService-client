// // import { useState } from "react";

// // const BookingForm = ({ selectedService, onClose }) => {
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     date: "",
// //     time: "",
// //     paymentMethod: "creditCard", // Default payment method
// //   });

// //   const [isSubmitted, setIsSubmitted] = useState(false);
// //   const [isPaid, setIsPaid] = useState(false);

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     setIsSubmitted(true);
// //   };

// //   const handlePayment = (e) => {
// //     e.preventDefault();
// //     setIsPaid(true); // Simulate successful payment
// //   };

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
// //       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
// //         {!isSubmitted ? (
// //           <>
// //             <h2 className="text-xl font-semibold mb-4">Book {selectedService.name}</h2>
// //             <form onSubmit={handleSubmit}>
// //               <input
// //                 type="text"
// //                 name="name"
// //                 placeholder="Your Name"
// //                 className="w-full mb-3 p-2 border rounded"
// //                 onChange={handleChange}
// //                 required
// //               />
// //               <input
// //                 type="email"
// //                 name="email"
// //                 placeholder="Your Email"
// //                 className="w-full mb-3 p-2 border rounded"
// //                 onChange={handleChange}
// //                 required
// //               />
// //               <input
// //                 type="date"
// //                 name="date"
// //                 className="w-full mb-3 p-2 border rounded"
// //                 onChange={handleChange}
// //                 required
// //               />
// //               <input
// //                 type="time"
// //                 name="time"
// //                 className="w-full mb-3 p-2 border rounded"
// //                 onChange={handleChange}
// //                 required
// //               />
// //               <div className="flex justify-between">
// //                 <button
// //                   type="button"
// //                   onClick={onClose}
// //                   className="bg-gray-500 text-white px-4 py-2 rounded"
// //                 >
// //                   Cancel
// //                 </button>
// //                 <button
// //                   type="submit"
// //                   className="bg-orange-500 text-white px-4 py-2 rounded"
// //                 >
// //                   Confirm Booking
// //                 </button>
// //               </div>
// //             </form>
// //           </>
// //         ) : !isPaid ? (
// //           <>
// //             <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
// //             <form onSubmit={handlePayment}>
// //               <div className="mb-4">
// //                 <label className="block font-medium mb-2">Payment Method</label>
// //                 <select
// //                   name="paymentMethod"
// //                   value={formData.paymentMethod}
// //                   onChange={handleChange}
// //                   className="w-full p-2 border rounded"
// //                 >
// //                   <option value="creditCard">Credit Card</option>
// //                   <option value="paypal">PayPal</option>
// //                   <option value="bankTransfer">Bank Transfer</option>
// //                 </select>
// //               </div>

// //               {formData.paymentMethod === "creditCard" && (
// //                 <>
// //                   <input
// //                     type="text"
// //                     placeholder="Cardholder Name"
// //                     className="w-full mb-3 p-2 border rounded"
// //                     required
// //                   />
// //                   <input
// //                     type="text"
// //                     placeholder="Card Number"
// //                     maxLength="16"
// //                     className="w-full mb-3 p-2 border rounded"
// //                     required
// //                   />
// //                   <div className="flex gap-4 mb-3">
// //                     <input
// //                       type="text"
// //                       placeholder="MM/YY"
// //                       maxLength="5"
// //                       className="w-1/2 p-2 border rounded"
// //                       required
// //                     />
// //                     <input
// //                       type="text"
// //                       placeholder="CVV"
// //                       maxLength="3"
// //                       className="w-1/2 p-2 border rounded"
// //                       required
// //                     />
// //                   </div>
// //                 </>
// //               )}

// //               {formData.paymentMethod === "paypal" && (
// //                 <div className="mb-4">
// //                   <p className="text-gray-600">
// //                     You will be redirected to PayPal to complete your payment.
// //                   </p>
// //                 </div>
// //               )}

// //               {formData.paymentMethod === "bankTransfer" && (
// //                 <div className="mb-4">
// //                   <p className="text-gray-600">
// //                     Please transfer the amount to the following bank account:
// //                   </p>
// //                   <p className="text-gray-800 font-semibold">
// //                     Account Number: 1234 5678 9012
// //                   </p>
// //                   <p className="text-gray-800 font-semibold">
// //                     Bank Name: Example Bank
// //                   </p>
// //                 </div>
// //               )}

// //               <div className="flex justify-between">
// //                 <button
// //                   type="button"
// //                   onClick={() => setIsSubmitted(false)}
// //                   className="bg-gray-500 text-white px-4 py-2 rounded"
// //                 >
// //                   Back
// //                 </button>
// //                 <button
// //                   type="submit"
// //                   className="bg-orange-500 text-white px-4 py-2 rounded"
// //                 >
// //                   Complete Payment
// //                 </button>
// //               </div>
// //             </form>
// //           </>
// //         ) : (
// //           <div className="text-center">
// //             <h2 className="text-2xl font-semibold text-green-600 mb-4">
// //               🎉 Payment Successful!
// //             </h2>
// //             <p className="mb-4">
// //               Thank you for booking <strong>{selectedService.name}</strong> on{" "}
// //               <strong>{formData.date}</strong> at <strong>{formData.time}</strong>.
// //             </p>
// //             <p className="mb-6">A confirmation email has been sent to you.</p>

// //             <div className="flex justify-center gap-4">
// //               <button
// //                 onClick={onClose}
// //                 className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
// //               >
// //                 Go Back to Homepage
// //               </button>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };
// import { useState } from "react";
// import axios from "axios";

// const BookingForm = ({ selectedService, onClose }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     date: "",
//     time: "",
//     paymentMethod: selectedService.payment_options[0] || "cash", // Default to first available method
//   });

//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitted(true);
//     setError(null);

//     try {
//       const response = await axios.post(`http://localhost:5000/api/bookings/confirm`, {
//         serviceId: selectedService._id,
//         userName: formData.name,
//         email: formData.email,
//         date: formData.date,
//         time: formData.time,
//         paymentMethod: formData.paymentMethod,
//         amount: selectedService.price * 100 || 0, // Amount in cents, default to 0 if not set
//       });

//       if (response.data.success) {
//         setIsSuccess(true);
//       } else {
//         setError(response.data.error || "Booking confirmation failed.");
//       }
//     } catch (err) {
//       setError("An error occurred: " + err.message);
//     }
//   };

//   if (isSuccess) {
//     return (
//       <div className="text-center">
//         <h2 className="text-2xl font-semibold text-green-600 mb-4">🎉 Booking Successful!</h2>
//         <p className="mb-4">
//           Thank you for booking <strong>{selectedService.name}</strong> on{" "}
//           <strong>{formData.date}</strong> at <strong>{formData.time}</strong>.
//         </p>
//         <p className="mb-6">A confirmation email has been sent to <strong>{formData.email}</strong>.</p>
//         <div className="flex justify-center gap-4">
//           <button
//             onClick={onClose}
//             className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
//           >
//             Go Back to Homepage
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//         {!isSubmitted ? (
//           <>
//             <h2 className="text-xl font-semibold mb-4">Book {selectedService.name}</h2>
//             <form onSubmit={handleSubmit}>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Your Name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full mb-3 p-2 border rounded"
//                 required
//               />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Your Email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full mb-3 p-2 border rounded"
//                 required
//               />
//               <input
//                 type="date"
//                 name="date"
//                 value={formData.date}
//                 onChange={handleChange}
//                 className="w-full mb-3 p-2 border rounded"
//                 required
//               />
//               <input
//                 type="time"
//                 name="time"
//                 value={formData.time}
//                 onChange={handleChange}
//                 className="w-full mb-3 p-2 border rounded"
//                 required
//               />
//               <div className="mb-4">
//                 <label className="block font-medium mb-2">Payment Method</label>
//                 <select
//                   name="paymentMethod"
//                   value={formData.paymentMethod}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded"
//                   required
//                 >
//                   {selectedService.payment_options.map((method) => (
//                     <option key={method} value={method}>
//                       {method.charAt(0).toUpperCase() + method.slice(1)}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="flex justify-between">
//                 <button
//                   type="button"
//                   onClick={onClose}
//                   className="bg-gray-500 text-white px-4 py-2 rounded"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-orange-500 text-white px-4 py-2 rounded"
//                 >
//                   Confirm Booking
//                 </button>
//               </div>
//             </form>
//           </>
//         ) : (
//           <>
//             <h2 className="text-xl font-semibold mb-4">Booking Confirmation</h2>
//             <p className="mb-4">
//               You selected <strong>{formData.paymentMethod.toUpperCase()}</strong> for your booking of{" "}
//               <strong>{selectedService.name}</strong> (Amount: ${(selectedService.price || 0).toFixed(2)}).
//             </p>
//             {formData.paymentMethod !== "cash" && (
//               <div className="mb-4 text-gray-600">
//                 Please process your payment separately through your chosen method.
//               </div>
//             )}
//             <div className="flex justify-between">
//               <button
//                 type="button"
//                 onClick={() => setIsSubmitted(false)}
//                 className="bg-gray-500 text-white px-4 py-2 rounded"
//               >
//                 Back
//               </button>
//               <button
//                 type="button"
//                 onClick={handleSubmit}
//                 className="bg-orange-500 text-white px-4 py-2 rounded"
//                 disabled={isSubmitted}
//               >
//                 Confirm Booking
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// // export default BookingForm;
// import { useState, useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import axios from "axios";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { ClipLoader } from "react-spinners";

// const stripePromise = loadStripe("pk_test_51RHpvzRt8duH55YBdRX6yOZifCuNJsQqOfVYtcXmoTo0L1XXT4DLXMcriqkQNs34thdLrUxlTJJSnF4eusrTBL6e0076YgOZMv");

// const PaymentForm = ({ amount, onSuccess, onError }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [paymentProcessing, setPaymentProcessing] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;

//     setPaymentProcessing(true);

//     try {
//       // 1. Create Payment Intent
//       const { data: { clientSecret } } = await axios.post("/api/create-payment-intent", {
//         amount: amount * 100,
//       });

//       // 2. Confirm Payment
//       const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//         },
//       });

//       if (error) throw error;
//       if (paymentIntent.status === "succeeded") onSuccess();
//     } catch (err) {
//       onError(err.message);
//     } finally {
//       setPaymentProcessing(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <CardElement className="p-2 border rounded" />
//       <button
//         type="submit"
//         disabled={paymentProcessing || !stripe}
//         className="bg-orange-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
//       >
//         {paymentProcessing ? <ClipLoader size={20} color="#fff" /> : "Pay Now"}
//       </button>
//     </form>
//   );
// };

// const BookingForm = ({ selectedService, onClose }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     date: "",
//     time: "",
//     paymentMethod: selectedService.payment_options[0] || "cash",
//     specialRequests: "",
//   });

//   const [step, setStep] = useState("details"); // 'details' | 'payment' | 'confirmation'
//   const [status, setStatus] = useState("idle"); // 'idle' | 'processing' | 'success' | 'error'
//   const [error, setError] = useState(null);
//   const [bookingId, setBookingId] = useState(null);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const validateDetails = () => {
//     if (!formData.name || !formData.email) {
//       setError("Name and email are required");
//       return false;
//     }
//     if (!formData.date || new Date(formData.date) < new Date()) {
//       setError("Please select a valid future date");
//       return false;
//     }
//     return true;
//   };

//   const submitBookingDetails = async () => {
//     if (!validateDetails()) return;

//     setStatus("processing");
//     try {
//       const response = await axios.post("/api/bookings", {
//         serviceId: selectedService._id,
//         ...formData,
//         amount: selectedService.price,
//       });

//       setBookingId(response.data.bookingId);

//       if (formData.paymentMethod === "cash") {
//         setStep("confirmation");
//         setStatus("success");
//       } else {
//         setStep("payment");
//         setStatus("idle");
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Booking failed");
//       setStatus("error");
//     }
//   };

//   const handlePaymentSuccess = () => {
//     setStep("confirmation");
//     setStatus("success");
//   };

//   const handlePaymentError = (message) => {
//     setError(message);
//     setStatus("error");
//   };

//   if (step === "confirmation" && status === "success") {
//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//         <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
//           <div className="text-green-500 text-5xl mb-4">✓</div>
//           <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
//           <p className="mb-4">
//             Your booking for <strong>{selectedService.name}</strong> on{" "}
//             <strong>{new Date(formData.date).toLocaleDateString()}</strong> at{" "}
//             <strong>{formData.time}</strong> is confirmed.
//           </p>
//           <p className="mb-6">A confirmation has been sent to {formData.email}</p>
//           <button
//             onClick={onClose}
//             className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
//           >
//             Done
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//         <h2 className="text-xl font-semibold mb-4">
//           {step === "details" ? "Booking Details" : "Payment Information"}
//         </h2>

//         {error && (
//           <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
//             {error}
//           </div>
//         )}

//         {step === "details" ? (
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Full Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Date</label>
//               <input
//                 type="date"
//                 name="date"
//                 min={new Date().toISOString().split('T')[0]}
//                 value={formData.date}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Time</label>
//               <input
//                 type="time"
//                 name="time"
//                 value={formData.time}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Payment Method</label>
//               <select
//                 name="paymentMethod"
//                 value={formData.paymentMethod}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//               >
//                 {selectedService.payment_options.map((method) => (
//                   <option key={method} value={method}>
//                     {method.charAt(0).toUpperCase() + method.slice(1)}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Special Requests</label>
//               <textarea
//                 name="specialRequests"
//                 value={formData.specialRequests}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//                 rows={3}
//               />
//             </div>
//             <div className="flex justify-between pt-2">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="bg-gray-500 text-white px-4 py-2 rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={submitBookingDetails}
//                 disabled={status === "processing"}
//                 className="bg-orange-500 text-white px-4 py-2 rounded disabled:bg-orange-300"
//               >
//                 {status === "processing" ? (
//                   <ClipLoader size={20} color="#fff" />
//                 ) : (
//                   "Continue to Payment"
//                 )}
//               </button>
//             </div>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             <div className="bg-gray-100 p-4 rounded">
//               <h3 className="font-medium">Order Summary</h3>
//               <div className="flex justify-between mt-2">
//                 <span>{selectedService.name}</span>
//                 <span>${selectedService.price.toFixed(2)}</span>
//               </div>
//             </div>

//             {formData.paymentMethod === "card" ? (
//               <PaymentForm
//                 amount={selectedService.price}
//                 onSuccess={handlePaymentSuccess}
//                 onError={handlePaymentError}
//               />
//             ) : (
//               <div className="space-y-4">
//                 <p className="text-gray-700">
//                   You selected <strong>Cash Payment</strong>. Please bring the exact amount to your appointment.
//                 </p>
//                 <button
//                   onClick={() => handlePaymentSuccess()}
//                   className="bg-orange-500 text-white px-4 py-2 rounded w-full"
//                 >
//                   Confirm Cash Booking
//                 </button>
//               </div>
//             )}

//             <button
//               type="button"
//               onClick={() => setStep("details")}
//               className="text-orange-500 underline text-sm"
//             >
//               Back to details
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookingForm;

// export default BookingForm;
// import { useState, useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import axios from "axios";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { ClipLoader } from "react-spinners";
// import StripeElementsWrapper from './StripeElementsWrapper';

// const stripePromise = loadStripe("pk_test_51RHpvzRt8duH55YBdRX6yOZifCuNJsQqOfVYtcXmoTo0L1XXT4DLXMcriqkQNs34thdLrUxlTJJSnF4eusrTBL6e0076YgOZMv");

// const PaymentForm = ({ amount, onSuccess, onError }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [paymentProcessing, setPaymentProcessing] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;

//     setPaymentProcessing(true);

//     try {
//       // 1. Create Payment Intent on your backend
//       const { data: { clientSecret } } = await axios.post("http://localhost:5000/api/stripe/payment-intent", {
//         amount: amount * 100, // Convert to cents
//         currency: 'usd',
//         metadata: {
//           integration_check: 'accept_a_payment'
//         }
//       },{
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       });

//       // 2. Confirm the payment with Stripe
//       const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//           billing_details: {
//             name: 'Customer Name' // You might want to pass this from form data
//           }
//         }
//       });

//       if (error) {
//         throw error;
//       }

//       if (paymentIntent.status === 'succeeded') {
//         onSuccess(paymentIntent.id); // Pass paymentIntent.id to the parent
//       }
//     } catch (err) {
//       onError(err.message);
//     } finally {
//       setPaymentProcessing(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <CardElement
//         className="p-2 border rounded"
//         options={{
//           style: {
//             base: {
//               fontSize: '16px',
//               color: '#424770',
//               '::placeholder': {
//                 color: '#aab7c4',
//               },
//             },
//             invalid: {
//               color: '#9e2146',
//             },
//           },
//         }}
//       />
//       <button
//         type="submit"
//         disabled={paymentProcessing || !stripe}
//         className="bg-orange-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
//       >
//         {paymentProcessing ? <ClipLoader size={20} color="#fff" /> : `Pay $${amount.toFixed(2)}`}
//       </button>
//     </form>
//   );
// };

// const BookingForm = ({ selectedService, onClose }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     date: "",
//     time: "",
//     paymentMethod: selectedService.payment_options[0] || "cash",
//     specialRequests: "",
//   });

//   const [step, setStep] = useState("details"); // 'details' | 'payment' | 'confirmation'
//   const [status, setStatus] = useState("idle"); // 'idle' | 'processing' | 'success' | 'error'
//   const [error, setError] = useState(null);
//   const [bookingId, setBookingId] = useState(null);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const validateDetails = () => {
//     if (!formData.name || !formData.email) {
//       setError("Name and email are required");
//       return false;
//     }
//     if (!formData.date || new Date(formData.date) < new Date()) {
//       setError("Please select a valid future date");
//       return false;
//     }
//     return true;
//   };

// // Main booking submission function
// // const handleBookingSubmit = async () => {
// //   try {
// //     // 1. First create the booking record
// //     const bookingResponse = await axios.post(
// //       'http://localhost:5000/api/booking/create',
// //       {
// //         serviceId: selectedService._id,
// //         date: formData.date,
// //         timeSlot: formData.timeSlot,
// //         specialRequests: formData.specialRequests
// //       },
// //       {
// //         headers: {
// //           Authorization: `Bearer ${localStorage.getItem('token')}`
// //         }
// //       }
// //     );

// //        // 2. Process payment
// //        const paymentRes = await axios.post('/api/stripe/payment-intent', {
// //         amount: total,
// //         cardId: selectedCardId
// //       });

// //       // 3. Confirm payment with Stripe.js
// //       const { error, paymentIntent } = await stripe.confirmCardPayment(
// //         paymentRes.data.clientSecret
// //       );


// //     if (error) throw error;

// //     // 4. Update backend with payment success
// //     await handlePaymentSuccess(paymentIntent.id);

// //     // 4. Show success
// //     setStep('confirmation');
// //   } catch (error) {
// //     setError(error.response?.data?.message || 'Booking failed');
// //   }
// // };

// const handleBookingSubmit = async () => {
//   try {
//     setStatus("processing");
//     setError(null);

//     // 1. First validate details
//     if (!validateDetails()) return;

//     // 2. Create the booking record
//     const bookingResponse = await axios.post(
//       'http://localhost:5000/api/booking/create',
//       {
//         serviceId: selectedService._id,
//         date: formData.date,
//         timeSlot: formData.time,
//         specialRequests: formData.specialRequests
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       }
//     );

//     // Save the booking ID for later updates
//     setBookingId(bookingResponse.data.booking._id);

//     // 3. Move to payment step if paying by card
//     if (formData.paymentMethod === "card") {
//       setStep("payment");
//     } else {
//       // For cash payments, confirm immediately
//       await handlePaymentSuccess('cash_payment');
//     }

//     if (paymentIntent.status === 'succeeded') {
//       onSuccess(paymentIntent.id); // This must be called
//     }
//   } catch (error) {
//     setError(error.response?.data?.message || 'Booking creation failed');
//     setStatus("error");
//   }
// };

//   // const handlePaymentSuccess = async (paymentIntentId) => {
//   //   try {
//   //     // Update the booking with payment information
//   //     await axios.put(`/api/bookings/${bookingId}`, {
//   //       paymentIntentId,
//   //       status: "CONFIRMED"
//   //     });

//   //     setStep("confirmation");
//   //     setStatus("success");
//   //   } catch (err) {
//   //     setError("Payment succeeded but booking update failed");
//   //     setStatus("error");
//   //   }
//   // };


// // Modified payment success handler
// const handlePaymentSuccess = async (paymentIntentId) => {
//   try {
//     setStatus("processing");

//     // Update booking with payment confirmation
//     await axios.put(
//       `http://localhost:5000/api/booking/${bookingId}/payment`,
//       { paymentIntentId },
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       }
//     );

//     setStep("confirmation");
//     setStatus("success");
//   } catch (err) {
//     setError(err.response?.data?.message || "Confirmation failed");
//     setStatus("error");
//   }
// };

//   const handlePaymentError = (message) => {
//     setError(message);
//     setStatus("error");
//   };

//   if (step === "confirmation" && status === "success") {
//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//         <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
//           <div className="text-green-500 text-5xl mb-4">✓</div>
//           <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
//           <p className="mb-4">
//             Your booking for <strong>{selectedService.name}</strong> on{" "}
//             <strong>{new Date(formData.date).toLocaleDateString()}</strong> at{" "}
//             <strong>{formData.time}</strong> is confirmed.
//           </p>
//           {formData.paymentMethod === "card" && (
//             <p className="mb-2">Payment of ${selectedService.price.toFixed(2)} was processed successfully.</p>
//           )}
//           <p className="mb-6">A confirmation has been sent to {formData.email}</p>
//           <button
//             onClick={onClose}
//             className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
//           >
//             Done
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//         <h2 className="text-xl font-semibold mb-4">
//           {step === "details" ? "Booking Details" : "Payment Information"}
//         </h2>

//         {error && (
//           <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
//             {error}
//           </div>
//         )}

//         {step === "details" ? (
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Full Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Date</label>
//               <input
//                 type="date"
//                 name="date"
//                 min={new Date().toISOString().split('T')[0]}
//                 value={formData.date}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Time</label>
//               <input
//                 type="time"
//                 name="time"
//                 value={formData.time}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Payment Method</label>
//               <select
//                 name="paymentMethod"
//                 value={formData.paymentMethod}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//               >
//                 {selectedService.payment_options.map((method) => (
//                   <option key={method} value={method}>
//                     {method.charAt(0).toUpperCase() + method.slice(1)}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Special Requests</label>
//               <textarea
//                 name="specialRequests"
//                 value={formData.specialRequests}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//                 rows={3}
//               />
//             </div>
//             <div className="flex justify-between pt-2">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="bg-gray-500 text-white px-4 py-2 rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={handleBookingSubmit}
//                 disabled={status === "processing"}
//                 className="bg-orange-500 text-white px-4 py-2 rounded disabled:bg-orange-300"
//               >
//                 {status === "processing" ? (
//                   <ClipLoader size={20} color="#fff" />
//                 ) : (
//                   "Continue to Payment"
//                 )}
//               </button>
//             </div>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             <div className="bg-gray-100 p-4 rounded">
//               <h3 className="font-medium">Order Summary</h3>
//               <div className="flex justify-between mt-2">
//                 <span>{selectedService.name}</span>
//                 <span>${selectedService.price.toFixed(2)}</span>
//               </div>
//             </div>

//             {step === "payment" && (
//           <StripeElementsWrapper>
//             <PaymentForm
//               amount={selectedService.price}
//               onSuccess={handlePaymentSuccess}
//               onError={handlePaymentError}
//             />
//           </StripeElementsWrapper>
//         )} : (
//               <div className="space-y-4">
//                 <p className="text-gray-700">
//                   You selected <strong>Cash Payment</strong>. Please bring the exact amount to your appointment.
//                 </p>
//                 <button
//                   onClick={() => handlePaymentSuccess('cash_payment')}
//                   className="bg-orange-500 text-white px-4 py-2 rounded w-full"
//                 >
//                   Confirm Cash Booking
//                 </button>
//               </div>
//             )

//             <button
//               type="button"
//               onClick={() => setStep("details")}
//               className="text-orange-500 underline text-sm"
//             >
//               Back to details
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookingForm;
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { ClipLoader } from "react-spinners";
import StripeElementsWrapper from './StripeElementsWrapper';
import { showSuccessToast, showErrorToast, showInfoToast } from "../utils/toast";

const stripePromise = loadStripe("pk_test_51RHpvjRwGVLBR8IvPlzc8e77oWu5rmdPmubQ46XeYwHfVjAp6XuTIikB1MHZ7KmuAdIRTnJ1EjQfMgPNnJUVNmJA00YRaGqv20");

const PaymentForm = ({ amount, onSuccess, onError, formData = {} }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      console.error('[PaymentForm] Stripe or elements not initialized');
      onError('Stripe not initialized');
      return;
    }

    setPaymentProcessing(true);

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('Authentication token not found');
      }

      // Create Payment Intent
      const response = await axios.post(
        "http://localhost:5000/api/stripe/payment-intent",
        { amount: Math.round(amount * 100) }, // Ensure amount is rounded to avoid decimal issues
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const { clientSecret } = response.data;

      if (!clientSecret) {
        throw new Error('No clientSecret received from backend');
      }

      // Confirm the payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: formData.name || 'Customer',
            email: formData.email || ''
          }
        }
      });

      if (error) {
        console.error('[PaymentForm] Stripe confirmation error:', error);
        showErrorToast(`Payment failed: ${error.message}`);
        throw new Error(`Payment failed: ${error.message}`);
      }

      if (paymentIntent.status === 'succeeded') {
        showSuccessToast('Payment processed successfully!');
        onSuccess(paymentIntent.id);
      } else {
        showErrorToast(`Payment status: ${paymentIntent.status}`);
        throw new Error(`Payment status: ${paymentIntent.status}`);
      }
    } catch (err) {
      console.error('[PaymentForm] Error:', err);
      onError(err.message || 'Payment failed');
    } finally {
      setPaymentProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement
        className="p-2 border rounded"
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <div className="text-sm text-gray-600 mt-2">
        <p>Use test card: 4242 4242 4242 4242</p>
        <p>Any future date, any 3-digit CVC</p>
      </div>
      <button
        type="submit"
        disabled={paymentProcessing || !stripe}
        className="bg-orange-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
      >
        {paymentProcessing ? <ClipLoader size={20} color="#fff" /> : `Pay $${amount.toFixed(2)}`}
      </button>
    </form>
  );
};

const BookingForm = ({ selectedService, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    specialRequests: "",
  });

  const [step, setStep] = useState("details"); // 'details' | 'payment' | 'confirmation'
  const [status, setStatus] = useState("idle"); // 'idle' | 'processing' | 'success' | 'error'
  const [error, setError] = useState(null);
  const [bookingId, setBookingId] = useState(null);
  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await axios.get('http://localhost:5000/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.success) {
          const user = response.data.data;
          // Pre-fill form with user data
          setFormData(prev => ({
            ...prev,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email
          }));
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateDetails = () => {
    if (!formData.name || !formData.email) {
      setError("Name and email are required");
      showErrorToast("Name and email are required");
      return false;
    }
    if (!formData.date || new Date(formData.date) < new Date()) {
      setError("Please select a valid future date");
      showErrorToast("Please select a valid future date");
      return false;
    }
    if (!formData.time) {
      setError("Please select a time slot");
      showErrorToast("Please select a time slot");
      return false;
    }
    return true;
  };

  const handleBookingSubmit = async () => {
    try {
      setStatus("processing");
      setError(null);

      // Validate details
      if (!validateDetails()) {
        setStatus("idle");
        return;
      }

      // Create the booking record
      const bookingResponse = await axios.post(
        'http://localhost:5000/api/booking/create',
        {
          serviceId: selectedService._id,
          date: formData.date,
          timeSlot: formData.time,
          specialRequests: formData.specialRequests
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      // Save the booking ID for later updates
      setBookingId(bookingResponse.data.booking._id);

      // Move to payment step
      setStep("payment");
      setStatus("idle");
      showInfoToast("Booking details saved. Please complete payment.");

    } catch (error) {
      console.error("Booking creation error:", error);
      const errorMessage = error.response?.data?.message || 'Booking creation failed';
      setError(errorMessage);
      showErrorToast(errorMessage);
      setStatus("error");
    }
  };

  const handlePaymentSuccess = async (paymentIntentId) => {
    try {
      setStatus("processing");

      // Update booking with payment confirmation
      await axios.put(
        `http://localhost:5000/api/booking/${bookingId}/payment`,
        { paymentIntentId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      // Book the service
      await axios.put(
        `http://localhost:5000/api/service/bookService/${selectedService._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      setStep("confirmation");
      setStatus("success");
      showSuccessToast("Booking request sent! Thank you for your payment.");
      showInfoToast("The business owner will review your booking request shortly.");
    } catch (err) {
      console.error("Payment confirmation error:", err);
      const errorMessage = err.response?.data?.message || "Confirmation failed";
      setError(errorMessage);
      showErrorToast(errorMessage);
      setStatus("error");
    }
  };

  const handlePaymentError = (message) => {
    setError(message);
    showErrorToast(message);
    setStatus("error");
  };

  if (step === "confirmation" && status === "success") {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
          <div className="text-green-500 text-5xl mb-4">✓</div>
          <h2 className="text-2xl font-bold mb-2">Booking Request Sent!</h2>
          <p className="mb-2">
            Your booking request for <strong>{selectedService.name}</strong> on{" "}
            <strong>{new Date(formData.date).toLocaleDateString()}</strong> at{" "}
            <strong>{formData.time}</strong> is pending approval.
          </p>
          <p className="mb-2">Payment of ${selectedService.price.toFixed(2)} was processed successfully.</p>
          <p className="mb-2">The business owner will review your request shortly.</p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 text-left">
            <p className="text-blue-700 font-bold">What happens next?</p>
            <ul className="list-disc ml-5 mt-2 text-blue-700 text-sm">
              <li>The business owner will review your booking request</li>
              <li>You'll receive an email when your booking is accepted or rejected</li>
              <li>If rejected, your payment will be refunded within 1 hour</li>
              <li>You can check your booking status in "My Bookings"</li>
            </ul>
          </div>
          <button
            onClick={onClose}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">
          {step === "details" ? "Booking Details" : "Payment Information"}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {step === "details" ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="date"
                name="date"
                min={new Date().toISOString().split('T')[0]}
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Special Requests</label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={3}
              />
            </div>
            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleBookingSubmit}
                disabled={status === "processing"}
                className="bg-orange-500 text-white px-4 py-2 rounded disabled:bg-orange-300"
              >
                {status === "processing" ? (
                  <ClipLoader size={20} color="#fff" />
                ) : (
                  "Continue to Payment"
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded">
              <h3 className="font-medium">Order Summary</h3>
              <div className="flex justify-between mt-2">
                <span>{selectedService.name}</span>
                <span>${selectedService.price.toFixed(2)}</span>
              </div>
            </div>

            <StripeElementsWrapper>
              <PaymentForm
                amount={selectedService.price}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
                formData={formData}
              />
            </StripeElementsWrapper>

            <button
              type="button"
              onClick={() => setStep("details")}
              className="text-orange-500 underline text-sm"
            >
              Back to details
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingForm;