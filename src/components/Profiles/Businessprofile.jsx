// // export default BusinessProfile;
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Menu, X, User } from "lucide-react"; // Import User icon
// import { useAuth } from "../../context/AuthProvider";
// import ServicesTable from "../ServicesTable";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// // Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// // Dummy revenue data
// const dummyRevenueData = {
//   totalRevenue: 12345.67,
//   revenueByService: [
//     { serviceId: "1", serviceName: "Haircut", revenue: 4567.89 },
//     { serviceId: "2", serviceName: "Massage", revenue: 3456.78 },
//     { serviceId: "3", serviceName: "Nail Treatment", revenue: 2321.00 },
//     { serviceId: "4", serviceName: "Facial", revenue: 2000.00 },
//   ],
//   monthlyRevenue: [
//     { month: "2024-04", revenue: 800.00 },
//     { month: "2024-05", revenue: 1200.00 },
//     { month: "2024-06", revenue: 1000.00 },
//     { month: "2024-07", revenue: 1500.00 },
//     { month: "2024-08", revenue: 1800.00 },
//     { month: "2024-09", revenue: 2000.00 },
//     { month: "2024-10", revenue: 2200.00 },
//     { month: "2024-11", revenue: 1900.00 },
//     { month: "2024-12", revenue: 2500.00 },
//     { month: "2025-01", revenue: 2700.00 },
//     { month: "2025-02", revenue: 3000.00 },
//     { month: "2025-03", revenue: 2800.00 },
//   ],
// };

// const BusinessProfile = () => {
//   const [authUser, setAuthUser, logout, , loading] = useAuth();
//   const navigate = useNavigate();
//   const [activeSection, setActiveSection] = useState("my-profile");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For mobile sidebar toggle
//   const [serviceData, setServiceData] = useState({
//     name: "",
//     category: "",
//     description: "",
//     price: "",
//     availability: "",
//     location: [],
//     duration: "",
//     images: [],
//     booking_type: [],
//     payment_options: [],
//   });
//   const [profileData, setProfileData] = useState({
//     ownerFirstName: "",
//     ownerLastName: "",
//     email: "",
//     phoneNumber: "",
//     businessName: "",
//     businessCategory: "",
//     businessAddress: "",
//     city: "",
//     state: "",
//     zipCode: "",
//     country: "",
//   });
//   const [revenueData, setRevenueData] = useState({
//     totalRevenue: 0,
//     revenueByService: [],
//     monthlyRevenue: [],
//   });
//   const [error, setError] = useState("");
//   const [editingService, setEditingService] = useState(null);

//   // Fetch profile data when "Edit Profile" is selected
//   useEffect(() => {
//     if (activeSection === "edit-profile") {
//       const fetchProfile = async () => {
//         try {
//           const response = await fetch(
//             `https://bookmyservice.onrender.com/api/business-owner/${authUser._id}`,
//             {
//               method: "GET",
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${localStorage.getItem("token")}`,
//               },
//               credentials: "include",
//             }
//           );
//           const data = await response.json();
//           if (!response.ok)
//             throw new Error(data.message || "Failed to fetch profile");

//           setProfileData({
//             ownerFirstName: data.data.ownerFirstName || "",
//             ownerLastName: data.data.ownerLastName || "",
//             email: data.data.email || "",
//             phoneNumber: data.data.phoneNumber || "",
//             businessName: data.data.businessName || "",
//             businessCategory: data.data.businessCategory || "",
//             businessAddress: data.data.businessAddress || "",
//             city: data.data.city || "",
//             state: data.data.state || "",
//             zipCode: data.data.zipCode || "",
//             country: data.data.country || "",
//           });
//         } catch (err) {
//           setError("Failed to load profile: " + err.message);
//           console.error("Fetch Profile Error:", err);
//         }
//       };
//       fetchProfile();
//     }
//   }, [activeSection, authUser._id]);

//   // Set dummy revenue data when "Revenue Statistics" is selected
//   useEffect(() => {
//     if (activeSection === "revenue-statistics") {
//       setRevenueData(dummyRevenueData);
//     }
//   }, [activeSection]);

//   // Redirect to login if not authenticated after loading
//   useEffect(() => {
//     if (!loading && !authUser) {
//       navigate("/login");
//     }
//   }, [loading, authUser, navigate]);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   const handleServiceChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (type === "checkbox") {
//       setServiceData((prev) => ({
//         ...prev,
//         [name]: checked
//           ? [...prev[name], value]
//           : prev[name].filter((item) => item !== value),
//       }));
//     } else {
//       setServiceData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleServiceSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("https://bookmyservice.onrender.com/api/service/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         credentials: "include",
//         body: JSON.stringify(serviceData),
//       });
//       const data = await response.json();
//       if (!response.ok)
//         throw new Error(data.message || "Failed to create service");

//       alert("Service created successfully!");
//       setServiceData({
//         name: "",
//         category: "",
//         description: "",
//         price: "",
//         availability: "",
//         location: [],
//         duration: "",
//         images: [],
//         booking_type: [],
//         payment_options: [],
//       });
//     } catch (err) {
//       console.error("Add Service Error:", err);
//       alert("Failed to add service: " + err.message);
//     }
//   };

//   const handleEditService = (service) => {
//     setEditingService(service);
//     setServiceData(service);
//   };

//   const handleUpdateService = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(
//         `https://bookmyservice.onrender.com/api/service/update/${editingService._id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//           credentials: "include",
//           body: JSON.stringify(serviceData),
//         }
//       );
//       const data = await response.json();
//       if (!response.ok)
//         throw new Error(data.message || "Failed to update service");

//       alert("Service updated successfully!");
//       setEditingService(null);
//       setServiceData({
//         name: "",
//         category: "",
//         description: "",
//         price: "",
//         availability: "",
//         location: [],
//         duration: "",
//         images: [],
//         booking_type: [],
//         payment_options: [],
//       });
//     } catch (err) {
//       console.error("Update Service Error:", err);
//       alert("Failed to update service: " + err.message);
//     }
//   };

//   const handleProfileChange = (e) => {
//     const { name, value } = e.target;
//     setProfileData((prev) => ({ ...prev, [name]: value }));
//     setError("");
//   };

//   const handleProfileSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       const response = await fetch(
//         `https://bookmyservice.onrender.com/api/business-owner/${authUser._id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//           credentials: "include",
//           body: JSON.stringify(profileData),
//         }
//       );
//       const data = await response.json();
//       if (!response.ok)
//         throw new Error(data.message || "Failed to update profile");

//       setAuthUser(data.data);
//       alert("Profile updated successfully!");
//       setActiveSection("my-profile");
//     } catch (err) {
//       setError("Failed to update profile: " + err.message);
//       console.error("Update Profile Error:", err);
//     }
//   };

