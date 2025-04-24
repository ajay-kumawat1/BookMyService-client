// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// } from 'chart.js';

// // Initialize ChartJS components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const BACKEND_URL = "https://bookmyservice.onrender.com";

// const AdminDashboard = () => {
//   const [stats, setStats] = useState(null);
//   const [users, setUsers] = useState([]);
//   const [services, setServices] = useState([]);
//   const [businessOwners, setBusinessOwners] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('services');
//   const [error, setError] = useState(""); // Add error state for delete operations

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const [statsRes, usersRes, servicesRes, businessesRes] = await Promise.all([
//           axios.get(`${BACKEND_URL}/api/admin/statistics`),
//           axios.get(`${BACKEND_URL}/api/admin/users`),
//           axios.get(`${BACKEND_URL}/api/admin/services`),
//           axios.get(`${BACKEND_URL}/api/admin/businesses`)
//         ]);
//         console.log(statsRes.data.data);
        
//         setStats(statsRes.data.data);
//         setUsers(usersRes.data.data.users);
//         setServices(servicesRes.data.data.services);
//         setBusinessOwners(businessesRes.data.data.owners);
//       } catch (error) {
//         console.error('Failed to fetch dashboard data:', error);
//         setError("Failed to fetch dashboard data: " + error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   // Handler to delete a user
//   const handleDeleteUser = async (userId) => {
//     try {
//       const response = await axios.delete(`${BACKEND_URL}/api/admin/user/${userId}`, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authentication
//         },
//       });
//       if (response.status !== 200) {
//         throw new Error(response.data.message || "Failed to delete user");
//       }
//       setUsers(users.filter((user) => user._id !== userId));
//       setStats((prevStats) => ({
//         ...prevStats,
//         totalUsers: prevStats.totalUsers - 1,
//       }));
//       alert("User deleted successfully!");
//     } catch (err) {
//       setError("Failed to delete user: " + err.message);
//       console.error("Delete User Error:", err);
//     }
//   };

//   // Handler to delete a service
//   const handleDeleteService = async (serviceId) => {
//     try {
//       const response = await axios.delete(`${BACKEND_URL}/api/admin/service/${serviceId}`, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       if (response.status !== 200) {
//         throw new Error(response.data.message || "Failed to delete service");
//       }
//       setServices(services.filter((service) => service._id !== serviceId));
//       setStats((prevStats) => ({
//         ...prevStats,
//         totalServices: prevStats.totalServices - 1,
//       }));
//       alert("Service deleted successfully!");
//     } catch (err) {
//       setError("Failed to delete service: " + err.message);
//       console.error("Delete Service Error:", err);
//     }
//   };

//   // Handler to delete a business owner
//   const handleDeleteBusinessOwner = async (ownerId) => {
//     try {
//       const response = await axios.delete(`${BACKEND_URL}/api/admin/business/${ownerId}`, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       if (response.status !== 200) {
//         throw new Error(response.data.message || "Failed to delete business owner");
//       }
//       setBusinessOwners(businessOwners.filter((owner) => owner._id !== ownerId));
//       setStats((prevStats) => ({
//         ...prevStats,
//         totalBusinessOwners: prevStats.totalBusinessOwners - 1,
//       }));
//       alert("Business owner deleted successfully!");
//     } catch (err) {
//       setError("Failed to delete business owner: " + err.message);
//       console.error("Delete Business Owner Error:", err);
//     }
//   };

//   if (loading) return <div className="p-6">Loading...</div>;
//   if (!stats) return <div className="p-6 text-red-500">Failed to load statistics.</div>;

//   const graphData = {
//     labels: ['Users', 'Business Owners', 'Services'],
//     datasets: [
//       {
//         label: 'Counts',
//         data: [stats.totalUsers, stats.totalBusinessOwners, stats.totalServices],
//         backgroundColor: 'rgba(54, 162, 235, 0.6)',
//         borderColor: 'rgba(54, 162, 235, 1)',
//         borderWidth: 2,
//         barThickness: 40
//       }
//     ]
//   };

//   const graphOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       title: {
//         display: true,
//         text: 'Platform Overview',
//         font: { size: 18, weight: 'bold', family: 'Arial, sans-serif' },
//         color: '#333'
//       },
//       tooltip: { backgroundColor: 'rgba(0, 0, 0, 0.7)', titleColor: '#fff', bodyColor: '#fff' }
//     },
//     scales: {
//       x: { grid: { display: false } },
//       y: {
//         beginAtZero: true,
//         grid: { color: 'rgba(0, 0, 0, 0.1)', borderDash: [5, 5] },
//         ticks: { font: { size: 12, weight: 'bold' }, color: '#333' }
//       }
//     }
//   };

//   const renderTabContent = () => {
//     if (activeTab === 'users') {
//       return (
//         <div className="bg-white rounded-xl shadow-md p-4">
//           <h2 className="text-xl font-semibold mb-4">Users</h2>
//           {error && (
//             <div className="mb-4 text-red-500 text-center text-sm">{error}</div>
//           )}
//           <div className="overflow-x-auto">
//             <table className="min-w-full table-auto">
//               <thead className="bg-gray-200 text-gray-700">
//                 <tr>
//                   <th className="px-4 py-2 text-left">Name</th>
//                   <th className="px-4 py-2 text-left">Email</th>
//                   <th className="px-4 py-2 text-left">Phone</th>
//                   <th className="px-4 py-2 text-left">Role</th>
//                   <th className="px-4 py-2 text-left">Verified</th>
//                   <th className="px-4 py-2 text-left">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.map((user, i) => (
//                   <tr key={i} className="border-b">
//                     <td className="px-4 py-2">{user.firstName} {user.lastName}</td>
//                     <td className="px-4 py-2">{user.email}</td>
//                     <td className="px-4 py-2">{user.phoneNumber}</td>
//                     <td className="px-4 py-2">{user.role}</td>
//                     <td className="px-4 py-2">{user.isVerified ? 'Yes' : 'No'}</td>
//                     <td className="px-4 py-2">
//                       <button
//                         onClick={() => handleDeleteUser(user._id)}
//                         className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       );
//     } else if (activeTab === 'services') {
//       return (
//         <div className="bg-white rounded-xl shadow-md p-4">
//           <h2 className="text-xl font-semibold mb-4">Services</h2>
//           {error && (
//             <div className="mb-4 text-red-500 text-center text-sm">{error}</div>
//           )}
//           <div className="overflow-x-auto">
//             <table className="min-w-full table-auto">
//               <thead className="bg-gray-200 text-gray-700">
//                 <tr>
//                   <th className="px-4 py-2 text-left">Name</th>
//                   <th className="px-4 py-2 text-left">Category</th>
//                   <th className="px-4 py-2 text-left">Availability</th>
//                   <th className="px-4 py-2 text-left">Location</th>
//                   <th className="px-4 py-2 text-left">Images</th>
//                   <th className="px-4 py-2 text-left">Business Name</th>
//                   <th className="px-4 py-2 text-left">Business Owner</th>
//                   <th className="px-4 py-2 text-left">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {services.map((service, i) => (
//                   <tr key={i} className="border-b">
//                     <td className="px-4 py-2">{service.name}</td>
//                     <td className="px-4 py-2">{service.category}</td>
//                     <td className="px-4 py-2">{service.availability}</td>
//                     <td className="px-4 py-2">{service.location.join(', ')}</td>
//                     <td className="px-4 py-2">
//                       {service.images && service.images.length > 0 ? (
//                         <img src={service.images[0]} alt="Service" className="w-16 h-16 object-cover" />
//                       ) : (
//                         "No image"
//                       )}
//                     </td>
//                     <td className="px-4 py-2">{service.businessOwner.businessName}</td>
//                     <td className="px-4 py-2">{service.businessOwner.ownerFirstName + " " + service.businessOwner.ownerLastName}</td>
//                     <td className="px-4 py-2">
//                       <button
//                         onClick={() => handleDeleteService(service._id)}
//                         className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       );
//     } else if (activeTab === 'businessOwners') {
//       return (
//         <div className="bg-white rounded-xl shadow-md p-4">
//           <h2 className="text-xl font-semibold mb-4">Business Owners</h2>
//           {error && (
//             <div className="mb-4 text-red-500 text-center text-sm">{error}</div>
//           )}
//           <div className="overflow-x-auto">
//             <table className="min-w-full table-auto">
//               <thead className="bg-gray-200 text-gray-700">
//                 <tr>
//                   <th className="px-4 py-2 text-left">Owner Name</th>
//                   <th className="px-4 py-2 text-left">Business Name</th>
//                   <th className="px-4 py-2 text-left">Business Category</th>
//                   <th className="px-4 py-2 text-left">Email</th>
//                   <th className="px-4 py-2 text-left">Phone Number</th>
//                   <th className="px-4 py-2 text-left">Verified</th>
//                   <th className="px-4 py-2 text-left">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {businessOwners.map((owner, i) => (
//                   <tr key={i} className="border-b">
//                     <td className="px-4 py-2">{owner.ownerFirstName} {owner.ownerLastName}</td>
//                     <td className="px-4 py-2">{owner.businessName}</td>
//                     <td className="px-4 py-2">{owner.businessCategory}</td>
//                     <td className="px-4 py-2">{owner.email}</td>
//                     <td className="px-4 py-2">{owner.phoneNumber}</td>
//                     <td className="px-4 py-2">{owner.isVerified ? 'Yes' : 'No'}</td>
//                     <td className="px-4 py-2">
//                       <button
//                         onClick={() => handleDeleteBusinessOwner(owner._id)}
//                         className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       );
//     }
//   };

//   return (
//     <div className="flex">
//       {/* Fixed Sidebar */}
//       <aside className="w-60 h-screen bg-white shadow-md fixed top-0 left-0">
//         <div className="p-6">
//           <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
//           <ul className="mt-6">
//             <li
//               className={`p-3 cursor-pointer ${activeTab === 'services' ? 'bg-gray-100' : ''}`}
//               onClick={() => setActiveTab('services')}
//             >
//               Services
//             </li>
//             <li
//               className={`p-3 cursor-pointer ${activeTab === 'users' ? 'bg-gray-100' : ''}`}
//               onClick={() => setActiveTab('users')}
//             >
//               Users
//             </li>
//             <li
//               className={`p-3 cursor-pointer ${activeTab === 'businessOwners' ? 'bg-gray-100' : ''}`}
//               onClick={() => setActiveTab('businessOwners')}
//             >
//               Business Owners
//             </li>
//           </ul>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="ml-60 flex-1 h-screen overflow-auto p-6">
//         <div className="mb-6">
//           <h1 className="text-3xl font-bold">Admin Dashboard</h1>
//         </div>
//         <div className="mb-6" style={{ height: '300px' }}>
//           <Bar data={graphData} options={graphOptions} />
//         </div>
//         <div>{renderTabContent()}</div>
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Initialize ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BACKEND_URL = "https://bookmyservice.onrender.com";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [businessOwners, setBusinessOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('services');
  const [error, setError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar toggle on mobile

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, usersRes, servicesRes, businessesRes] = await Promise.all([
          axios.get(`${BACKEND_URL}/api/admin/statistics`),
          axios.get(`${BACKEND_URL}/api/admin/users`),
          axios.get(`${BACKEND_URL}/api/admin/services`),
          axios.get(`${BACKEND_URL}/api/admin/businesses`)
        ]);
        console.log(statsRes.data.data);
        
        setStats(statsRes.data.data);
        setUsers(usersRes.data.data.users);
        setServices(servicesRes.data.data.services);
        setBusinessOwners(businessesRes.data.data.owners);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        setError("Failed to fetch dashboard data: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Handler to delete a user
  const handleDeleteUser = async (userId) => {
    try {
      const response = await axios.delete(`${BACKEND_URL}/api/admin/user/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status !== 200) {
        throw new Error(response.data.message || "Failed to delete user");
      }
      setUsers(users.filter((user) => user._id !== userId));
      setStats((prevStats) => ({
        ...prevStats,
        totalUsers: prevStats.totalUsers - 1,
      }));
      alert("User deleted successfully!");
    } catch (err) {
      setError("Failed to delete user: " + err.message);
      console.error("Delete User Error:", err);
    }
  };

  // Handler to delete a service
  const handleDeleteService = async (serviceId) => {
    try {
      const response = await axios.delete(`${BACKEND_URL}/api/admin/service/${serviceId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status !== 200) {
        throw new Error(response.data.message || "Failed to delete service");
      }
      setServices(services.filter((service) => service._id !== serviceId));
      setStats((prevStats) => ({
        ...prevStats,
        totalServices: prevStats.totalServices - 1,
      }));
      alert("Service deleted successfully!");
    } catch (err) {
      setError("Failed to delete service: " + err.message);
      console.error("Delete Service Error:", err);
    }
  };

  // Handler to delete a business owner
  const handleDeleteBusinessOwner = async (ownerId) => {
    try {
      const response = await axios.delete(`${BACKEND_URL}/api/admin/business/${ownerId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status !== 200) {
        throw new Error(response.data.message || "Failed to delete business owner");
      }
      setBusinessOwners(businessOwners.filter((owner) => owner._id !== ownerId));
      setStats((prevStats) => ({
        ...prevStats,
        totalBusinessOwners: prevStats.totalBusinessOwners - 1,
      }));
      alert("Business owner deleted successfully!");
    } catch (err) {
      setError("Failed to delete business owner: " + err.message);
      console.error("Delete Business Owner Error:", err);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!stats) return <div className="p-6 text-red-500">Failed to load statistics.</div>;

  const graphData = {
    labels: ['Users', 'Business Owners', 'Services'],
    datasets: [
      {
        label: 'Counts',
        data: [stats.totalUsers, stats.totalBusinessOwners, stats.totalServices],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        barThickness: 40
      }
    ]
  };

  const graphOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Platform Overview',
        font: { size: 18, weight: 'bold', family: 'Arial, sans-serif' },
        color: '#333'
      },
      tooltip: { backgroundColor: 'rgba(0, 0, 0, 0.7)', titleColor: '#fff', bodyColor: '#fff' }
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0, 0, 0, 0.1)', borderDash: [5, 5] },
        ticks: { font: { size: 12, weight: 'bold' }, color: '#333' }
      }
    }
  };

  const renderTabContent = () => {
    if (activeTab === 'users') {
      return (
        <div className="bg-white rounded-xl shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4">Users</h2>
          {error && (
            <div className="mb-4 text-red-500 text-center text-sm">{error}</div>
          )}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Phone</th>
                  <th className="px-4 py-2 text-left">Role</th>
                  <th className="px-4 py-2 text-left">Verified</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => (
                  <tr key={i} className="border-b">
                    <td className="px-4 py-2">{user.firstName} {user.lastName}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.phoneNumber}</td>
                    <td className="px-4 py-2">{user.role}</td>
                    <td className="px-4 py-2">{user.isVerified ? 'Yes' : 'No'}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else if (activeTab === 'services') {
      return (
        <div className="bg-white rounded-xl shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4">Services</h2>
          {error && (
            <div className="mb-4 text-red-500 text-center text-sm">{error}</div>
          )}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Category</th>
                  <th className="px-4 py-2 text-left">Availability</th>
                  <th className="px-4 py-2 text-left">Location</th>
                  <th className="px-4 py-2 text-left">Images</th>
                  <th className="px-4 py-2 text-left">Business Name</th>
                  <th className="px-4 py-2 text-left">Business Owner</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service, i) => (
                  <tr key={i} className="border-b">
                    <td className="px-4 py-2">{service.name}</td>
                    <td className="px-4 py-2">{service.category}</td>
                    <td className="px-4 py-2">{service.availability}</td>
                    <td className="px-4 py-2">{service.location.join(', ')}</td>
                    <td className="px-4 py-2">
                      {service.images && service.images.length > 0 ? (
                        <img src={service.images[0]} alt="Service" className="w-16 h-16 object-cover" />
                      ) : (
                        "No image"
                      )}
                    </td>
                    <td className="px-4 py-2">{service.businessOwner.businessName}</td>
                    <td className="px-4 py-2">{service.businessOwner.ownerFirstName + " " + service.businessOwner.ownerLastName}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDeleteService(service._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else if (activeTab === 'businessOwners') {
      return (
        <div className="bg-white rounded-xl shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4">Business Owners</h2>
          {error && (
            <div className="mb-4 text-red-500 text-center text-sm">{error}</div>
          )}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Owner Name</th>
                  <th className="px-4 py-2 text-left">Business Name</th>
                  <th className="px-4 py-2 text-left">Business Category</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Phone Number</th>
                  <th className="px-4 py-2 text-left">Verified</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {businessOwners.map((owner, i) => (
                  <tr key={i} className="border-b">
                    <td className="px-4 py-2">{owner.ownerFirstName} {owner.ownerLastName}</td>
                    <td className="px-4 py-2">{owner.businessName}</td>
                    <td className="px-4 py-2">{owner.businessCategory}</td>
                    <td className="px-4 py-2">{owner.email}</td>
                    <td className="px-4 py-2">{owner.phoneNumber}</td>
                    <td className="px-4 py-2">{owner.isVerified ? 'Yes' : 'No'}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDeleteBusinessOwner(owner._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Hamburger Menu Button for Mobile */}
      <button
        className="md:hidden p-4 text-black fixed top-0 left-0 z-50"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`w-60 bg-white shadow-md fixed top-0 left-0 h-screen transition-transform duration-300 z-40 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
          <ul className="mt-6">
            <li
              className={`p-3 cursor-pointer ${activeTab === 'services' ? 'bg-gray-100' : ''}`}
              onClick={() => { setActiveTab('services'); setIsSidebarOpen(false); }}
            >
              Services
            </li>
            <li
              className={`p-3 cursor-pointer ${activeTab === 'users' ? 'bg-gray-100' : ''}`}
              onClick={() => { setActiveTab('users'); setIsSidebarOpen(false); }}
            >
              Users
            </li>
            <li
              className={`p-3 cursor-pointer ${activeTab === 'businessOwners' ? 'bg-gray-100' : ''}`}
              onClick={() => { setActiveTab('businessOwners'); setIsSidebarOpen(false); }}
            >
              Business Owners
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className="flex-1 p-4 md:p-6 ml-0 md:ml-60 overflow-auto transition-all duration-300"
        style={{ marginTop: isSidebarOpen ? '0' : '0' }} // Adjust margin for mobile
      >
        <div className="mb-4 md:mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
        </div>
        <div className="mb-4 md:mb-6" style={{ height: '250px', maxHeight: '300px' }}>
          <Bar data={graphData} options={graphOptions} />
        </div>
        <div>{renderTabContent()}</div>
      </main>
    </div>
  );
};

export default AdminDashboard;