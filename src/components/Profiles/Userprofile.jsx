// export default UserProfile;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { Menu, X, User } from "lucide-react"; // Import User icon
import { IoArrowBackCircle } from "react-icons/io5";
import MyBookings from "../MyBookings";
// import BookedServicesTable from "../BookedServicesTable";


const BookedServicesTable = ({ authUser }) => {
  console.log(authUser, "authUser"); // Debug log
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

        // Deduplicate service IDs to avoid fetching the same service multiple times
        const uniqueServiceIds = [...new Set(authUser.bookedServiceIds)];

        // Fetch each service individually
        const servicePromises = uniqueServiceIds.map(async (serviceId) => {
          const response = await fetch(`https://bookmyservice.onrender.com/api/service/get/${serviceId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          if (!response.ok) {
            throw new Error(`Failed to fetch service ${serviceId}: ${response.status}`);
          }

          const data = await response.json();
          if (!data.success) {
            throw new Error(data.error || `Failed to fetch service ${serviceId}`);
          }

          // Add booking count for display (how many times this service was booked)
          const bookingCount = authUser.bookedServiceIds.filter(
            (id) => id === serviceId
          ).length;

          return { ...data.data, bookingCount };
        });

        const services = await Promise.all(servicePromises);
        setBookedServices(services);
      } catch (err) {
        setError(err.message || "Failed to load booked services.");
        console.error("Fetch Booked Services Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookedServices();
  }, [authUser]);

  if (loading) {
    return <div className="text-center text-gray-600">Loading booked services...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <table className="w-full text-left border-collapse text-sm sm:text-base">
      <thead>
        <tr className="bg-gray-100">
          <th className="py-2 sm:py-4 px-3 sm:px-6 font-semibold text-gray-700">Service Name</th>
          <th className="py-2 sm:py-4 px-3 sm:px-6 font-semibold text-gray-700">Price</th>
          <th className="py-2 sm:py-4 px-3 sm:px-6 font-semibold text-gray-700">Availability</th>
          <th className="py-2 sm:py-4 px-3 sm:px-6 font-semibold text-gray-700">Times Booked</th>
        </tr>
      </thead>
      <tbody>
        {bookedServices.length > 0 ? (
          bookedServices.map((service, index) => (
            <tr
              key={service._id}
              className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <td className="py-2 sm:py-4 px-3 sm:px-6 text-gray-800">{service.name}</td>
              <td className="py-2 sm:py-4 px-3 sm:px-6 text-gray-800">
                {service.price ? `$${service.price}` : "N/A"}
              </td>
              <td className="py-2 sm:py-4 px-3 sm:px-6 text-gray-800">{service.availability}</td>
              <td className="py-2 sm:py-4 px-3 sm:px-6 text-gray-800">{service.bookingCount}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="py-4 text-center text-gray-600">
              No bookings found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};


const UserProfile = () => {
  const [authUser, setAuthUser, logout, , loading] = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("my-profile");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");

  // Fetch user profile when "Edit Profile" is selected
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

          setFormData({
            firstName: data.data.firstName || "",
            lastName: data.data.lastName || "",
            email: data.data.email || "",
            phoneNumber: data.data.phoneNumber || "",
          });
        } catch (err) {
          setError("Failed to load profile: " + err.message);
          console.error("Fetch Profile Error:", err);
        }
      };
      fetchProfile();
    }
  }, [activeSection, authUser._id]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !authUser) {
      navigate("/login");
    }
  }, [loading, authUser, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch(
        `https://bookmyservice.onrender.com/api/user/update-profile/${authUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to update profile");

      setAuthUser(data.data);
      alert("Profile updated successfully!");
      setActiveSection("my-profile");
    } catch (err) {
      setError("Failed to update profile: " + err.message);
      console.error("Update Profile Error:", err);
    }
  };
  const handleback = () => {
    navigate("/")
  }
  const menuItems = [
    {
      id: "my-profile",
      label: "My Profile",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      id: "my-bookings",
      label: "My Bookings",
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      id: "edit-profile",
      label: "Edit Profile",
      color: "bg-teal-500 hover:bg-teal-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
  {/* Mobile Menu Button - For smaller screens */}
  <div className="md:hidden flex justify-between items-center p-4 bg-white shadow-md">
    <button
      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      className="text-orange-500 focus:outline-none"
    >
      {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
    <div className="flex items-center space-x-2">
      <h1 className="text-xl text font-bold text-orange-500">User Profile</h1>
    </div>
      <IoArrowBackCircle className="text-orange-500" size={24} onClick={handleback} /> {/* Better suited icon */}
  </div>

      {/* Sidebar - Similar to Navbar's mobile menu */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center justify-between mb-6 p-2">
      <IoArrowBackCircle className="text-orange-500" size={24} onClick={handleback} /> {/* Better suited icon */}
      <h2 className="text-xl font-bold text-orange-500">User Dashboard </h2>
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
                  activeSection === item.id ? "ring-2 ring-offset-2 ring-orange-500" : ""
                }`}
              >
                {item.label}
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
        <h1 className="text-2xl md:text-3xl font-bold text-orange-500 mb-6">
          {activeSection === "my-profile" && "My Profile"}
          {activeSection === "my-bookings" && "My Bookings"}
          {activeSection === "edit-profile" && "Edit Profile"}
        </h1>

        {activeSection === "my-profile" && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl md:text-2xl font-bold text-orange-500 mb-6 text-center">
              My Profile
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <th className="py-4 px-6 font-semibold text-gray-700 bg-gray-100 w-1/3">
                      First Name
                    </th>
                    <td className="py-4 px-6 text-gray-800">
                      {authUser.firstName}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <th className="py-4 px-6 font-semibold text-gray-700 bg-gray-100 w-1/3">
                      Last Name
                    </th>
                    <td className="py-4 px-6 text-gray-800">
                      {authUser.lastName}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <th className="py-4 px-6 font-semibold text-gray-700 bg-gray-100 w-1/3">
                      Email
                    </th>
                    <td className="py-4 px-6 text-gray-800">
                      {authUser.email}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <th className="py-4 px-6 font-semibold text-gray-700 bg-gray-100 w-1/3">
                      Phone Number
                    </th>
                    <td className="py-4 px-6 text-gray-800">
                      {authUser.phoneNumber || "Not provided"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeSection === "my-bookings" && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl md:text-2xl font-bold text-orange-500 mb-6 text-center">
              Booked Services
            </h2>
            <div className="overflow-x-auto">
              <MyBookings />
            </div>
          </div>
        )}

        {activeSection === "edit-profile" && (
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-orange-500 mb-6 text-center">
              Edit Profile
            </h2>
            {error && (
              <div className="mb-4 text-red-500 text-center">{error}</div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
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

export default UserProfile;