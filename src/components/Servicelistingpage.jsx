import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BookingForm from "./BookingForm";

// const ServiceListingPage = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [selectedService, setSelectedService] = useState(null);
//   const [services, setServices] = useState([]);
//   const [filteredServices, setFilteredServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("all");

//   // Fetch services from the API
//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const response = await fetch("https://bookmyservice.onrender.com/api/service/getAll", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`Failed to fetch services: ${response.status}`);
//         }

//         const data = await response.json();
//         setServices(data.data || []);
//         setFilteredServices(data.data || []);
//       } catch (error) {
//         console.error("Error fetching services:", error);
//         setError(error.message || "Failed to load services. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchServices();
//   }, []);

//   // Apply filters
//   useEffect(() => {
//     let result = services;

//     if (searchTerm) {
//       result = result.filter(service =>
//         service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         service.description.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     if (categoryFilter !== "all") {
//       result = result.filter(service =>
//         service.category === categoryFilter
//       );
//     }

//     setFilteredServices(result);
//   }, [searchTerm, categoryFilter, services]);

//   const handleBookNow = (service) => {
//     setSelectedService(service);
//     setShowForm(true);
//   };

//   // Extract unique categories for filter
//   const categories = ["all", ...new Set(services.map(service => service.category))];

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-100 p-4 md:p-6 flex flex-col items-center justify-center">
//         <div className="w-full max-w-6xl">
//           <div className="bg-[#e5c8a5] p-4 rounded-lg shadow-md mb-6">
//             <h2 className="text-xl font-semibold">Filters</h2>
//             <div className="animate-pulse h-8 bg-gray-200 rounded mt-2"></div>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[...Array(6)].map((_, index) => (
//               <motion.div
//                 key={index}
//                 className="bg-white p-6 rounded-lg shadow-lg"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3, delay: index * 0.1 }}
//               >
//                 <div className="animate-pulse">
//                   <div className="w-20 h-20 rounded-full bg-gray-200 mx-auto mb-4"></div>
//                   <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
//                   <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
//                   <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
//                   <div className="h-10 bg-gray-200 rounded w-full"></div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-100 p-4 md:p-6 flex flex-col items-center justify-center">
//         <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
//           <div className="text-red-500 text-4xl mb-4">⚠️</div>
//           <h2 className="text-xl font-semibold mb-2">Error Loading Services</h2>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-4 md:p-6">
//       {/* Filter Section */}
//       <div className="bg-[#e5c8a5] p-4 rounded-lg shadow-md mb-6">
//         <h2 className="text-xl font-semibold mb-4">Filters</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
//               Search
//             </label>
//             <input
//               type="text"
//               id="search"
//               placeholder="Search services..."
//               className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <div>
//             <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
//               Category
//             </label>
//             <select
//               id="category"
//               className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//               value={categoryFilter}
//               onChange={(e) => setCategoryFilter(e.target.value)}
//             >
//               {categories.map(category => (
//                 <option key={category} value={category}>
//                   {category.charAt(0).toUpperCase() + category.slice(1)}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Service Listings */}
//       {filteredServices.length === 0 ? (
//         <div className="bg-white p-8 rounded-lg shadow-lg text-center">
//           <p className="text-gray-600">No services found matching your criteria.</p>
//           <button
//             onClick={() => {
//               setSearchTerm("");
//               setCategoryFilter("all");
//             }}
//             className="mt-4 text-orange-500 hover:text-orange-600 underline"
//           >
//             Clear filters
//           </button>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredServices.map((service, index) => (
//             <motion.div
//               key={service._id}
//               className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow"
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               whileHover={{ y: -5 }}
//             >
//               <div className="relative w-20 h-20 mb-4">
//                 <img
//                   src={service.image || "/Service.jpg"}
//                   alt={service.name}
//                   className="w-full h-full rounded-full object-cover"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = "/Service.jpg";
//                   }}
//                 />
//                 {service.isPopular && (
//                   <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
//                     Popular
//                   </span>
//                 )}
//               </div>
//               <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
//               <p className="text-gray-600 mb-2 line-clamp-2">{service.description}</p>
//               <div className="flex justify-between w-full text-sm text-gray-500 mb-4">
//                 <span>Available: {service.availability}</span>
//                 {service.price && <span>${service.price}</span>}
//               </div>
//               <button
//                 className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors w-full"
//                 onClick={() => handleBookNow(service)}
//                 aria-label={`Book ${service.name}`}
//               >
//                 Book Now
//               </button>
//             </motion.div>
//           ))}
//         </div>
//       )}

//       {/* Booking Form */}
//       {showForm && (
//         <BookingForm
//           selectedService={selectedService}
//           onClose={() => setShowForm(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default ServiceListingPage;

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import BookingForm from "./BookingForm";

const ServiceListingPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Fetch services from the API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("https://bookmyservice.onrender.com/api/service/getAll", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch services: ${response.status}`);
        }

        const data = await response.json();
        setServices(data.data || []);
        setFilteredServices(data.data || []);
      } catch (error) {
        console.error("Error fetching services:", error);
        setError(error.message || "Failed to load services. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Apply filters
  useEffect(() => {
    let result = services;

    if (searchTerm) {
      result = result.filter(
        (service) =>
          service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== "all") {
      result = result.filter((service) => service.category === categoryFilter);
    }

    setFilteredServices(result);
  }, [searchTerm, categoryFilter, services]);

  const handleBookNow = (service) => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirect to login page if not logged in
      alert("Please login to book a service");
      window.location.href = "/login";
      return;
    }

    // Check if user has already booked this service
    const checkIfAlreadyBooked = async () => {
      try {
        const response = await fetch(`https://bookmyservice.onrender.com/api/booking/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user bookings");
        }

        const data = await response.json();
        const userBookings = data.data || [];

        // Check if this service is already booked by the user
        const alreadyBooked = userBookings.some(
          booking => booking.service && booking.service._id === service._id &&
          (booking.status === "PENDING" || booking.status === "CONFIRMED")
        );

        if (alreadyBooked) {
          alert("You have already booked this service");
          return;
        }

        // If not already booked, show the booking form
        setSelectedService(service);
        setShowForm(true);
      } catch (error) {
        console.error("Error checking bookings:", error);
        // If there's an error, still allow booking as a fallback
        setSelectedService(service);
        setShowForm(true);
      }
    };

    checkIfAlreadyBooked();
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedService(null);
  };

  // Extract unique categories for filter
  const categories = ["all", ...new Set(services.map((service) => service.category))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 md:p-6 flex flex-col items-center justify-center">
        <div className="w-full max-w-6xl">
          <div className="bg-[#e5c8a5] p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold">Filters</h2>
            <div className="animate-pulse h-8 bg-gray-200 rounded mt-2"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="animate-pulse">
                  <div className="w-20 h-20 rounded-full bg-gray-200 mx-auto mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded w-full"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 md:p-6 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold mb-2">Error Loading Services</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      {/* Filter Section */}
      <div className="bg-[#e5c8a5] p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search services..."
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Service Listings */}
      {filteredServices.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <p className="text-gray-600">No services found matching your criteria.</p>
          <button
            onClick={() => {
              setSearchTerm("");
              setCategoryFilter("all");
            }}
            className="mt-4 text-orange-500 hover:text-orange-600 underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service._id}
              className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow h-[450px]"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="w-full h-56 bg-gray-300 mb-4 overflow-hidden relative">
                <img
                  src={service.images?.[0]}
                  alt={service.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/Service.jpg";
                  }}
                />
                {service.isPopular && (
                  <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-md">
                    Popular
                  </span>
                )}
              </div>
              <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
              {/* <p className="text-gray-600 mb-2 line-clamp-2">{service.description}</p> */}
              <div className="flex justify-between w-full text-sm text-gray-500 mb-4">
                <span>Available: {service.availability}</span>
                {service.price && <span>${service.price}</span>}
              </div>
              <button
                className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors w-full mt-auto"
                onClick={() => handleBookNow(service)}
                aria-label={`Book ${service.name}`}
              >
                Book Now
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Booking Form */}
      {showForm && selectedService && (
        <BookingForm selectedService={selectedService} onClose={handleCloseForm} />
      )}
    </div>
  );
};

export default ServiceListingPage;