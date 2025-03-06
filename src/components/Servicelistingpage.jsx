import React, { useState } from "react";
import BookingForm from "./BookingForm";
import { motion } from "framer-motion";

const Servicelistingpage = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    { name: "Glamour Salon", description: "Haircuts, Styling, and Spa", availability: "9 AM - 7 PM", image: "https://via.placeholder.com/80" },
    { name: "Sweet Tooth Bakery", description: "Cakes, Pastries, and Custom Orders", availability: "7 AM - 8 PM", image: "https://via.placeholder.com/80" },
    { name: "Auto Master Garage", description: "Car Repairs, Maintenance, and Services", availability: "8 AM - 6 PM", image: "https://via.placeholder.com/80" },
    { name: "Elite Fitness", description: "Gym, Personal Training, and Yoga", availability: "6 AM - 10 PM", image: "https://via.placeholder.com/80" },
    { name: "Pet Care Hub", description: "Veterinary Services and Pet Grooming", availability: "9 AM - 6 PM", image: "https://via.placeholder.com/80" },
    { name: "Pet Care Hub", description: "Veterinary Services and Pet Grooming", availability: "9 AM - 6 PM", image: "https://via.placeholder.com/80" },
    { name: "Pet Care Hub", description: "Veterinary Services and Pet Grooming", availability: "9 AM - 6 PM", image: "https://via.placeholder.com/80" },
    { name: "Pet Care Hub", description: "Veterinary Services and Pet Grooming", availability: "9 AM - 6 PM", image: "https://via.placeholder.com/80" },
    { name: "Pet Care Hub", description: "Veterinary Services and Pet Grooming", availability: "9 AM - 6 PM", image: "https://via.placeholder.com/80" },
  ];

  const handleBookNow = (service) => {
    setSelectedService(service);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      {/* Filter Section */}
      <div className="bg-[#e5c8a5] p-4 rounded-lg shadow-md mb-6 text-center">
        <h2 className="text-xl font-semibold">Filters</h2>
      </div>

      {/* Service Listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <img
              src={service.image}
              alt={service.name}
              className="w-20 h-20 rounded-full mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
            <p className="text-gray-600 mb-2">{service.description}</p>
            <p className="text-gray-500 mb-4">Available: {service.availability}</p>
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
              onClick={() => handleBookNow(service)}
            >
              Book Now
            </button>
          </motion.div>
        ))}
      </div>

      {/* Booking Form */}
      {showForm && <BookingForm selectedService={selectedService} onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default Servicelistingpage;
