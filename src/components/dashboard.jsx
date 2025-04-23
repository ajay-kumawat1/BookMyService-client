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
// const BACKEND_URL = "http://localhost:5000";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [businessOwners, setBusinessOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('services'); // Default tab is 'services'

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, usersRes, servicesRes, businessesRes] = await Promise.all([
          axios.get(`${BACKEND_URL}/api/admin/statistics`),
          axios.get(`${BACKEND_URL}/api/admin/users`),
          axios.get(`${BACKEND_URL}/api/admin/services`),
          axios.get(`${BACKEND_URL}/api/admin/businesses`)
        ]);

        setStats(statsRes.data.data);
        setUsers(usersRes.data.data.users);
        setServices(servicesRes.data.data.services);
        setBusinessOwners(businessesRes.data.data.owners);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!stats) return <div className="p-6 text-red-500">Failed to load statistics.</div>;

  // Graph data for users, businesses, and services
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
    maintainAspectRatio: false, // Ensures the chart resizes to the parent container
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

  // Render content based on active tab
  const renderTabContent = () => {
    if (activeTab === 'users') {
      return (
        <div className="bg-white rounded-xl shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4">Users</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Phone</th>
                  <th className="px-4 py-2 text-left">Role</th>
                  <th className="px-4 py-2 text-left">Verified</th>
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
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Category</th>
                  <th className="px-4 py-2 text-left">Availability</th>
                  <th className="px-4 py-2 text-left">Location</th>
                  <th className="px-4 py-2 text-left">Images</th>
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
    <div className="flex">
  {/* Fixed Sidebar */}
  <aside className="w-60 h-screen bg-white shadow-md fixed top-0 left-0">
    <div className="p-6">
      <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
      <ul className="mt-6">
        <li
          className={`p-3 cursor-pointer ${activeTab === 'services' ? 'bg-gray-100' : ''}`}
          onClick={() => setActiveTab('services')}
        >
          Services
        </li>
        <li
          className={`p-3 cursor-pointer ${activeTab === 'users' ? 'bg-gray-100' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Users
        </li>
        <li
          className={`p-3 cursor-pointer ${activeTab === 'businessOwners' ? 'bg-gray-100' : ''}`}
          onClick={() => setActiveTab('businessOwners')}
        >
          Business Owners
        </li>
      </ul>
    </div>
  </aside>

  {/* Main Content */}
  <main className="ml-60 flex-1 h-screen overflow-auto p-6">
    <div className="mb-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
    </div>
    <div className="mb-6" style={{ height: '300px' }}>
      <Bar data={graphData} options={graphOptions} />
    </div>
    <div>{renderTabContent()}</div>
  </main>
</div>

  );
};

export default AdminDashboard;
