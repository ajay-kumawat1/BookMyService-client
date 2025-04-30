import { useState, useEffect } from "react";

// const BookedServicesTable = ({ authUser, setAuthUser }) => {
//   const [bookedServices, setBookedServices] = useState([]);
//   const [allServices, setAllServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchBookedServices = async () => {
//       try {
//         setError("");
//         const serviceIds = authUser?.bookedServiceIds || [];
//         console.log("Fetching booked services for IDs:", serviceIds); // Debug
//         if (!Array.isArray(serviceIds) || serviceIds.length === 0) {
//           setBookedServices([]);
//           return;
//         }

//         const bookedPromises = serviceIds.map((id) =>
//           fetch(`http://localhost:5000/api/service/get/${id}`, {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
//             },
//             credentials: "include",
//           })
//             .then((res) => {
//               if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//               return res.json();
//             })
//             .catch((err) => {
//               console.error(`Fetch error for ID ${id}:`, err);
//               return { success: "error", message: err.message };
//             })
//         );

//         const bookedResponses = await Promise.all(bookedPromises);
//         console.log("Raw Booked Responses:", bookedResponses); // Debug
//         const services = bookedResponses
//           .filter((res) => res.success === true && res.data) // Changed to res.success
//           .map((res) => res.data);

//         console.log("Filtered Booked Services:", services); // Debug
//         setBookedServices(services);
//       } catch (err) {
//         setError("Failed to load booked services: " + err.message);
//         console.error("Fetch Booked Services Error:", err);
//       }
//     };

//     const fetchAllServices = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/service/getAll", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         const data = await response.json();
//         console.log("All Services Response:", data); // Debug
//         if (!response.ok) throw new Error(data.message || "Failed to fetch services");
//         setAllServices(Array.isArray(data.data) ? data.data : []);
//       } catch (err) {
//         setError("Failed to load all services: " + err.message);
//         console.error("Fetch All Services Error:", err);
//       }
//     };

//     const fetchData = async () => {
//       setLoading(true);
//       await Promise.all([fetchBookedServices(), fetchAllServices()]);
//       setLoading(false);
//     };

//     fetchData();
//   }, [authUser]);

//   const handleBookService = async (serviceId) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/service/bookService/${serviceId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
//         },
//         credentials: "include",
//       });
//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || "Failed to book service");

//       const service = allServices.find((s) => s._id === serviceId);
//       if (!service) throw new Error("Service not found");

//       setAuthUser((prev) => ({
//         ...prev,
//         bookedServiceIds: [...(prev.bookedServiceIds || []), serviceId],
//       }));
//       setBookedServices((prev) => [...prev, service]);
//       alert("Service booked successfully!");
//     } catch (err) {
//       setError("Failed to book service: " + err.message);
//       console.error("Book Service Error:", err);
//     }
//   };

//   const handleCancelService = async (serviceId) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/service/cancelService/${serviceId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
//         },
//         credentials: "include",
//       });
//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || "Failed to cancel service");

//       setAuthUser((prev) => ({
//         ...prev,
//         bookedServiceIds: (prev.bookedServiceIds || []).filter((id) => id !== serviceId),
//       }));
//       setBookedServices((prev) => prev.filter((s) => s._id !== serviceId));
//       alert("Service cancelled successfully!");
//     } catch (err) {
//       setError("Failed to cancel service: " + err.message);
//       console.error("Cancel Service Error:", err);
//     }
//   };

//   if (loading) {
//     return <div className="text-center text-gray-500 text-sm sm:text-base">Loading...</div>;
//   }

//   return (
//     <div className="space-y-6 sm:space-y-8">
//       {error && (
//         <div className="text-center text-red-500 text-sm sm:text-base">{error}</div>
//       )}

//       {/* Booked Services */}
//       <div>
//         <h3 className="text-base sm:text-lg md:text-xl font-semibold text-orange-500 mb-3 sm:mb-4">
//           Your Booked Services
//         </h3>
//         {bookedServices.length === 0 ? (
//           <p className="text-center text-gray-500 text-sm sm:text-base">
//             No services booked yet.
//           </p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full text-left border-collapse text-xs sm:text-sm md:text-base">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="py-2 sm:py-3 px-2 sm:px-4 md:px-6 font-semibold text-gray-700">
//                     Name
//                   </th>
//                   <th className="py-2 sm:py-3 px-2 sm:px-4 md:px-6 font-semibold text-gray-700">
//                     Category
//                   </th>
//                   <th className="py-2 sm:py-3 px-2 sm:px-4 md:px-6 font-semibold text-gray-700">
//                     Price
//                   </th>
//                   <th className="py-2 sm:py-3 px-2 sm:px-4 md:px-6 font-semibold text-gray-700">
//                     Status
//                   </th>
//                   <th className="py-2 sm:py-3 px-2 sm:px-4 md:px-6 font-semibold text-gray-700">
//                     Action
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {bookedServices.map((service) => (
//                   <tr
//                     key={service._id}
//                     className="border-b border-gray-200 hover:bg-gray-50"
//                   >
//                     <td className="py-2 sm:py-3 px-2 sm:px-4 md:px-6">
//                       {service.name || "N/A"}
//                     </td>
//                     <td className="py-2 sm:py-3 px-2 sm:px-4 md:px-6">
//                       {service.category || "N/A"}
//                     </td>
//                     <td className="py-2 sm:py-3 px-2 sm:px-4 md:px-6">
//                       {service.price ? `$${service.price}` : "N/A"}
//                     </td>
//                     <td className="py-2 sm:py-3 px-2 sm:px-4 md:px-6">
//                       {service.status || "Booked"}
//                     </td>
//                     <td className="py-2 sm:py-3 px-2 sm:px-4 md:px-6">
//                       <button
//                         onClick={() => handleCancelService(service._id)}
//                         className="text-red-500 hover:text-red-700 text-xs sm:text-sm"
//                         disabled={service.status === "completed"}
//                       >
//                         Cancel
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* Available Services */}
//       <div>
//         <h3 className="text-base sm:text-lg md:text-xl font-semibold text-orange-500 mb-3 sm:mb-4">
//           Available Services
//         </h3>
//         {allServices.length === 0 ? (
//           <p className="text-center text-gray-500 text-sm sm:text-base">
//             No services available.
//           </p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full text-left border-collapse text-xs sm:text-sm md:text-base">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="py-2 sm:py-3 px-2 sm:px-4 md:px-6 font-semibold text-gray-700">
//                     Name
//                   </th>
//                   <th className="py-2 sm:py-3 px-2 sm:px-4 md:px-6 font-semibold text-gray-700">
//                     Category
//                   </th>
//                   <th className="py-2 sm:py-3 px-2 sm:px-4 md:px-6 font-semibold text-gray-700">
//                     Price
//                   </th>
//                   <th className="py-2 sm:py-3 px-2 sm:px-4 md:px-6 font-semibold text-gray-700">
//                     Action
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {allServices.map((service) => (
//                   <tr
//                     key={service._id}
//                     className="border-b border-gray-200 hover:bg-gray-50"
//                   >
//                     <td className="py-2 sm:py-3 px-2 sm:px-4 md:px-6">
//                       {service.name || "N/A"}
//                     </td>
//                     <td className="py-2 sm:py-3 px-2 sm:px-4 md:px-6">
//                       {service.category || "N/A"}
//                     </td>
//                     <td className="py-2 sm:py-3 px-2 sm:px-4 md:px-6">
//                       {service.price ? `$${service.price}` : "N/A"}
//                     </td>
//                     <td className="py-2 sm:py-3 px-2 sm:px-4 md:px-6">
//                       <button
//                         onClick={() => handleBookService(service._id)}
//                         disabled={bookedServices.some((s) => s._id === service._id)}
//                         className={`px-3 sm:px-4 py-1 sm:py-2 rounded-lg text-white text-xs sm:text-sm ${
//                           bookedServices.some((s) => s._id === service._id)
//                             ? "bg-gray-400 cursor-not-allowed"
//                             : "bg-orange-500 hover:bg-orange-600"
//                         }`}
//                       >
//                         {bookedServices.some((s) => s._id === service._id)
//                           ? "Booked"
//                           : "Book Now"}
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookedServicesTable;

// BookedServicesTable.jsx
const BookedServicesTable = ({ authUser }) => {
  const [bookedServices, setBookedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookedServices = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!authUser?.bookedServiceIds || authUser.bookedServiceIds.length === 0) {
          setBookedServices([]);
          setLoading(false);
          return;
        }

        const uniqueServiceIds = [...new Set(authUser.bookedServiceIds)];

        const bookingPromises = uniqueServiceIds.map(async (serviceId) => {
          const response = await fetch(`http://localhost:5000/api/bookings/service/${serviceId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          const data = await response.json();
          if (!data.success) throw new Error(data.error || "Failed to fetch booking");

          const booking = data.data;
          return {
            ...booking.service,
            status: booking.status,
            provider: booking.provider, // Include provider details
            bookingCount: authUser.bookedServiceIds.filter((id) => id === serviceId).length,
          };
        });

        const services = await Promise.all(bookingPromises);
        setBookedServices(services);
      } catch (err) {
        setError(err.message || "Failed to load booked services.");
      } finally {
        setLoading(false);
      }
    };
    fetchBookedServices();
  }, [authUser]);

  if (loading) return <div className="text-center text-gray-600">Loading booked services...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <table className="w-full text-left border-collapse text-sm sm:text-base">
      <thead>
        <tr className="bg-gray-100">
          <th className="py-2 sm:py-4 px-3 sm:px-6 font-semibold text-gray-700">Service Name</th>
          <th className="py-2 sm:py-4 px-3 sm:px-6 font-semibold text-gray-700">Price</th>
          <th className="py-2 sm:py-4 px-3 sm:px-6 font-semibold text-gray-700">Availability</th>
          <th className="py-2 sm:py-4 px-3 sm:px-6 font-semibold text-gray-700">Status</th>
          <th className="py-2 sm:py-4 px-3 sm:px-6 font-semibold text-gray-700">Provider Contact</th>
          <th className="py-2 sm:py-4 px-3 sm:px-6 font-semibold text-gray-700">Times Booked</th>
        </tr>
      </thead>
      <tbody>
        {bookedServices.length > 0 ? (
          bookedServices.map((service, index) => (
            <tr key={service._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
              <td className="py-2 sm:py-4 px-3 sm:px-6 text-gray-800">{service.name}</td>
              <td className="py-2 sm:py-4 px-3 sm:px-6 text-gray-800">{service.price ? `$${service.price}` : "N/A"}</td>
              <td className="py-2 sm:py-4 px-3 sm:px-6 text-gray-800">{service.availability}</td>
              <td className="py-2 sm:py-4 px-3 sm:px-6 text-gray-800">{service.status}</td>
              <td className="py-2 sm:py-4 px-3 sm:px-6 text-gray-800">
                {service.status === "ACCEPTED" && service.provider ? (
                  <div>
                    <p>{service.provider.ownerFirstName} {service.provider.ownerLastName}</p>
                    <p>{service.provider.email}</p>
                    <p>{service.provider.phoneNumber}</p>
                  </div>
                ) : (
                  "Pending"
                )}
              </td>
              <td className="py-2 sm:py-4 px-3 sm:px-6 text-gray-800">{service.bookingCount}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="py-4 text-center text-gray-600">
              No bookings found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};