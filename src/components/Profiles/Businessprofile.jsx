import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

const BusinessProfile = () => {
  const [authUser, , logout] = useAuth(); // Destructure logout function
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Business Profile</h1>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="space-y-4">
          <Link
            to="/add-service"
            className="block w-full p-3 bg-blue-500 text-white text-center rounded-lg hover:bg-blue-600"
          >
            Add Service
          </Link>
          <Link
            to="/booked-services"
            className="block w-full p-3 bg-green-500 text-white text-center rounded-lg hover:bg-green-600"
          >
            Booked Services
          </Link>
          <Link
            to="/revenue-statistics"
            className="block w-full p-3 bg-purple-500 text-white text-center rounded-lg hover:bg-purple-600"
          >
            Revenue Statistics
          </Link>
          <Link
            to="/edit-service"
            className="block w-full p-3 bg-yellow-500 text-white text-center rounded-lg hover:bg-yellow-600"
          >
            Edit Service
          </Link>
          <Link
            to="/edit-profile"
            className="block w-full p-3 bg-indigo-500 text-white text-center rounded-lg hover:bg-indigo-600"
          >
            Edit Profile
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full p-3 bg-red-500 text-white text-center rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfile;