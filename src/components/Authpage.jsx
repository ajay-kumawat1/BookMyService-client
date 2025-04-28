import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { showSuccessToast, showErrorToast } from "../utils/toast";

const Authpage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    role: "User", // Default to User
    otp: "",
    businessName: "", // Added for BusinessOwner
    businessCategory: "", // Added for BusinessOwner
    businessAddress: "", // Added for BusinessOwner
    city: "", // Added for BusinessOwner
    state: "", // Added for BusinessOwner
    zipCode: "", // Added for BusinessOwner
    country: "", // Added for BusinessOwner
  });
  const [verificationSent, setVerificationSent] = useState(false);
  const [error, setError] = useState("");
  const [, setAuthUser] = useAuth();
  // const BACKEND_URL = "https://bookmyservice.onrender.com";
  const BACKEND_URL = "https://bookmyservice.onrender.com";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (verificationSent) {
        const endpoint =
          formData.role === "Owner"
            ? "/api/auth/verifyAndCreateBusinessOwner"
            : "/api/auth/verifyAndCreateUser";
        console.log("Sending OTP for verification:", formData.otp);
        const response = await fetch(`${BACKEND_URL}${endpoint}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ otp: formData.otp }),
        });

        const data = await response.json();
        console.log("OTP Verification Response:", data);

        if (!response.ok)
          throw new Error(data.message || "OTP verification failed");

        const token = data.data?.token || data.token;
        if (!token) throw new Error("No token received from server");

        const userData =
          data.data?.businessOwner || data.data?.user || data.user;
        setAuthUser(userData);
        localStorage.setItem("token", token);

        showSuccessToast("Account verified successfully!");

        navigate(
          userData.role === "Owner" ? "/business-profile" : "/"
        );
      } else if (isLogin) {
        const endpoint =
          formData.role === "Owner"
            ? "/api/auth/businessOwnerLogin"
            : "/api/auth/login";
        const payload = { email: formData.email, password: formData.password };
        console.log("Login Payload:", payload);

        const response = await fetch(`${BACKEND_URL}${endpoint}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        console.log("Login Response:", data);

        if (!response.ok) throw new Error(data.message || "Login failed");

        const token = data.data?.token || data.token;
        if (!token) throw new Error("No token received from server");

        const userData =
          data.data?.businessOwner || data.data?.user || data.user;
        setAuthUser(userData);
        localStorage.setItem("token", token);

        showSuccessToast(`Welcome back, ${userData.firstName || userData.ownerFirstName || 'User'}!`);

        navigate(
          userData.role === "Owner" ? "/business-profile" : "/"
        );
      } else {
        const endpoint =
          formData.role === "Owner"
            ? "/api/auth/registerBusinessOwner"
            : "/api/auth/register";
        const payload =
          formData.role === "Owner"
            ? {
                email: formData.email,
                password: formData.password,
                phoneNumber: formData.phoneNumber,
                ownerFirstName: formData.firstName,
                ownerLastName: formData.lastName,
                businessName: formData.businessName,
                businessCategory: formData.businessCategory,
                businessAddress: formData.businessAddress,
                city: formData.city,
                state: formData.state,
                zipCode: formData.zipCode,
                country: formData.country,
              }
            : {
                email: formData.email,
                password: formData.password,
                phoneNumber: formData.phoneNumber,
                firstName: formData.firstName,
                lastName: formData.lastName,
              };

        const response = await fetch(`${BACKEND_URL}${endpoint}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        console.log("Registration Response:", data);

        if (!response.ok)
          throw new Error(data.message || "Registration failed");

        showSuccessToast("Registration successful! Please verify your email with the OTP sent to your email address.");
        setVerificationSent(true);
      }
    } catch (err) {
      setError(err.message);
      showErrorToast(err.message || "An error occurred");
      console.error("Auth Error:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-orange-500 mb-6">
          {verificationSent ? "Verify OTP" : isLogin ? "Login" : "Register"}
        </h2>
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          {!verificationSent && (
            <div className="mb-4">
              <label className="block text-gray-700">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring focus:ring-orange-300"
              >
                <option value="User">User</option>
                <option value="Owner">Business Owner</option>
              </select>
            </div>
          )}

          {verificationSent ? (
            <div className="mb-4">
              <label className="block text-gray-700">Enter OTP</label>
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:ring focus:ring-orange-300"
              />
            </div>
          ) : !isLogin ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="p-3 border rounded-lg focus:ring focus:ring-orange-300"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="p-3 border rounded-lg focus:ring focus:ring-orange-300"
                />
              </div>
              <div className="flex flex-col md:col-span-2">
                <label className="text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="p-3 border rounded-lg focus:ring focus:ring-orange-300"
                />
              </div>
              {formData.role === "Owner" && (
                <>
                  <div className="flex flex-col md:col-span-2">
                    <label className="text-gray-700">Business Name</label>
                    <input
                      type="text"
                      name="businessName"
                      placeholder="Business Name"
                      value={formData.businessName}
                      onChange={handleChange}
                      required
                      className="p-3 border rounded-lg focus:ring focus:ring-orange-300"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-700">Business Category</label>
                    <input
                      type="text"
                      name="businessCategory"
                      placeholder="Business Category"
                      value={formData.businessCategory}
                      onChange={handleChange}
                      required
                      className="p-3 border rounded-lg focus:ring focus:ring-orange-300"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-700">Business Address</label>
                    <input
                      type="text"
                      name="businessAddress"
                      placeholder="Business Address"
                      value={formData.businessAddress}
                      onChange={handleChange}
                      required
                      className="p-3 border rounded-lg focus:ring focus:ring-orange-300"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="text-gray-700">City</label>
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="p-3 border rounded-lg focus:ring focus:ring-orange-300"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-gray-700">State</label>
                      <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className="p-3 border rounded-lg focus:ring focus:ring-orange-300"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-gray-700">Zip Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        placeholder="Zip Code"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                        className="p-3 border rounded-lg focus:ring focus:ring-orange-300"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-gray-700">Country</label>
                      <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        className="p-3 border rounded-lg focus:ring focus:ring-orange-300"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : null}

          {!verificationSent && (
            <>
              <div className="flex flex-col">
                <label className="text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg focus:ring focus:ring-orange-300"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg focus:ring focus:ring-orange-300"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 transition"
          >
            {verificationSent ? "Verify OTP" : isLogin ? "Login" : "Register"}
          </button>

          {!verificationSent && (
            <p
              className="mt-4 text-center text-blue-500 cursor-pointer"
              onClick={() => {
                setIsLogin(!isLogin);
                setVerificationSent(false);
                setError("");
              }}
            >
              {isLogin ? "Need an account? Register" : "Have an account? Login"}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Authpage;