//   // Chart data for monthly revenue
//   const chartData = {
//     labels: revenueData.monthlyRevenue.map((item) => item.month),
//     datasets: [
//       {
//         label: "Monthly Revenue",
//         data: revenueData.monthlyRevenue.map((item) => item.revenue),
//         fill: false,
//         backgroundColor: "rgb(255, 99, 132)",
//         borderColor: "rgba(255, 99, 132, 0.2)",
//         tension: 0.1,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: "top",
//         labels: {
//           font: {
//             size: 12, // Smaller font for sm screens
//           },
//         },
//       },
//       title: {
//         display: true,
//         text: "Monthly Revenue Trend",
//         font: {
//           size: 16, // Scales with screen size below
//         },
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         title: {
//           display: true,
//           text: "Revenue ($)",
//           font: {
//             size: 12,
//           },
//         },
//         ticks: {
//           font: {
//             size: 10,
//           },
//         },
//       },
//       x: {
//         title: {
//           display: true,
//           text: "Month",
//           font: {
//             size: 12,
//           },
//         },
//         ticks: {
//           font: {
//             size: 10,
//           },
//         },
//       },
//     },
//   };

//   const menuItems = [
//     {
//       id: "my-profile",
//       label: "My Profile",
//       color: "bg-blue-500 hover:bg-blue-600",
//     },
//     {
//       id: "add-service",
//       label: "Add Service",
//       color: "bg-green-500 hover:bg-green-600",
//     },
//     {
//       id: "my-services",
//       label: "My Services",
//       color: "bg-purple-500 hover:bg-purple-600",
//     },
//     {
//       id: "revenue-statistics",
//       label: "Revenue Statistics",
//       color: "bg-yellow-500 hover:bg-yellow-600",
//     },
//     {
//       id: "edit-profile",
//       label: "Edit Profile",
//       color: "bg-teal-500 hover:bg-teal-600",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
//       {/* Mobile Menu Button */}
//       <div className="md:hidden flex justify-between items-center p-4 bg-white shadow-md">
//         <button
//           onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//           className="text-orange-500 focus:outline-none"
//         >
//           {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//         <h1 className="text-xl font-bold text-orange-500">Business Dashboard</h1>
//         <button
//           onClick={() => navigate("/")}
//           className="text-orange-500 focus:outline-none"
//         >

//         </button>
//       </div>

//       {/* Main Content - Responsive */}
//       <div
//         className={`w-full md:w-3/4 lg:w-3/4 xl:w-9/12 p-4 sm:p-6 mt-14 md:mt-0 overflow-y-auto h-screen transition-all duration-300 ${
//           isSidebarOpen ? "opacity-50 md:opacity-100" : ""
//         }`}
//       >
//         <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-500 mb-4 sm:mb-6">
//           Business Profile
//         </h1>

//         {activeSection === "my-profile" && (
//           <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
//             <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-orange-500 mb-4 sm:mb-6 text-center">
//               My Profile
//             </h2>
//             <div className="overflow-x-auto">
//               <table className="w-full text-left border-collapse text-sm sm:text-base">
//                 <tbody>
//                   <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
//                     <th className="py-2 sm:py-4 px-3 sm:px-6 font-semibold text-gray-700 bg-gray-100 w-1/3">
//                       First Name
//                     </th>
//                     <td className="py-2 sm:py-4 px-3 sm:px-6 text-gray-800">
//                       {authUser.ownerFirstName}
//                     </td>
//                   </tr>
//                   <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
//                     <th className="py-2 sm:py-4 px-3 sm:px-6 font-semibold text-gray-700 bg-gray-100 w-1/3">
//                       Last Name
//                     </th>
//                     <td className="py-2 sm:py-4 px-3 sm:px-6 text-gray-800">
//                       {authUser.ownerLastName}
//                     </td>
//                   </tr>
//                   <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
//                     <th className="py-2 sm:py-4 px-3 sm:px-6 font-semibold text-gray-700 bg-gray-100 w-1/3">
//                       Email
//                     </th>
//                     <td className="py-2 sm:py-4 px-3 sm:px-6 text-gray-800">
//                       {authUser.email}
//                     </td>
//                   </tr>
//                   <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
//                     <th className="py-2 sm:py-4 px-3 sm:px-6 font-semibold text-gray-700 bg-gray-100 w-1/3">
//                       Phone Number
//                     </th>
//                     <td className="py-2 sm:py-4 px-3 sm:px-6 text-gray-800">
//                       {authUser.phoneNumber}
//                     </td>
//                   </tr>
//                   <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
//                     <th className="py-2 sm:py-4 px-3 sm:px-6 font-semibold text-gray-700 bg-gray-100 w-1/3">
//                       Business Name
//                     </th>
//                     <td className="py-2 sm:py-4 px-3 sm:px-6 text-gray-800">
//                       {authUser.businessName}
//                     </td>
//                   </tr>
//                   <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
//                     <th className="py-2 sm:py-4 px-3 sm:px-6 font-semibold text-gray-700 bg-gray-100 w-1/3">
//                       Category
//                     </th>
//                     <td className="py-2 sm:py-4 px-3 sm:px-6 text-gray-800">
//                       {authUser.businessCategory}
//                     </td>
//                   </tr>
//                   <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
//                     <th className="py-2 sm:py-4 px-3 sm:px-6 font-semibold text-gray-700 bg-gray-100 w-1/3">
//                       Address
//                     </th>
//                     <td className="py-2 sm:py-4 px-3 sm:px-6 text-gray-800">
//                       {authUser.businessAddress}, {authUser.city},{" "}
//                       {authUser.state}, {authUser.zipCode}, {authUser.country}
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         {activeSection === "add-service" && (
//           <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
//             <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-center">
//               Add New Service
//             </h2>
//             <form onSubmit={handleServiceSubmit} className="space-y-4">
//               <div>
//                 <label className="block font-medium text-sm sm:text-base">
//                   Service Name
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={serviceData.name}
//                   onChange={handleServiceChange}
//                   required
//                   className="w-full p-2 border rounded-lg text-sm sm:text-base"
//                 />
//               </div>
//               <div>
//                 <label className="block font-medium text-sm sm:text-base">
//                   Category
//                 </label>
//                 <input
//                   type="text"
//                   name="category"
//                   value={serviceData.category}
//                   onChange={handleServiceChange}
//                   required
//                   className="w-full p-2 border rounded-lg text-sm sm:text-base"
//                 />
//               </div>
//               <div>
//                 <label className="block font-medium text-sm sm:text-base">
//                   Description
//                 </label>
//                 <textarea
//                   name="description"
//                   value={serviceData.description}
//                   onChange={handleServiceChange}
//                   required
//                   className="w-full p-2 border rounded-lg text-sm sm:text-base"
//                 />
//               </div>
//               <div>
//                 <label className="block font-medium text-sm sm:text-base">
//                   Price (Optional)
//                 </label>
//                 <input
//                   type="number"
//                   name="price"
//                   value={serviceData.price}
//                   onChange={handleServiceChange}
//                   className="w-full p-2 border rounded-lg text-sm sm:text-base"
//                 />
//               </div>
//               <div>
//                 <label className="block font-medium text-sm sm:text-base">
//                   Availability
//                 </label>
//                 <input
//                   type="text"
//                   name="availability"
//                   value={serviceData.availability}
//                   onChange={handleServiceChange}
//                   required
//                   placeholder="e.g., Monday - Friday, 9 AM - 5 PM"
//                   className="w-full p-2 border rounded-lg text-sm sm:text-base"
//                 />
//               </div>
//               <div>
//                 <label className="block font-medium text-sm sm:text-base">
//                   Location
//                 </label>
//                 <div className="space-y-2">
//                   {["on-site", "online", "customer_location"].map((loc) => (
//                     <label
//                       key={loc}
//                       className="flex items-center space-x-2 text-sm sm:text-base"
//                     >
//                       <input
//                         type="checkbox"
//                         name="location"
//                         value={loc}
//                         checked={serviceData.location.includes(loc)}
//                         onChange={handleServiceChange}
//                       />
//                       <span>{loc}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//               <div>
//                 <label className="block font-medium text-sm sm:text-base">
//                   Duration (Minutes, Optional)
//                 </label>
//                 <input
//                   type="number"
//                   name="duration"
//                   value={serviceData.duration}
//                   onChange={handleServiceChange}
//                   className="w-full p-2 border rounded-lg text-sm sm:text-base"
//                 />
//               </div>
//               <div>
//                 <label className="block font-medium text-sm sm:text-base">
//                   Booking Type
//                 </label>
//                 <div className="space-y-2">
//                   {["instant", "appointment"].map((type) => (
//                     <label
//                       key={type}
//                       className="flex items-center space-x-2 text-sm sm:text-base"
//                     >
//                       <input
//                         type="checkbox"
//                         name="booking_type"
//                         value={type}
//                         checked={serviceData.booking_type.includes(type)}
//                         onChange={handleServiceChange}
//                       />
//                       <span>{type}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//               <div>
//                 <label className="block font-medium text-sm sm:text-base">
//                   Payment Options
//                 </label>
//                 <div className="space-y-2">
//                   {["cash", "online", "card"].map((option) => (
//                     <label
//                       key={option}
//                       className="flex items-center space-x-2 text-sm sm:text-base"
//                     >
//                       <input
//                         type="checkbox"
//                         name="payment_options"
//                         value={option}
//                         checked={serviceData.payment_options.includes(option)}
//                         onChange={handleServiceChange}
//                       />
//                       <span>{option}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//               <button
//                 type="submit"
//                 className="w-full p-2 sm:p-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 text-sm sm:text-base"
//               >
//                 Add Service
//               </button>
//             </form>
//           </div>
//         )}

//         {activeSection === "my-services" && (
//           <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
//             <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-orange-500 mb-4 sm:mb-6 text-center">
//               My Services
//             </h2>
//             <div className="overflow-x-auto">
//               <ServicesTable authUser={authUser} onEdit={handleEditService} />
//             </div>
//             {editingService && (
//               <div className="mt-4 sm:mt-6 bg-gray-50 p-4 sm:p-6 rounded-lg shadow-inner">
//                 <h3 className="text-base sm:text-lg md:text-xl font-semibold text-orange-500 mb-4">
//                   Edit Service: {editingService.name}
//                 </h3>
//                 <form onSubmit={handleUpdateService} className="space-y-4">
//                   <div>
//                     <label className="block font-medium text-sm sm:text-base">
//                       Service Name
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={serviceData.name}
//                       onChange={handleServiceChange}
//                       required
//                       className="w-full p-2 border rounded-lg text-sm sm:text-base"
//                     />
//                   </div>
//                   <div>
//                     <label className="block font-medium text-sm sm:text-base">
//                       Category
//                     </label>
//                     <input
//                       type="text"
//                       name="category"
//                       value={serviceData.category}
//                       onChange={handleServiceChange}
//                       required
//                       className="w-full p-2 border rounded-lg text-sm sm:text-base"
//                     />
//                   </div>
//                   <div>
//                     <label className="block font-medium text-sm sm:text-base">
//                       Description
//                     </label>
//                     <textarea
//                       name="description"
//                       value={serviceData.description}
//                       onChange={handleServiceChange}
//                       required
//                       className="w-full p-2 border rounded-lg text-sm sm:text-base"
//                     />
//                   </div>
//                   <div>
//                     <label className="block font-medium text-sm sm:text-base">
//                       Price (Optional)
//                     </label>
//                     <input
//                       type="number"
//                       name="price"
//                       value={serviceData.price}
//                       onChange={handleServiceChange}
//                       className="w-full p-2 border rounded-lg text-sm sm:text-base"
//                     />
//                   </div>
//                   <div>
//                     <label className="block font-medium text-sm sm:text-base">
//                       Availability
//                     </label>
//                     <input
//                       type="text"
//                       name="availability"
//                       value={serviceData.availability}
//                       onChange={handleServiceChange}
//                       required
//                       placeholder="e.g., Monday - Friday, 9 AM - 5 PM"
//                       className="w-full p-2 border rounded-lg text-sm sm:text-base"
//                     />
//                   </div>
//                   <div>
//                     <label className="block font-medium text-sm sm:text-base">
//                       Location
//                     </label>
//                     <div className="space-y-2">
//                       {["on-site", "online", "customer_location"].map((loc) => (
//                         <label
//                           key={loc}
//                           className="flex items-center space-x-2 text-sm sm:text-base"
//                         >
//                           <input
//                             type="checkbox"
//                             name="location"
//                             value={loc}
//                             checked={serviceData.location.includes(loc)}
//                             onChange={handleServiceChange}
//                           />
//                           <span>{loc}</span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block font-medium text-sm sm:text-base">
//                       Duration (Minutes, Optional)
//                     </label>
//                     <input
//                       type="number"
//                       name="duration"
//                       value={serviceData.duration}
//                       onChange={handleServiceChange}
//                       className="w-full p-2 border rounded-lg text-sm sm:text-base"
//                     />
//                   </div>
//                   <div>
//                     <label className="block font-medium text-sm sm:text-base">
//                       Booking Type
//                     </label>
//                     <div className="space-y-2">
//                       {["instant", "appointment"].map((type) => (
//                         <label
//                           key={type}
//                           className="flex items-center space-x-2 text-sm sm:text-base"
//                         >
//                           <input
//                             type="checkbox"
//                             name="booking_type"
//                             value={type}
//                             checked={serviceData.booking_type.includes(type)}
//                             onChange={handleServiceChange}
//                           />
//                           <span>{type}</span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block font-medium text-sm sm:text-base">
//                       Payment Options
//                     </label>
//                     <div className="space-y-2">
//                       {["cash", "online", "card"].map((option) => (
//                         <label
//                           key={option}
//                           className="flex items-center space-x-2 text-sm sm:text-base"
//                         >
//                           <input
//                             type="checkbox"
//                             name="payment_options"
//                             value={option}
//                             checked={serviceData.payment_options.includes(
//                               option
//                             )}
//                             onChange={handleServiceChange}
//                           />
//                           <span>{option}</span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                   <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
//                     <button
//                       type="submit"
//                       className="w-full p-2 sm:p-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 text-sm sm:text-base"
//                     >
//                       Update Service
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => setEditingService(null)}
//                       className="w-full p-2 sm:p-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-sm sm:text-base"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             )}
//           </div>
//         )}

//         {activeSection === "revenue-statistics" && (
//           <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
//             <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-orange-500 mb-4 sm:mb-6 text-center">
//               Revenue Statistics
//             </h2>
//             {error && (
//               <div className="mb-4 text-red-500 text-center text-sm sm:text-base">
//                 {error}
//               </div>
//             )}
//             <div className="space-y-4 sm:space-y-6">
//               {/* Total Revenue */}
//               <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
//                 <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-700 mb-2">
//                   Total Revenue
//                 </h3>
//                 <p className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-500">
//                   ${revenueData.totalRevenue.toFixed(2)}
//                 </p>
//               </div>

//               {/* Revenue by Service */}
//               <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
//                 <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-700 mb-2 sm:mb-4">
//                   Revenue by Service
//                 </h3>
//                 {revenueData.revenueByService.length > 0 ? (
//                   <div className="overflow-x-auto">
//                     <table className="w-full text-left border-collapse text-xs sm:text-sm md:text-base">
//                       <thead>
//                         <tr className="bg-gray-100">
//                           <th className="py-2 sm:py-3 px-2 sm:px-4 md:px-6 font-semibold text-gray-700">
//                             Service Name
//                           </th>
//                           <th className="py-2 sm:py-3 px-2 sm:px-4 md:px-6 font-semibold text-gray-700">
//                             Revenue
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {revenueData.revenueByService.map((service) => (
//                           <tr
//                             key={service.serviceId}
//                             className="border-b border-gray-200 hover:bg-gray-50"
//                           >
//                             <td className="py-2 sm:py-3 px-2 sm:px-4 md:px-6">
//                               {service.serviceName}
//                             </td>
//                             <td className="py-2 sm:py-3 px-2 sm:px-4 md:px-6">
//                               ${service.revenue.toFixed(2)}
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 ) : (
//                   <p className="text-gray-500 text-sm sm:text-base">
//                     No revenue data available for services.
//                   </p>
//                 )}
//               </div>

//               {/* Monthly Revenue Chart */}
//               <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
//                 <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-700 mb-2 sm:mb-4">
//                   Monthly Revenue Trend
//                 </h3>
//                 {revenueData.monthlyRevenue.length > 0 ? (
//                   <div className="h-64 sm:h-80 md:h-96">
//                     <Line data={chartData} options={chartOptions} />
//                   </div>
//                 ) : (
//                   <p className="text-gray-500 text-sm sm:text-base">
//                     No monthly revenue data available.
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         {activeSection === "edit-profile" && (
//           <div className="bg-white rounded-xl shadow-xl p-4 sm:p-6 md:p-8 max-w-3xl mx-auto">
//             <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-center bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
//               Edit Profile
//             </h2>
//             {error && (
//               <div className="mb-4 sm:mb-6 text-red-500 text-center text-sm sm:text-base">
//                 {error}
//               </div>
//             )}
//             <form onSubmit={handleProfileSubmit} className="space-y-4 sm:space-y-6">
//               <div className="relative">
//                 <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
//                   First Name
//                 </label>
//                 <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
//                   <span className="pl-3 text-gray-500">
//                     <svg
//                       className="w-4 sm:w-5 h-4 sm:h-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                       ></path>
//                     </svg>
//                   </span>
//                   <input
//                     type="text"
//                     name="ownerFirstName"
//                     value={profileData.ownerFirstName}
//                     onChange={handleProfileChange}
//                     required
//                     className="w-full p-2 sm:p-3 border-0 focus:outline-none focus:ring-0 text-sm sm:text-base"
//                     placeholder="Enter your first name"
//                   />
//                 </div>
//               </div>
//               <div className="relative">
//                 <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
//                   Last Name
//                 </label>
//                 <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
//                   <span className="pl-3 text-gray-500">
//                     <svg
//                       className="w-4 sm:w-5 h-4 sm:h-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                       ></path>
//                     </svg>
//                   </span>
//                   <input
//                     type="text"
//                     name="ownerLastName"
//                     value={profileData.ownerLastName}
//                     onChange={handleProfileChange}
//                     required
//                     className="w-full p-2 sm:p-3 border-0 focus:outline-none focus:ring-0 text-sm sm:text-base"
//                     placeholder="Enter your last name"
//                   />
//                 </div>
//               </div>
//               <div className="relative">
//                 <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
//                   Email
//                 </label>
//                 <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
//                   <span className="pl-3 text-gray-500">
//                     <svg
//                       className="w-4 sm:w-5 h-4 sm:h-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                       ></path>
//                     </svg>
//                   </span>
//                   <input
//                     type="email"
//                     name="email"
//                     value={profileData.email}
//                     onChange={handleProfileChange}
//                     required
//                     className="w-full p-2 sm:p-3 border-0 focus:outline-none focus:ring-0 text-sm sm:text-base"
//                     placeholder="Enter your email"
//                   />
//                 </div>
//               </div>
//               <div className="relative">
//                 <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
//                   Phone Number
//                 </label>
//                 <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
//                   <span className="pl-3 text-gray-500">
//                     <svg
//                       className="w-4 sm:w-5 h-4 sm:h-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
//                       ></path>
//                     </svg>
//                   </span>
//                   <input
//                     type="tel"
//                     name="phoneNumber"
//                     value={profileData.phoneNumber}
//                     onChange={handleProfileChange}
//                     required
//                     className="w-full p-2 sm:p-3 border-0 focus:outline-none focus:ring-0 text-sm sm:text-base"
//                     placeholder="Enter your phone number"
//                   />
//                 </div>
//               </div>
//               <div className="relative">
//                 <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
//                   Business Name
//                 </label>
//                 <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
//                   <span className="pl-3 text-gray-500">
//                     <svg
//                       className="w-4 sm:w-5 h-4 sm:h-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h-14"
//                       ></path>
//                     </svg>
//                   </span>
//                   <input
//                     type="text"
//                     name="businessName"
//                     value={profileData.businessName}
//                     onChange={handleProfileChange}
//                     required
//                     className="w-full p-2 sm:p-3 border-0 focus:outline-none focus:ring-0 text-sm sm:text-base"
//                     placeholder="Enter your business name"
//                   />
//                 </div>
//               </div>
//               <div className="relative">
//                 <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
//                   Business Category
//                 </label>
//                 <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
//                   <span className="pl-3 text-gray-500">
//                     <svg
//                       className="w-4 sm:w-5 h-4 sm:h-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M3 7h18M3 12h18M3 17h18"
//                       ></path>
//                     </svg>
//                   </span>
//                   <input
//                     type="text"
//                     name="businessCategory"
//                     value={profileData.businessCategory}
//                     onChange={handleProfileChange}
//                     required
//                     className="w-full p-2 sm:p-3 border-0 focus:outline-none focus:ring-0 text-sm sm:text-base"
//                     placeholder="Enter business category"
//                   />
//                 </div>
//               </div>
//               <div className="relative">
//                 <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
//                   Business Address
//                 </label>
//                 <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
//                   <span className="pl-3 text-gray-500">
//                     <svg
//                       className="w-4 sm:w-5 h-4 sm:h-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
//                       ></path>
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                       ></path>
//                     </svg>
//                   </span>
//                   <input
//                     type="text"
//                     name="businessAddress"
//                     value={profileData.businessAddress}
//                     onChange={handleProfileChange}
//                     required
//                     className="w-full p-2 sm:p-3 border-0 focus:outline-none focus:ring-0 text-sm sm:text-base"
//                     placeholder="Enter business address"
//                   />
//                 </div>
//               </div>
//               <div className="relative">
//                 <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
//                   City
//                 </label>
//                 <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
//                   <span className="pl-3 text-gray-500">
//                     <svg
//                       className="w-4 sm:w-5 h-4 sm:h-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M3 12h18M12 3v18"
//                       ></path>
//                     </svg>
//                   </span>
//                   <input
//                     type="text"
//                     name="city"
//                     value={profileData.city}
//                     onChange={handleProfileChange}
//                     required
//                     className="w-full p-2 sm:p-3 border-0 focus:outline-none focus:ring-0 text-sm sm:text-base"
//                     placeholder="Enter city"
//                   />
//                 </div>
//               </div>
//               <div className="relative">
//                 <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
//                   State
//                 </label>
//                 <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
//                   <span className="pl-3 text-gray-500">
//                     <svg
//                       className="w-4 sm:w-5 h-4 sm:h-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M3 12h18M12 3v18"
//                       ></path>
//                     </svg>
//                   </span>
//                   <input
//                     type="text"
//                     name="state"
//                     value={profileData.state}
//                     onChange={handleProfileChange}
//                     required
//                     className="w-full p-2 sm:p-3 border-0 focus:outline-none focus:ring-0 text-sm sm:text-base"
//                     placeholder="Enter state"
//                   />
//                 </div>
//               </div>
//               <div className="relative">
//                 <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
//                   Zip Code
//                 </label>
//                 <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
//                   <span className="pl-3 text-gray-500">
//                     <svg
//                       className="w-4 sm:w-5 h-4 sm:h-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M12 8v8m-4-4h8"
//                       ></path>
//                     </svg>
//                   </span>
//                   <input
//                     type="text"
//                     name="zipCode"
//                     value={profileData.zipCode}
//                     onChange={handleProfileChange}
//                     required
//                     className="w-full p-2 sm:p-3 border-0 focus:outline-none focus:ring-0 text-sm sm:text-base"
//                     placeholder="Enter zip code"
//                   />
//                 </div>
//               </div>
//               <div className="relative">
//                 <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
//                   Country
//                 </label>
//                 <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
//                   <span className="pl-3 text-gray-500">
//                     <svg
//                       className="w-4 sm:w-5 h-4 sm:h-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M3 3h18v18H3z"
//                       ></path>
//                     </svg>
//                   </span>
//                   <input
//                     type="text"
//                     name="country"
//                     value={profileData.country}
//                     onChange={handleProfileChange}
//                     required
//                     className="w-full p-2 sm:p-3 border-0 focus:outline-none focus:ring-0 text-sm sm:text-base"
//                     placeholder="Enter country"
//                   />
//                 </div>
//               </div>
//               <button
//                 type="submit"
//                 className="w-full p-2 sm:p-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold shadow-md hover:shadow-lg text-sm sm:text-base"
//               >
//                 Update Profile
//               </button>
//             </form>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BusinessProfile;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import ServicesTable from "../ServicesTable";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Menu, X, ArrowLeft, Bell } from "lucide-react"; // Import Lucide icons
import { showSuccessToast, showErrorToast } from "../../utils/toast";
import BookingRequests from "../BookingRequests";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Dummy revenue data
const dummyRevenueData = {
  totalRevenue: 12345.67,
  revenueByService: [
    { serviceId: "1", serviceName: "Haircut", revenue: 4567.89 },
    { serviceId: "2", serviceName: "Massage", revenue: 3456.78 },
    { serviceId: "3", serviceName: "Nail Treatment", revenue: 2321.0 },
    { serviceId: "4", serviceName: "Facial", revenue: 2000.0 },
  ],
  monthlyRevenue: [
    { month: "2024-04", revenue: 800.0 },
    { month: "2024-05", revenue: 1200.0 },
    { month: "2024-06", revenue: 1000.0 },
    { month: "2024-07", revenue: 1500.0 },
    { month: "2024-08", revenue: 1800.0 },
    { month: "2024-09", revenue: 2000.0 },
    { month: "2024-10", revenue: 2200.0 },
    { month: "2024-11", revenue: 1900.0 },
    { month: "2024-12", revenue: 2500.0 },
    { month: "2025-01", revenue: 2700.0 },
    { month: "2025-02", revenue: 3000.0 },
    { month: "2025-03", revenue: 2800.0 },
  ],
};

const BusinessOwnerProfile = () => {
  const [authUser, setAuthUser, logout, , loading] = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("my-profile");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [serviceData, setServiceData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    availability: "",
    location: [],
    duration: "",
    images: [],
    booking_type: [],
    payment_options: [],
  });
  const [profileData, setProfileData] = useState({
    ownerFirstName: "",
    ownerLastName: "",
    email: "",
    phoneNumber: "",
    businessName: "",
    businessCategory: "",
    businessAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    businessLogo: "",
  });
  const [logoFile, setLogoFile] = useState(null);
  const [revenueData, setRevenueData] = useState({
    totalRevenue: 0,
    revenueByService: [],
    monthlyRevenue: [],
  });
  const [error, setError] = useState("");
  const [editingService, setEditingService] = useState(null);

  // Fetch profile data when "Edit Profile" is selected
  useEffect(() => {
    if (activeSection === "edit-profile") {
      const fetchProfile = async () => {
        try {
          const response = await fetch(
            `https://bookmyservice.onrender.com/api/auth/me`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              credentials: "include",
            }
          );
          const data = await response.json();
          if (!response.ok)
            throw new Error(data.message || "Failed to fetch profile");

          setProfileData({
            ownerFirstName: data.data.ownerFirstName || "",
            ownerLastName: data.data.ownerLastName || "",
            email: data.data.email || "",
            phoneNumber: data.data.phoneNumber || "",
            businessLogo: data.data.businessLogo || "",
            businessName: data.data.businessName || "",
            businessCategory: data.data.businessCategory || "",
            businessAddress: data.data.businessAddress || "",
            city: data.data.city || "",
            state: data.data.state || "",
            zipCode: data.data.zipCode || "",
            country: data.data.country || "",
          });
        } catch (err) {
          setError("Failed to load profile: " + err.message);
          console.error("Fetch Profile Error:", err);
        }
      };
      fetchProfile();
    }
  }, [activeSection, authUser._id]);

  // Fetch real revenue data when "Revenue Statistics" is selected
  useEffect(() => {
    if (activeSection === "revenue-statistics") {
      const fetchRevenueData = async () => {
        try {
          setError("");
          const response = await fetch(
            "https://bookmyservice.onrender.com/api/booking/statistics/revenue",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              credentials: "include",
            }
          );

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || "Failed to fetch revenue statistics");
          }

          // Format month labels for better display
          const formattedData = {
            ...data.data,
            monthlyRevenue: data.data.monthlyRevenue.map(item => {
              // Convert YYYY-MM to more readable format (e.g., "Apr 2024")
              const [year, month] = item.month.split('-');
              const date = new Date(parseInt(year), parseInt(month) - 1);
              const monthName = date.toLocaleString('default', { month: 'short' });

              return {
                ...item,
                displayMonth: `${monthName} ${year}`
              };
            })
          };

          setRevenueData(formattedData);
        } catch (err) {
          console.error("Fetch Revenue Error:", err);
          setError("Failed to load revenue statistics: " + err.message);

          // Fallback to dummy data if API fails
          setRevenueData(dummyRevenueData);
        }
      };

      fetchRevenueData();
    }
  }, [activeSection]);

  // Redirect to login if not authenticated after loading
  useEffect(() => {
    if (!loading && !authUser) {
      navigate("/login");
    }
  }, [loading, authUser, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleServiceChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setServiceData((prev) => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter((item) => item !== value),
      }));
    } else if (name === "duration") {
      // Handle duration field - convert empty string to null or keep valid number
      const durationValue = value === "" ? null : value;
      setServiceData((prev) => ({
        ...prev,
        [name]: durationValue,
      }));
    } else {
      setServiceData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // const handleServiceSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch("https://bookmyservice.onrender.com/api/service/create", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //       credentials: "include",
  //       body: JSON.stringify(serviceData),
  //     });
  //     const data = await response.json();
  //     if (!response.ok)
  //       throw new Error(data.message || "Failed to create service");

  //     alert("Service created successfully!");
  //     setServiceData({
  //       name: "",
  //       category: "",
  //       description: "",
  //       price: "",
  //       availability: "",
  //       location: [],
  //       duration: "",
  //       images: [],
  //       booking_type: [],
  //       payment_options: [],
  //     });
  //   } catch (err) {
  //     console.error("Add Service Error:", err);
  //     alert("Failed to add service: " + err.message);
  //   }
  // };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      // Append all service data
      Object.keys(serviceData).forEach((key) => {
        if (key === "images") {
          // Append each image file
          serviceData.images.forEach((image, index) => {
            if (image instanceof File) {
              formData.append("images", image);
            }
          });
        } else if (key === "duration") {
          // Handle duration field - only append if it's a valid number
          if (serviceData[key] && serviceData[key] !== "" && serviceData[key] !== "null") {
            formData.append(key, serviceData[key]);
          }
        } else if (Array.isArray(serviceData[key])) {
          // Handle array fields
          serviceData[key].forEach((item) => {
            formData.append(key, item);
          });
        } else {
          formData.append(key, serviceData[key]);
        }
      });

      const response = await fetch("https://bookmyservice.onrender.com/api/service/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
        body: formData, // No Content-Type header - let browser set it with boundary
      });
      const data = await response.json();
      // ... rest of your existing code const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to create service");

      showSuccessToast("Service created successfully!");
      setServiceData({
        name: "",
        category: "",
        description: "",
        price: "",
        availability: "",
        location: [],
        duration: "",
        images: [],
        booking_type: [],
        payment_options: [],
      });
    } catch (err) {
      console.error("Add Service Error:", err);
      showErrorToast("Failed to add service: " + err.message);
    }
  };

  const handleUpdateService = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      // Append all service data
      Object.keys(serviceData).forEach((key) => {
        if (key === "images") {
          // Append each image file
          serviceData.images.forEach((image, index) => {
            if (image instanceof File) {
              formData.append("images", image);
            } else {
              // For existing image URLs, you might want to handle differently
              formData.append("existingImages", image);
            }
          });
        } else if (key === "duration") {
          // Handle duration field - only append if it's a valid number
          if (serviceData[key] && serviceData[key] !== "" && serviceData[key] !== "null") {
            formData.append(key, serviceData[key]);
          }
        } else if (Array.isArray(serviceData[key])) {
          serviceData[key].forEach((item) => {
            formData.append(key, item);
          });
        } else {
          formData.append(key, serviceData[key]);
        }
      });

      const response = await fetch(
        `https://bookmyservice.onrender.com/api/service/update/${editingService._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          credentials: "include",
          body: formData,
        }
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to update service");

      showSuccessToast("Service updated successfully!");
      setEditingService(null);
      setServiceData({
        name: "",
        category: "",
        description: "",
        price: "",
        availability: "",
        location: [],
        duration: "",
        images: [],
        booking_type: [],
        payment_options: [],
      });
    } catch (err) {
      console.error("Update Service Error:", err);
      showErrorToast("Failed to update service: " + err.message);
    }
  };
  const handleEditService = (service) => {
    setEditingService(service);
    setServiceData(service);
  };

  // const handleUpdateService = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch(
  //       `https://bookmyservice.onrender.com/api/service/update/${editingService._id}`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //         credentials: "include",
  //         body: JSON.stringify(serviceData),
  //       }
  //     );
  //     const data = await response.json();
  //     if (!response.ok)
  //       throw new Error(data.message || "Failed to update service");

  //     alert("Service updated successfully!");
  //     setEditingService(null);
  //     setServiceData({
  //       name: "",
  //       category: "",
  //       description: "",
  //       price: "",
  //       availability: "",
  //       location: [],
  //       duration: "",
  //       images: [],
  //       booking_type: [],
  //       payment_options: [],
  //     });
  //   } catch (err) {
  //     console.error("Update Service Error:", err);
  //     alert("Failed to update service: " + err.message);
  //   }
  // };

  const handleProfileChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "businessLogo" && files && files.length > 0) {
      setLogoFile(files[0]);

      // Create a preview URL for the image
      const previewUrl = URL.createObjectURL(files[0]);
      setProfileData((prev) => ({ ...prev, businessLogo: previewUrl }));
    } else {
      setProfileData((prev) => ({ ...prev, [name]: value }));
    }
    setError("");
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setServiceData((prev) => ({
        ...prev,
        images: [...(prev.images || []), ...newImages],
      }));
    }
  };

  const removeImage = (index) => {
    setServiceData((prev) => {
      const newImages = [...prev.images];
      newImages.splice(index, 1);
      return { ...prev, images: newImages };
    });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // Create FormData object for file upload
      const formData = new FormData();

      // Add all profile data to FormData
      Object.keys(profileData).forEach(key => {
        if (key !== 'businessLogo' || typeof profileData[key] === 'string') {
          formData.append(key, profileData[key]);
        }
      });

      // Add logo file if it exists
      if (logoFile) {
        formData.append('file', logoFile);
      }

      const response = await fetch(
        `https://bookmyservice.onrender.com/api/business-owner/${authUser._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          credentials: "include",
          body: formData,
        }
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to update profile");

      setAuthUser(data.data);
      showSuccessToast("Profile updated successfully!");
      setActiveSection("my-profile");
    } catch (err) {
      setError("Failed to update profile: " + err.message);
      showErrorToast("Failed to update profile: " + err.message);
      console.error("Update Profile Error:", err);
    }
  };

  // Chart data for monthly revenue
  const chartData = {
    labels: revenueData.monthlyRevenue.map((item) => item.displayMonth || item.month),
    datasets: [
      {
        label: "Monthly Revenue",
        data: revenueData.monthlyRevenue.map((item) => item.revenue),
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: "Monthly Revenue Trend",
        font: {
          size: 16,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Revenue ($)",
          font: {
            size: 12,
          },
        },
        ticks: {
          font: {
            size: 10,
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Month",
          font: {
            size: 12,
          },
        },
        ticks: {
          font: {
            size: 10,
          },
        },
      },
    },
  };

  const menuItems = [
    {
      id: "my-profile",
      label: "My Profile",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      id: "booking-requests",
      label: "Booking Requests",
      color: "bg-red-500 hover:bg-red-600",
      icon: <Bell size={18} className="mr-2" />,
    },
    {
      id: "add-service",
      label: "Add Service",
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      id: "my-services",
      label: "My Services",
      color: "bg-purple-500 hover:bg-purple-600",
    },
    {
      id: "revenue-statistics",
      label: "Revenue Statistics",
      color: "bg-yellow-500 hover:bg-yellow-600",
    },
    {
      id: "edit-profile",
      label: "Edit Profile",
      color: "bg-teal-500 hover:bg-teal-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Mobile Menu Header */}
      <div className="md:hidden flex justify-between items-center p-4 bg-white shadow-md">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-orange-500 focus:outline-none"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h1 className="text-xl font-bold text-orange-500">
          Business Dashboard
        </h1>
        <button
          onClick={() => navigate("/")}
          className="text-orange-500 focus:outline-none"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center justify-between mb-6 p-2">
            <h2 className="text-xl font-bold text-orange-500">
              Business Dashboard
            </h2>
            <button
              className="md:hidden text-gray-500"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full p-3 text-white text-left rounded-lg transition-colors ${
                  item.color
                } ${
                  activeSection === item.id
                    ? "ring-2 ring-offset-2 ring-orange-500"
                    : ""
                }`}
              >
                <div className="flex items-center">
                  {item.icon}
                  {item.label}
                </div>
              </button>
            ))}
            <button
              onClick={handleLogout}
              className="w-full p-3 bg-red-500 text-white text-left rounded-lg hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </nav>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 overflow-y-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate("/")}
            className="hidden md:flex items-center text-orange-500 hover:text-orange-600 mr-4"
          >
            <ArrowLeft size={24} className="mr-2" />
            Back
          </button>
        </div>

        {activeSection === "my-profile" && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl md:text-2xl font-bold text-orange-500 mb-6 text-center">
              My Profile
            </h2>

            <div className="flex flex-col items-center mb-6">
              {authUser?.businessLogo ? (
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-orange-500">
                  <img
                    src={authUser.businessLogo}
                    alt={`${authUser.businessName} Logo`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-32 h-32 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-4xl font-bold text-orange-500">
                    {authUser?.ownerFirstName?.charAt(0) || ""}
                    {authUser?.ownerLastName?.charAt(0) || ""}
                  </span>
                </div>
              )}
              <h1 className="text-2xl font-bold text-gray-800 mb-1">
                {authUser?.businessName}
              </h1>
              <p className="text-gray-600 mb-1">{authUser?.businessCategory}</p>
              <p className="text-gray-600">{authUser?.email}</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <th className="py-4 px-6 font-semibold text-gray-700 bg-gray-100 w-1/3">
                      First Name
                    </th>
                    <td className="py-4 px-6 text-gray-800">
                      {authUser.ownerFirstName}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <th className="py-4 px-6 font-semibold text-gray-700 bg-gray-100 w-1/3">
                      Last Name
                    </th>
                    <td className="py-4 px-6 text-gray-800">
                      {authUser.ownerLastName}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <th className="py-2 sm:py-4 px-3 sm:px-6 font-semibold text-gray-700 bg-gray-100 w-1/3">
                      Email
                    </th>
                    <td className="py-2 sm:py-4 px-3 sm:px-6 text-gray-800">
                      {authUser.email}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <th className="py-2 sm:py-4 px-3 sm:px-6 font-semibold text-gray-700 bg-gray-100 w-1/3">
                      Phone Number
                    </th>
                    <td className="py-2 sm:py-4 px-3 sm:px-6 text-gray-800">
                      {authUser.phoneNumber}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <th className="py-2 sm:py-4 px-3 sm:px-6 font-semibold text-gray-700 bg-gray-100 w-1/3">
                      Business Name
                    </th>
                    <td className="py-2 sm:py-4 px-3 sm:px-6 text-gray-800">
                      {authUser.businessName}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <th className="py-2 sm:py-4 px-3 sm:px-6 font-semibold text-gray-700 bg-gray-100 w-1/3">
                      Category
                    </th>
                    <td className="py-2 sm:py-4 px-3 sm:px-6 text-gray-800">
                      {authUser.businessCategory}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <th className="py-2 sm:py-4 px-3 sm:px-6 font-semibold text-gray-700 bg-gray-100 w-1/3">
                      Address
                    </th>
                    <td className="py-2 sm:py-4 px-3 sm:px-6 text-gray-800">
                      {authUser.businessAddress}, {authUser.city},{" "}
                      {authUser.state}, {authUser.zipCode}, {authUser.country}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeSection === "add-service" && (
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 max-w-4xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-orange-500 mb-6 text-center">
              Add New Service
            </h2>
            <form onSubmit={handleServiceSubmit} className="space-y-6">
              {/* Service Basic Info Section */}
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-100 mb-6">
                <h3 className="text-lg font-semibold text-orange-700 mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">
                      Service Name*
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={serviceData.name}
                      onChange={handleServiceChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      placeholder="Enter service name"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">
                      Category*
                    </label>
                    <input
                      type="text"
                      name="category"
                      value={serviceData.category}
                      onChange={handleServiceChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      placeholder="e.g., Haircut, Massage, Cleaning"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block font-medium text-gray-700 mb-1">
                      Description*
                    </label>
                    <textarea
                      name="description"
                      value={serviceData.description}
                      onChange={handleServiceChange}
                      required
                      rows="3"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      placeholder="Describe your service in detail"
                    />
                  </div>
                </div>
              </div>

              {/* Service Images Section */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
                <h3 className="text-lg font-semibold text-blue-700 mb-4">Service Images</h3>
                <div className="space-y-3">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-white">
                    <input
                      type="file"
                      name="images"
                      onChange={handleImageChange}
                      multiple
                      accept="image/*"
                      className="w-full p-2 text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-2">Upload high-quality images of your service (JPG, PNG). Maximum 5 images.</p>
                  </div>

                  {serviceData.images && serviceData.images.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                      <div className="flex flex-wrap gap-3">
                        {serviceData.images.map((img, index) => (
                          <div key={index} className="relative group">
                            <div className="h-24 w-24 rounded-lg overflow-hidden border border-gray-200">
                              <img
                                src={
                                  typeof img === "string"
                                    ? img
                                    : URL.createObjectURL(img)
                                }
                                alt={`Service preview ${index}`}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-red-600 transition-colors"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Pricing & Availability Section */}
              <div className="bg-green-50 p-4 rounded-lg border border-green-100 mb-6">
                <h3 className="text-lg font-semibold text-green-700 mb-4">Pricing & Availability</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">
                      Price ($)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        name="price"
                        value={serviceData.price}
                        onChange={handleServiceChange}
                        min="0"
                        step="0.01"
                        className="w-full p-3 pl-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">
                      Duration (Minutes)
                    </label>
                    <input
                      type="number"
                      name="duration"
                      value={serviceData.duration}
                      onChange={handleServiceChange}
                      min="0"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      placeholder="e.g., 60"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block font-medium text-gray-700 mb-1">
                      Availability*
                    </label>
                    <input
                      type="text"
                      name="availability"
                      value={serviceData.availability}
                      onChange={handleServiceChange}
                      required
                      placeholder="e.g., Monday - Friday, 9 AM - 5 PM"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Service Options Section */}
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 mb-6">
                <h3 className="text-lg font-semibold text-purple-700 mb-4">Service Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <div className="space-y-2 bg-white p-3 rounded-lg border border-gray-200">
                      {["on-site", "online", "customer_location"].map((loc) => (
                        <label
                          key={loc}
                          className="flex items-center space-x-2 text-sm cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors"
                        >
                          <input
                            type="checkbox"
                            name="location"
                            value={loc}
                            checked={serviceData.location.includes(loc)}
                            onChange={handleServiceChange}
                            className="text-orange-500 focus:ring-orange-500 rounded"
                          />
                          <span className="capitalize">{loc.replace('_', ' ')}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 mb-2">
                      Booking Type
                    </label>
                    <div className="space-y-2 bg-white p-3 rounded-lg border border-gray-200">
                      {["instant", "appointment"].map((type) => (
                        <label
                          key={type}
                          className="flex items-center space-x-2 text-sm cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors"
                        >
                          <input
                            type="checkbox"
                            name="booking_type"
                            value={type}
                            checked={serviceData.booking_type.includes(type)}
                            onChange={handleServiceChange}
                            className="text-orange-500 focus:ring-orange-500 rounded"
                          />
                          <span className="capitalize">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 mb-2">
                      Payment Options
                    </label>
                    <div className="space-y-2 bg-white p-3 rounded-lg border border-gray-200">
                      {["cash", "online", "card"].map((option) => (
                        <label
                          key={option}
                          className="flex items-center space-x-2 text-sm cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors"
                        >
                          <input
                            type="checkbox"
                            name="payment_options"
                            value={option}
                            checked={serviceData.payment_options.includes(option)}
                            onChange={handleServiceChange}
                            className="text-orange-500 focus:ring-orange-500 rounded"
                          />
                          <span className="capitalize">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full p-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold text-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform"
                >
                  Add Service
                </button>
              </div>
            </form>
          </div>
        )}

        {activeSection === "my-services" && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl md:text-2xl font-bold text-orange-500 mb-6 text-center">
              My Services
            </h2>
            <div className="overflow-x-auto">
              <ServicesTable authUser={authUser} onEdit={handleEditService} />
            </div>
            {editingService && (
              <div className="mt-6 bg-gray-50 p-6 rounded-lg shadow-inner">
                <h3 className="text-xl font-semibold text-orange-500 mb-4">
                  Edit Service: {editingService.name}
                </h3>
                <form onSubmit={handleUpdateService} className="space-y-4">
                  <div>
                    <label className="block font-medium text-gray-700">
                      Service Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={serviceData.name}
                      onChange={handleServiceChange}
                      required
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700">
                      Category
                    </label>
                    <input
                      type="text"
                      name="category"
                      value={serviceData.category}
                      onChange={handleServiceChange}
                      required
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={serviceData.description}
                      onChange={handleServiceChange}
                      required
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700">
                      Service Images
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={serviceData.price}
                      onChange={handleServiceChange}
                      className="w-full p-2 border rounded-lg text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-sm sm:text-base">
                      Availability
                    </label>
                    <input
                      type="text"
                      name="availability"
                      value={serviceData.availability}
                      onChange={handleServiceChange}
                      required
                      placeholder="e.g., Monday - Friday, 9 AM - 5 PM"
                      className="w-full p-2 border rounded-lg text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-sm sm:text-base">
                      Location
                    </label>
                    <div className="space-y-2">
                      {["on-site", "online", "customer_location"].map((loc) => (
                        <label
                          key={loc}
                          className="flex items-center space-x-2 text-sm sm:text-base"
                        >
                          <input
                            type="checkbox"
                            name="location"
                            value={loc}
                            checked={serviceData.location.includes(loc)}
                            onChange={handleServiceChange}
                          />
                          <span>{loc}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block font-medium text-sm sm:text-base">
                      Duration (Minutes, Optional)
                    </label>
                    <input
                      type="number"
                      name="duration"
                      value={serviceData.duration}
                      onChange={handleServiceChange}
                      className="w-full p-2 border rounded-lg text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-sm sm:text-base">
                      Booking Type
                    </label>
                    <div className="space-y-2">
                      {["instant", "appointment"].map((type) => (
                        <label
                          key={type}
                          className="flex items-center space-x-2 text-sm sm:text-base"
                        >
                          <input
                            type="checkbox"
                            name="booking_type"
                            value={type}
                            checked={serviceData.booking_type.includes(type)}
                            onChange={handleServiceChange}
                          />
                          <span>{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block font-medium text-sm sm:text-base">
                      Payment Options
                    </label>
                    <div className="space-y-2">
                      {["cash", "online", "card"].map((option) => (
                        <label
                          key={option}
                          className="flex items-center space-x-2 text-sm sm:text-base"
                        >
                          <input
                            type="checkbox"
                            name="payment_options"
                            value={option}
                            checked={serviceData.payment_options.includes(
                              option
                            )}
                            onChange={handleServiceChange}
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                    <button
                      type="submit"
                      className="w-full p-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      Update Service
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingService(null)}
                      className="w-full p-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {activeSection === "booking-requests" && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl md:text-2xl font-bold text-orange-500 mb-6 text-center">
              Booking Requests
            </h2>
            <BookingRequests authUser={authUser} />
          </div>
        )}

        {activeSection === "revenue-statistics" && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl md:text-2xl font-bold text-orange-500 mb-6 text-center">
              Revenue Statistics
            </h2>
            {error && (
              <div className="mb-4 text-red-500 text-center text-sm sm:text-base">
                {error}
              </div>
            )}
            <div className="space-y-6">
              {/* Total Revenue */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Total Revenue
                </h3>
                <p className="text-2xl font-bold text-orange-500">
                  ${revenueData.totalRevenue.toFixed(2)}
                </p>
              </div>

              {/* Revenue by Service */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  Revenue by Service
                </h3>
                {revenueData.revenueByService.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="py-3 px-6 font-semibold text-gray-700">
                            Service Name
                          </th>
                          <th className="py-3 px-6 font-semibold text-gray-700">
                            Revenue
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {revenueData.revenueByService.map((service) => (
                          <tr
                            key={service.serviceId}
                            className="border-b border-gray-200 hover:bg-gray-50"
                          >
                            <td className="py-2 sm:py-3 px-2 sm:px-4 md:px-6">
                              {service.serviceName}
                            </td>
                            <td className="py-2 sm:py-3 px-2 sm:px-4 md:px-6">
                              ${service.revenue.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500">
                    No revenue data available for services.
                  </p>
                )}
              </div>

              {/* Monthly Revenue Chart */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  Monthly Revenue Trend
                </h3>
                {revenueData.monthlyRevenue.length > 0 ? (
                  <div className="h-80">
                    <Line data={chartData} options={chartOptions} />
                  </div>
                ) : (
                  <p className="text-gray-500">
                    No monthly revenue data available.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeSection === "edit-profile" && (
          <div className="bg-white rounded-xl shadow-xl p-4 sm:p-6 md:p-8 max-w-3xl mx-auto">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-center bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Edit Profile
            </h2>
            {error && (
              <div className="mb-4 sm:mb-6 text-red-500 text-center text-sm sm:text-base">
                {error}
              </div>
            )}
            <form
              onSubmit={handleProfileSubmit}
              className="space-y-4 sm:space-y-6"
            >
              <div className="relative">
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
                  <span className="pl-3 text-gray-500">
                    <svg
                      className="w-4 sm:w-5 h-4 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      ></path>
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="ownerFirstName"
                    value={profileData.ownerFirstName}
                    onChange={handleProfileChange}
                    required
                    className="w-full p-2 sm:p-3 border-0 focus:outline-none focus:ring-0 text-sm sm:text-base"
                    placeholder="Enter your first name"
                  />
                </div>
              </div>
              <div className="relative">
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
                  <span className="pl-3 text-gray-500">
                    <svg
                      className="w-4 sm:w-5 h-4 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      ></path>
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="ownerLastName"
                    value={profileData.ownerLastName}
                    onChange={handleProfileChange}
                    required
                    className="w-full p-2 sm:p-3 border-0 focus:outline-none focus:ring-0 text-sm sm:text-base"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              <div className="relative">
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
                  <span className="pl-3 text-gray-500">
                    <svg
                      className="w-4 sm:w-5 h-4 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    required
                    className="w-full p-2 sm:p-3 border-0 focus:outline-none focus:ring-0 text-sm sm:text-base"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div className="relative">
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
                  <span className="pl-3 text-gray-500">
                    <svg
                      className="w-4 sm:w-5 h-4 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      ></path>
                    </svg>
                  </span>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={profileData.phoneNumber}
                    onChange={handleProfileChange}
                    required
                    className="w-full p-2 sm:p-3 border-0 focus:outline-none focus:ring-0 text-sm sm:text-base"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
              <div className="relative">
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                  Business Name
                </label>
                <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
                  <span className="pl-3 text-gray-500">
                    <svg
                      className="w-4 sm:w-5 h-4 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h-14"
                      ></path>
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="businessName"
                    value={profileData.businessName}
                    onChange={handleProfileChange}
                    required
                    className="w-full p-2 sm:p-3 border-0 focus:outline-none focus:ring-0 text-sm sm:text-base"
                    placeholder="Enter your business name"
                  />
                </div>
              </div>
              <div className="relative">
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                  Business Category
                </label>
                <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
                  <span className="pl-3 text-gray-500">
                    <svg
                      className="w-4 sm:w-5 h-4 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 7h18M3 12h18M3 17h18"
                      ></path>
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="businessCategory"
                    value={profileData.businessCategory}
                    onChange={handleProfileChange}
                    required
                    className="w-full p-2 sm:p-3 border-0 focus:outline-none focus:ring-0 text-sm sm:text-base"
                    placeholder="Enter business category"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                  Business Logo
                </label>
                <div className="space-y-2">
                  {profileData.businessLogo && (
                    <div className="w-32 h-32 mx-auto mb-2 rounded-lg overflow-hidden border border-gray-200">
                      <img
                        src={profileData.businessLogo}
                        alt="Business Logo"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    name="businessLogo"
                    onChange={handleProfileChange}
                    accept="image/*"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                  <p className="text-xs text-gray-500">Upload a square image for best results (JPG, PNG)</p>
                </div>
              </div>
              <div className="relative">
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                  Business Address
                </label>
                <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
                  <span className="pl-3 text-gray-500">
                    <svg
                      className="w-4 sm:w-5 h-4 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="businessAddress"
                    value={profileData.businessAddress}
                    onChange={handleProfileChange}
                    required
                    className="w-full p-2 sm:p-3 border-0 focus:outline-none focus:ring-0 text-sm sm:text-base"
                    placeholder="Enter business address"
                  />
                </div>
              </div>
              <div className="relative">
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                  City
                </label>
                <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
                  <span className="pl-3 text-gray-500">
                    <svg
                      className="w-4 sm:w-5 h-4 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 12h18M12 3v18"
                      ></path>
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="city"
                    value={profileData.city}
                    onChange={handleProfileChange}
                    required
                    className="w-full p-2 sm:p-3 border-0 focus:outline-none focus:ring-0 text-sm sm:text-base"
                    placeholder="Enter city"
                  />
                </div>
              </div>
              <div className="relative">
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                  State
                </label>
                <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
                  <span className="pl-3 text-gray-500">
                    <svg
                      className="w-4 sm:w-5 h-4 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 12h18M12 3v18"
                      ></path>
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="state"
                    value={profileData.state}
                    onChange={handleProfileChange}
                    required
                    className="w-full p-2 sm:p-3 border-0 focus:outline-none focus:ring-0 text-sm sm:text-base"
                    placeholder="Enter state"
                  />
                </div>
              </div>
              <div className="relative">
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                  Zip Code
                </label>
                <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
                  <span className="pl-3 text-gray-500">
                    <svg
                      className="w-4 sm:w-5 h-4 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v8m-4-4h8"
                      ></path>
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="zipCode"
                    value={profileData.zipCode}
                    onChange={handleProfileChange}
                    required
                    className="w-full p-2 sm:p-3 border-0 focus:outline-none focus:ring-0 text-sm sm:text-base"
                    placeholder="Enter zip code"
                  />
                </div>
              </div>
              <div className="relative">
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                  Country
                </label>
                <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
                  <span className="pl-3 text-gray-500">
                    <svg
                      className="w-4 sm:w-5 h-4 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h18v18H3z"
                      ></path>
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="country"
                    value={profileData.country}
                    onChange={handleProfileChange}
                    required
                    className="w-full p-2 sm:p-3 border-0 focus:outline-none focus:ring-0 text-sm sm:text-base"
                    placeholder="Enter country"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full p-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Update Profile
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessOwnerProfile;
