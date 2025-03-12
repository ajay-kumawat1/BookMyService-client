import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import BookedServicesTable from "../BookedservicesTable";

const UserProfile = () => {
  const [authUser, setAuthUser, logout] = useAuth(); // Destructure setAuthUser for updating context
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("my-profile");
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
            `http://localhost:5000/api/user/${authUser._id}`,
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
        `http://localhost:5000/api/user/${authUser._id}`,
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

      setAuthUser(data.data); // Update context with new user data
      alert("Profile updated successfully!");
      setActiveSection("my-profile"); // Switch back to "My Profile" after update
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
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar Menu - Fixed, No Scroll */}
      <div className="w-1/4 bg-white shadow-lg p-6 h-screen overflow-hidden">
        <h2 className="text-2xl font-bold text-orange-500 mb-6">
          User Dashboard
        </h2>
        <nav className="space-y-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full p-3 text-white text-left rounded-lg ${
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
            className="w-full p-3 bg-red-500 text-white text-left rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content - Scrollable */}
      <div className="w-3/4 p-6 overflow-y-auto h-screen">
        <h1 className="text-3xl font-bold text-orange-500 mb-6">
          User Profile
        </h1>

        {activeSection === "my-profile" && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-orange-500 mb-6 text-center">
              My Profile
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <th className="py-4 px-6 text-sm font-semibold text-gray-700 bg-gray-100 w-1/3">
                      First Name
                    </th>
                    <td className="py-4 px-6 text-gray-800">
                      {authUser.firstName}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <th className="py-4 px-6 text-sm font-semibold text-gray-700 bg-gray-100 w-1/3">
                      Last Name
                    </th>
                    <td className="py-4 px-6 text-gray-800">
                      {authUser.lastName}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <th className="py-4 px-6 text-sm font-semibold text-gray-700 bg-gray-100 w-1/3">
                      Email
                    </th>
                    <td className="py-4 px-6 text-gray-800">
                      {authUser.email}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <th className="py-4 px-6 text-sm font-semibold text-gray-700 bg-gray-100 w-1/3">
                      Phone Number
                    </th>
                    <td className="py-4 px-6 text-gray-800">
                      {authUser.phoneNumber}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeSection === "my-bookings" && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-orange-500 mb-6 text-center">
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
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-orange-500 mb-6 text-center">
              Edit Profile
            </h2>
            {error && (
              <div className="mb-4 text-red-500 text-center">{error}</div>
            )}
            <form
              onSubmit={handleSubmit}
              className="space-y-4 max-w-lg mx-auto"
            >
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
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
