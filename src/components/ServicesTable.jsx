import { useState, useEffect } from "react";
import { MdOutlineEdit, MdDelete } from "react-icons/md";
import { showSuccessToast, showErrorToast } from "../utils/toast";

const ServicesTable = ({ authUser, onEdit }) => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDeleteService = async (serviceId) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/service/delete/${serviceId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete service");
      }

      // Update the local state to remove the deleted service
      setServices(prevServices => prevServices.filter(service => service._id !== serviceId));
      showSuccessToast("Service deleted successfully");
    } catch (err) {
      console.error("Delete Service Error:", err);
      showErrorToast(err.message || "Failed to delete service");
    } finally {
      setLoading(false);
    }
  }
  const fetchServices = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/service/getMy", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
      });
      const data = await response.json();
      console.log("Fetched services data:", data);
      if (!response.ok) throw new Error(data.message || "Failed to fetch services");
      setServices(data.data || data || []);
    } catch (err) {
      setError("Failed to load services: " + err.message);
      console.error("Fetch Services Error:", err);
    }
  };
  useEffect(() => {
    fetchServices();
  }, [authUser._id, onEdit]);

  return (
    <>
      {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
      {services.length === 0 && !error ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-orange-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-center text-gray-500 text-lg">No services found. Add a service to get started!</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Add Your First Service
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Service Image */}
              <div className="h-48 overflow-hidden relative">
                {service.images && service.images.length > 0 ? (
                  <img
                    src={service.images[0]}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  {service.category}
                </div>
              </div>

              {/* Service Details */}
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{service.name}</h3>

                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-600 text-sm">{service.availability}</p>
                </div>

                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-gray-600 text-sm">{service.location.join(", ")}</p>
                </div>

                <div className="flex items-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-800 font-bold">${service.price || "N/A"}</p>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => onEdit(service)}
                    className="bg-indigo-500 text-white px-3 py-1 rounded-lg hover:bg-indigo-600 transition flex items-center"
                  >
                    <MdOutlineEdit size={18} className="mr-1"/>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteService(service._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition flex items-center"
                    disabled={loading}
                  >
                    <MdDelete size={18} className="mr-1"/>
                    {loading ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ServicesTable;