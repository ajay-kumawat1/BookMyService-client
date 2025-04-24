// import { useState } from "react";

// const BookingForm = ({ selectedService, onClose }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     date: "",
//     time: "",
//     paymentMethod: "creditCard", // Default payment method
//   });

//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [isPaid, setIsPaid] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsSubmitted(true);
//   };

//   const handlePayment = (e) => {
//     e.preventDefault();
//     setIsPaid(true); // Simulate successful payment
//   };

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
//                 className="w-full mb-3 p-2 border rounded"
//                 onChange={handleChange}
//                 required
//               />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Your Email"
//                 className="w-full mb-3 p-2 border rounded"
//                 onChange={handleChange}
//                 required
//               />
//               <input
//                 type="date"
//                 name="date"
//                 className="w-full mb-3 p-2 border rounded"
//                 onChange={handleChange}
//                 required
//               />
//               <input
//                 type="time"
//                 name="time"
//                 className="w-full mb-3 p-2 border rounded"
//                 onChange={handleChange}
//                 required
//               />
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
//         ) : !isPaid ? (
//           <>
//             <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
//             <form onSubmit={handlePayment}>
//               <div className="mb-4">
//                 <label className="block font-medium mb-2">Payment Method</label>
//                 <select
//                   name="paymentMethod"
//                   value={formData.paymentMethod}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded"
//                 >
//                   <option value="creditCard">Credit Card</option>
//                   <option value="paypal">PayPal</option>
//                   <option value="bankTransfer">Bank Transfer</option>
//                 </select>
//               </div>

//               {formData.paymentMethod === "creditCard" && (
//                 <>
//                   <input
//                     type="text"
//                     placeholder="Cardholder Name"
//                     className="w-full mb-3 p-2 border rounded"
//                     required
//                   />
//                   <input
//                     type="text"
//                     placeholder="Card Number"
//                     maxLength="16"
//                     className="w-full mb-3 p-2 border rounded"
//                     required
//                   />
//                   <div className="flex gap-4 mb-3">
//                     <input
//                       type="text"
//                       placeholder="MM/YY"
//                       maxLength="5"
//                       className="w-1/2 p-2 border rounded"
//                       required
//                     />
//                     <input
//                       type="text"
//                       placeholder="CVV"
//                       maxLength="3"
//                       className="w-1/2 p-2 border rounded"
//                       required
//                     />
//                   </div>
//                 </>
//               )}

//               {formData.paymentMethod === "paypal" && (
//                 <div className="mb-4">
//                   <p className="text-gray-600">
//                     You will be redirected to PayPal to complete your payment.
//                   </p>
//                 </div>
//               )}

//               {formData.paymentMethod === "bankTransfer" && (
//                 <div className="mb-4">
//                   <p className="text-gray-600">
//                     Please transfer the amount to the following bank account:
//                   </p>
//                   <p className="text-gray-800 font-semibold">
//                     Account Number: 1234 5678 9012
//                   </p>
//                   <p className="text-gray-800 font-semibold">
//                     Bank Name: Example Bank
//                   </p>
//                 </div>
//               )}

//               <div className="flex justify-between">
//                 <button
//                   type="button"
//                   onClick={() => setIsSubmitted(false)}
//                   className="bg-gray-500 text-white px-4 py-2 rounded"
//                 >
//                   Back
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-orange-500 text-white px-4 py-2 rounded"
//                 >
//                   Complete Payment
//                 </button>
//               </div>
//             </form>
//           </>
//         ) : (
//           <div className="text-center">
//             <h2 className="text-2xl font-semibold text-green-600 mb-4">
//               🎉 Payment Successful!
//             </h2>
//             <p className="mb-4">
//               Thank you for booking <strong>{selectedService.name}</strong> on{" "}
//               <strong>{formData.date}</strong> at <strong>{formData.time}</strong>.
//             </p>
//             <p className="mb-6">A confirmation email has been sent to you.</p>

//             <div className="flex justify-center gap-4">
//               <button
//                 onClick={onClose}
//                 className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
//               >
//                 Go Back to Homepage
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
import { useState } from "react";
import axios from "axios";

const BookingForm = ({ selectedService, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    paymentMethod: selectedService.payment_options[0] || "cash", // Default to first available method
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setError(null);

    try {
      const response = await axios.post(`https://bookmyservice.onrender.com/api/bookings/confirm`, {
        serviceId: selectedService._id,
        userName: formData.name,
        email: formData.email,
        date: formData.date,
        time: formData.time,
        paymentMethod: formData.paymentMethod,
        amount: selectedService.price * 100 || 0, // Amount in cents, default to 0 if not set
      });

      if (response.data.success) {
        setIsSuccess(true);
      } else {
        setError(response.data.error || "Booking confirmation failed.");
      }
    } catch (err) {
      setError("An error occurred: " + err.message);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">🎉 Booking Successful!</h2>
        <p className="mb-4">
          Thank you for booking <strong>{selectedService.name}</strong> on{" "}
          <strong>{formData.date}</strong> at <strong>{formData.time}</strong>.
        </p>
        <p className="mb-6">A confirmation email has been sent to <strong>{formData.email}</strong>.</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
          >
            Go Back to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        {!isSubmitted ? (
          <>
            <h2 className="text-xl font-semibold mb-4">Book {selectedService.name}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mb-3 p-2 border rounded"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mb-3 p-2 border rounded"
                required
              />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full mb-3 p-2 border rounded"
                required
              />
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full mb-3 p-2 border rounded"
                required
              />
              <div className="mb-4">
                <label className="block font-medium mb-2">Payment Method</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  {selectedService.payment_options.map((method) => (
                    <option key={method} value={method}>
                      {method.charAt(0).toUpperCase() + method.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-4 py-2 rounded"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4">Booking Confirmation</h2>
            <p className="mb-4">
              You selected <strong>{formData.paymentMethod.toUpperCase()}</strong> for your booking of{" "}
              <strong>{selectedService.name}</strong> (Amount: ${(selectedService.price || 0).toFixed(2)}).
            </p>
            {formData.paymentMethod !== "cash" && (
              <div className="mb-4 text-gray-600">
                Please process your payment separately through your chosen method.
              </div>
            )}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-orange-500 text-white px-4 py-2 rounded"
                disabled={isSubmitted}
              >
                Confirm Booking
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingForm;