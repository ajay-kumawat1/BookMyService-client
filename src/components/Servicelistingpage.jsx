import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BookingForm from "./BookingForm";

const Servicelistingpage = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch services from the API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/service/getAll", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Add JWT token for authentication
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }

        const data = await response.json();
        setServices(data.data); // Assuming the services are in `data.data`
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

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
      {loading ? (
        <div className="text-center py-6">Loading services...</div>
      ) : error ? (
        <div className="text-center py-6 text-red-500">Error: {error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service._id} // Use service ID as the key
              className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <img
                src={service.image || "/Service.jpg"} // Use default image if no image is provided
                alt={service.name}
                className="w-20 h-20 rounded-full mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
              <p className="text-gray-600 mb-2">{service.description}</p>
              <p className="text-gray-500 mb-4">
                Available: {service.availability}
              </p>
              <button
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
                onClick={() => handleBookNow(service)}
              >
                Book Now
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Booking Form */}
      {showForm && (
        <BookingForm
          selectedService={selectedService}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default Servicelistingpage;