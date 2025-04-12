// export default UserProfile;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import BookedServicesTable from "../BookedservicesTable";


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
            `https://bookmyservice.onrender.com/api/user/${authUser._id}`,
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
        `https://bookmyservice.onrender.com/api/user/${authUser._id}`,
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
      {/* Hamburger Menu Button */}
      <button
        className="md:hidden p-4 bg-orange-500 text-white fixed top-0 left-0 z-50"
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
      <div
        className={`fixed md:static top-0 left-0 h-full bg-white shadow-lg p-4 sm:p-6 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 z-40 w-64 md:w-1/4 lg:w-1/4 xl:w-3/12 overflow-y-auto`}
      >
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-orange-500">
            User Dashboard
          </h2>
          <button
            className="md:hidden text-gray-500"
            onClick={() => setIsSidebarOpen(false)}
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
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <nav className="space-y-2 sm:space-y-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                setIsSidebarOpen(false);
              }}
              className={`w-full p-2 sm:p-3 text-white text-left rounded-lg text-sm sm:text-base ${
                item.color
              } ${
                activeSection === item.id
                  ? "ring-2 ring-offset-2 ring-orange-500"
                  : ""
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="w-full p-2 sm:p-3 bg-red-500 text-white text-left rounded-lg hover:bg-red-600 text-sm sm:text-base"
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={`w-full md:w-3/4 lg:w-3/4 xl:w-9/12 p-4 sm:p-6 mt-14 md:mt-0 overflow-y-auto h-screen transition-all duration-300 ${
          isSidebarOpen ? "opacity-50 md:opacity-100" : ""
        }`}
      >
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-500 mb-4 sm:mb-6">
          User Profile
        </h1>

        {activeSection === "my-profile" && (
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-orange-500 mb-4 sm:mb-6 text-center">
              My Profile
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm sm:text-base">
                <tbody>
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <th className="py-2 sm:py-4 px-3 sm:px-6 font-semibold text-gray-700 bg-gray-100 w-1/3">
                      First Name
                    </th>
                    <td className="py-2 sm:py-4 px-3 sm:px-6 text-gray-800">
                      {authUser.firstName}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <th className="py-2 sm:py-4 px-3 sm:px-6 font-semibold text-gray-700 bg-gray-100 w-1/3">
                      Last Name
                    </th>
                    <td className="py-2 sm:py-4 px-3 sm:px-6 text-gray-800">
                      {authUser.lastName}
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
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeSection === "my-bookings" && (
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-orange-500 mb-4 sm:mb-6 text-center">
              Booked Services
            </h2>
            <div className="overflow-x-auto">
              <BookedServicesTable
                authUser={authUser}
                setAuthUser={setAuthUser}
              />
            </div>
          </div>
        )}

        {activeSection === "edit-profile" && (
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 max-w-lg mx-auto">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-orange-500 mb-4 sm:mb-6 text-center">
              Edit Profile
            </h2>
            {error && (
              <div className="mb-4 text-red-500 text-center text-sm sm:text-base">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium text-sm sm:text-base text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block font-medium text-sm sm:text-base text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block font-medium text-sm sm:text-base text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block font-medium text-sm sm:text-base text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base"
                />
              </div>
              <button
                type="submit"
                className="w-full p-2 sm:p-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm sm:text-base"
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