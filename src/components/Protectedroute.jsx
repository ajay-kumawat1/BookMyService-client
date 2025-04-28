
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { ClipLoader } from "react-spinners";

const ProtectedRoute = () => {
  const [authUser, , , , loading] = useAuth(); // Get the authenticated user and loading state from context

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader size={40} color="#f97316" />
      </div>
    );
  }

  // If user is not authenticated, redirect to login page
  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;