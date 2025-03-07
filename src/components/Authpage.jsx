import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Authpage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    role: "",
    otp: "",
  });
  const [verificationSent, setVerificationSent] = useState(false);
  const [error, setError] = useState("");
  const [setAuthUser] = useAuth();
  const BACKEND_URL = "http://localhost:5000";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (verificationSent) {
        console.log("Sending OTP for verification:", formData.otp); // Log the OTP being sent
        const response = await fetch(`${BACKEND_URL}/api/auth/verifyAndCreateUser`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ otp: formData.otp }),
        });
      
        const data = await response.json();
        console.log("OTP Verification Response:", data);
      
        if (!response.ok) throw new Error(data.message || "OTP verification failed");
      
        const token = data.data?.token || data.token;
        if (!token) throw new Error("No token received from server");
      
        setAuthUser(data.data || data.user);
        localStorage.setItem("token", token);
        navigate((data.data?.role || data.user?.role) === "BusinessOwner" ? "/business-dashboard" : "/");
      } else if (isLogin) {
        const payload = { email: formData.email, password: formData.password };
        console.log("Login Payload:", payload);

        const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
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

        setAuthUser(data.data?.user || data.user);
        localStorage.setItem("token", token);
        navigate((data.data?.user?.role || data.user?.role) === "BusinessOwner" ? "/business-dashboard" : "/");
      } else {
        const endpoint = formData.role === "BusinessOwner" ? "/api/auth/registerBusinessOwner" : "/api/auth/register";
        const response = await fetch(`${BACKEND_URL}${endpoint}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            phoneNumber: formData.phoneNumber,
            firstName: formData.firstName,
            lastName: formData.lastName,
            ...(formData.role === "BusinessOwner" && {
              ownerFirstName: formData.firstName,
              ownerLastName: formData.lastName,
            }),
          }),
        });

        const data = await response.json();
        console.log("Registration Response:", data);

        if (!response.ok) throw new Error(data.message || "Registration failed");

        setVerificationSent(true);
      }
    } catch (err) {
      setError(err.message);
      console.error("Auth Error:", err);
    }
  };

  return (
<div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-orange-500 mb-6">
          {verificationSent ? "Verify OTP" : isLogin ? "Login" : "Register"}
        </h2>
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        <form onSubmit={handleSubmit}>
          {verificationSent ? (
            <div className="mb-4">
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg"
              />
            </div>
          ) : !isLogin ? (
            <>
              <div className="mb-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="User">User</option>
                  <option value="BusinessOwner">Business Owner</option>
                </select>
              </div>
            </>
          ) : null}

          {!verificationSent && (
            <>
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600"
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
              {isLogin
                ? "Need an account? Register"
                : "Have an account? Login"}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Authpage;