import { useState } from 'react';
import BookingConfirmation from './Bookingconformation';


const BookingForm = ({ selectedService, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return !isSubmitted ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Book {selectedService.name}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full mb-3 p-2 border rounded"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="w-full mb-3 p-2 border rounded"
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="date"
            className="w-full mb-3 p-2 border rounded"
            onChange={handleChange}
            required
          />
          <input
            type="time"
            name="time"
            className="w-full mb-3 p-2 border rounded"
            onChange={handleChange}
            required
          />
          <div className="flex justify-between">
            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
              Cancel
            </button>
            <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded">
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <BookingConfirmation bookingDetails={{ ...formData, serviceName: selectedService.name }} />
  );
};

export default BookingForm;
