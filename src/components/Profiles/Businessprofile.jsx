import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import ServicesTable from "../ServicesTable";

const BusinessProfile = () => {
  const [authUser, setAuthUser, logout, , loading] = useAuth(); // Added loading
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("my-profile");
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
  });
  const [error, setError] = useState("");
  const [editingService, setEditingService] = useState(null); // Track service being edited
  // Fetch profile data when "Edit Profile" is selected
  useEffect(() => {
    if (activeSection === "edit-profile") {
      const fetchProfile = async () => {
        try {
          const response = await fetch(
            `https://bookmyservice.onrender.com/api/business-owner/${authUser._id}`,
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
    } else {
      setServiceData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://bookmyservice.onrender.com/api/service/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
        body: JSON.stringify(serviceData),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to create service");

      alert("Service created successfully!");
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
      alert("Failed to add service: " + err.message);
    }
  };
  const handleEditService = (service) => {
    setEditingService(service);
    setServiceData(service); // Pre-fill form with existing service data
  };
  const handleUpdateService = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://bookmyservice.onrender.com/api/service/update/${editingService._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          credentials: "include",
          body: JSON.stringify(serviceData),
        }
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to update service");

      alert("Service updated successfully!");
      setEditingService(null); // Clear editing mode
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
      // Optionally refetch services here if ServicesTable doesn't auto-update
    } catch (err) {
      console.error("Update Service Error:", err);
      alert("Failed to update service: " + err.message);
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch(
        `https://bookmyservice.onrender.com/api/business-owner/${authUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          credentials: "include",
          body: JSON.stringify(profileData),
        }
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to update profile");

      setAuthUser(data.data); // Update context
      alert("Profile updated successfully!");
      setActiveSection("my-profile"); // Switch back to "My Profile"
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
    // {
    //   id: "edit-service",
    //   label: "Edit Service",
    //   color: "bg-indigo-500 hover:bg-indigo-600",
    // },
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
          Business Dashboard
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
          Business Profile
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
                      {authUser.ownerFirstName}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <th className="py-4 px-6 text-sm font-semibold text-gray-700 bg-gray-100 w-1/3">
                      Last Name
                    </th>
                    <td className="py-4 px-6 text-gray-800">
                      {authUser.ownerLastName}
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
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <th className="py-4 px-6 text-sm font-semibold text-gray-700 bg-gray-100 w-1/3">
                      Business Name
                    </th>
                    <td className="py-4 px-6 text-gray-800">
                      {authUser.businessName}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <th className="py-4 px-6 text-sm font-semibold text-gray-700 bg-gray-100 w-1/3">
                      Category
                    </th>
                    <td className="py-4 px-6 text-gray-800">
                      {authUser.businessCategory}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <th className="py-4 px-6 text-sm font-semibold text-gray-700 bg-gray-100 w-1/3">
                      Address
                    </th>
                    <td className="py-4 px-6 text-gray-800">
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
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Add New Service</h2>
            <form onSubmit={handleServiceSubmit} className="space-y-4">
              <div>
                <label className="block font-medium">Service Name</label>
                <input
                  type="text"
                  name="name"
                  value={serviceData.name}
                  onChange={handleServiceChange}
                  required
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block font-medium">Category</label>
                <input
                  type="text"
                  name="category"
                  value={serviceData.category}
                  onChange={handleServiceChange}
                  required
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block font-medium">Description</label>
                <textarea
                  name="description"
                  value={serviceData.description}
                  onChange={handleServiceChange}
                  required
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block font-medium">Price (Optional)</label>
                <input
                  type="number"
                  name="price"
                  value={serviceData.price}
                  onChange={handleServiceChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block font-medium">Availability</label>
                <input
                  type="text"
                  name="availability"
                  value={serviceData.availability}
                  onChange={handleServiceChange}
                  required
                  placeholder="e.g., Monday - Friday, 9 AM - 5 PM"
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block font-medium">Location</label>
                {["on-site", "online", "customer_location"].map((loc) => (
                  <label key={loc} className="flex items-center space-x-2">
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
              <div>
                <label className="block font-medium">
                  Duration (Minutes, Optional)
                </label>
                <input
                  type="number"
                  name="duration"
                  value={serviceData.duration}
                  onChange={handleServiceChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block font-medium">Booking Type</label>
                {["instant", "appointment"].map((type) => (
                  <label key={type} className="flex items-center space-x-2">
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
              <div>
                <label className="block font-medium">Payment Options</label>
                {["cash", "online", "card"].map((option) => (
                  <label key={option} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="payment_options"
                      value={option}
                      checked={serviceData.payment_options.includes(option)}
                      onChange={handleServiceChange}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              <button
                type="submit"
                className="w-full p-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                Add Service
              </button>
            </form>
          </div>
        )}

        {activeSection === "my-services" && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-orange-500 mb-6 text-center">
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
                    <label className="block font-medium">Service Name</label>
                    <input
                      type="text"
                      name="name"
                      value={serviceData.name}
                      onChange={handleServiceChange}
                      required
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-medium">Category</label>
                    <input
                      type="text"
                      name="category"
                      value={serviceData.category}
                      onChange={handleServiceChange}
                      required
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-medium">Description</label>
                    <textarea
                      name="description"
                      value={serviceData.description}
                      onChange={handleServiceChange}
                      required
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-medium">
                      Price (Optional)
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={serviceData.price}
                      onChange={handleServiceChange}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-medium">Availability</label>
                    <input
                      type="text"
                      name="availability"
                      value={serviceData.availability}
                      onChange={handleServiceChange}
                      required
                      placeholder="e.g., Monday - Friday, 9 AM - 5 PM"
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-medium">Location</label>
                    {["on-site", "online", "customer_location"].map((loc) => (
                      <label key={loc} className="flex items-center space-x-2">
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
                  <div>
                    <label className="block font-medium">
                      Duration (Minutes, Optional)
                    </label>
                    <input
                      type="number"
                      name="duration"
                      value={serviceData.duration}
                      onChange={handleServiceChange}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-medium">Booking Type</label>
                    {["instant", "appointment"].map((type) => (
                      <label key={type} className="flex items-center space-x-2">
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
                  <div>
                    <label className="block font-medium">Payment Options</label>
                    {["cash", "online", "card"].map((option) => (
                      <label
                        key={option}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          name="payment_options"
                          value={option}
                          checked={serviceData.payment_options.includes(option)}
                          onChange={handleServiceChange}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className="w-full p-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                    >
                      Update Service
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingService(null)}
                      className="w-full p-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {activeSection === "revenue-statistics" && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Revenue Statistics</h2>
            <p>Content for revenue statistics goes here.</p>
          </div>
        )}

        {/* {activeSection === "edit-service" && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Edit Service</h2>
            <p>Content for editing services goes here.</p>
          </div>
        )} */}

        {activeSection === "edit-profile" && (
          <div className="bg-white rounded-xl shadow-xl p-8 max-w-xl mx-auto transform transition-all hover:shadow-2xl duration-300">
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Edit Profile
            </h2>
            {error && (
              <div className="mb-6 text-red-500 text-center font-medium">
                {error}
              </div>
            )}
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
                  <span className="pl-3 text-gray-500">
                    <svg
                      className="w-5 h-5"
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
                    className="w-full p-3 border-0 focus:outline-none focus:ring-0"
                    placeholder="Enter your first name"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
                  <span className="pl-3 text-gray-500">
                    <svg
                      className="w-5 h-5"
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
                    className="w-full p-3 border-0 focus:outline-none focus:ring-0"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
                  <span className="pl-3 text-gray-500">
                    <svg
                      className="w-5 h-5"
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
                    className="w-full p-3 border-0 focus:outline-none focus:ring-0"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
                  <span className="pl-3 text-gray-500">
                    <svg
                      className="w-5 h-5"
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
                    className="w-full p-3 border-0 focus:outline-none focus:ring-0"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Name
                </label>
                <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
                  <span className="pl-3 text-gray-500">
                    <svg
                      className="w-5 h-5"
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
                    className="w-full p-3 border-0 focus:outline-none focus:ring-0"
                    placeholder="Enter your business name"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Category
                </label>
                <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
                  <span className="pl-3 text-gray-500">
                    <svg
                      className="w-5 h-5"
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
                    className="w-full p-3 border-0 focus:outline-none focus:ring-0"
                    placeholder="Enter business category"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Address
                </label>
                <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
                  <span className="pl-3 text-gray-500">
                    <svg
                      className="w-5 h-5"
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
                    className="w-full p-3 border-0 focus:outline-none focus:ring-0"
                    placeholder="Enter business address"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
                  <span className="pl-3 text-gray-500">
                    <svg
                      className="w-5 h-5"
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
                    className="w-full p-3 border-0 focus:outline-none focus:ring-0"
                    placeholder="Enter city"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
                  <span className="pl-3 text-gray-500">
                    <svg
                      className="w-5 h-5"
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
                    className="w-full p-3 border-0 focus:outline-none focus:ring-0"
                    placeholder="Enter state"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Zip Code
                </label>
                <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
                  <span className="pl-3 text-gray-500">
                    <svg
                      className="w-5 h-5"
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
                    className="w-full p-3 border-0 focus:outline-none focus:ring-0"
                    placeholder="Enter zip code"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
                  <span className="pl-3 text-gray-500">
                    <svg
                      className="w-5 h-5"
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
                    className="w-full p-3 border-0 focus:outline-none focus:ring-0"
                    placeholder="Enter country"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full p-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold shadow-md hover:shadow-lg"
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

export default BusinessProfile;
