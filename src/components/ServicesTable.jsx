import { useState, useEffect } from "react";

const ServicesTable = ({ authUser, onEdit }) => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("https://bookmyservice.onrender.com/api/service/getMy", {
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
    fetchServices();
  }, [authUser._id, onEdit]);

  return (
    <>
      {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
      {services.length === 0 && !error ? (
        <p className="text-center text-gray-500">No services found. Add a service to get started!</p>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-6 text-sm font-semibold text-gray-700">Name</th>
              <th className="py-3 px-6 text-sm font-semibold text-gray-700">Category</th>
              <th className="py-3 px-6 text-sm font-semibold text-gray-700">Price</th>
              <th className="py-3 px-6 text-sm font-semibold text-gray-700">Availability</th>
              <th className="py-3 px-6 text-sm font-semibold text-gray-700">Location</th>
              <th className="py-3 px-6 text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 text-gray-800">{service.name}</td>
                <td className="py-4 px-6 text-gray-800">{service.category}</td>
                <td className="py-4 px-6 text-gray-800">{service.price || "N/A"}</td>
                <td className="py-4 px-6 text-gray-800">{service.availability}</td>
                <td className="py-4 px-6 text-gray-800">{service.location.join(", ")}</td>
                <td className="py-4 px-6 text-gray-800">
                  <button
                    onClick={() => onEdit(service)}
                    className="text-indigo-500 hover:text-indigo-700 flex items-center"
                  >
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ServicesTable;