import { useState, useEffect } from "react";

const BookedServicesTable = ({ authUser, setAuthUser }) => {
  const [bookedServices, setBookedServices] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookedServices = async () => {
      try {
        const bookedPromises = (authUser.bookedServiceIds || []).map((id) =>
          fetch(`https://bookmyservice.onrender.com/api/service/get/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            credentials: "include",
          }).then((res) => res.json())
        );
        const bookedResponses = await Promise.all(bookedPromises);
        const services = bookedResponses.map((res) => {
          if (!res.ok) throw new Error(res.message || "Failed to fetch service");
          return res.data;
        });
        setBookedServices(services);
      } catch (err) {
        setError("Failed to load booked services: " + err.message);
        console.error("Fetch Booked Services Error:", err);
      }
    };

    const fetchAllServices = async () => {
      try {
        const response = await fetch("https://bookmyservice.onrender.com/api/service/getAll", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          credentials: "include",
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to fetch services");
        setAllServices(data.data || []);
      } catch (err) {
        setError("Failed to load all services: " + err.message);
        console.error("Fetch All Services Error:", err);
      }
    };

    fetchBookedServices();
    fetchAllServices();
  }, [authUser.bookedServiceIds]);

  const handleBookService = async (serviceId) => {
    try {
      const response = await fetch(`https://bookmyservice.onrender.com/api/service/bookService/${serviceId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to book service");

      // Update authUser with new bookedServiceIds
      const updatedUser = { ...authUser, bookedServiceIds: [...(authUser.bookedServiceIds || []), serviceId] };
      setAuthUser(updatedUser);
      setBookedServices([...bookedServices, allServices.find((s) => s._id === serviceId)]);
      alert("Service booked successfully!");
    } catch (err) {
      setError("Failed to book service: " + err.message);
      console.error("Book Service Error:", err);
    }
  };

  return (
    <>
      {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Booked Services</h3>
      {bookedServices.length === 0 ? (
        <p className="text-center text-gray-500">No services booked yet.</p>
      ) : (
        <table className="w-full text-left border-collapse mb-8">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-6 text-sm font-semibold text-gray-700">Name</th>
              <th className="py-3 px-6 text-sm font-semibold text-gray-700">Category</th>
              <th className="py-3 px-6 text-sm font-semibold text-gray-700">Price</th>
            </tr>
          </thead>
          <tbody>
            {bookedServices.map((service) => (
              <tr key={service._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 text-gray-800">{service.name}</td>
                <td className="py-4 px-6 text-gray-800">{service.category}</td>
                <td className="py-4 px-6 text-gray-800">{service.price || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h3 className="text-xl font-semibold text-gray-800 mb-4">Available Services</h3>
      {allServices.length === 0 ? (
        <p className="text-center text-gray-500">No services available.</p>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-6 text-sm font-semibold text-gray-700">Name</th>
              <th className="py-3 px-6 text-sm font-semibold text-gray-700">Category</th>
              <th className="py-3 px-6 text-sm font-semibold text-gray-700">Price</th>
              <th className="py-3 px-6 text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {allServices.map((service) => (
              <tr key={service._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 text-gray-800">{service.name}</td>
                <td className="py-4 px-6 text-gray-800">{service.category}</td>
                <td className="py-4 px-6 text-gray-800">{service.price || "N/A"}</td>
                <td className="py-4 px-6 text-gray-800">
                  <button
                    onClick={() => handleBookService(service._id)}
                    disabled={bookedServices.some((s) => s._id === service._id)}
                    className={`px-4 py-2 rounded-lg text-white ${
                      bookedServices.some((s) => s._id === service._id)
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-orange-500 hover:bg-orange-600"
                    }`}
                  >
                    {bookedServices.some((s) => s._id === service._id) ? "Booked" : "Book Now"}
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

export default BookedServicesTable;