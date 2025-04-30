import { useState } from "react";
import { Menu, X, User, Calendar, LogOut } from "lucide-react"; // Import icons
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider"; // Import useAuth hook

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [authUser, , logout] = useAuth(); // Get authenticated user and logout function from context

  const handleGetInTouch = () => {
    navigate("/contact");
  };

  const handleProfileClick = () => {
    // Redirect to the appropriate profile page based on the user's role
    if (authUser) {
      console.log("Profile click - User role:", authUser.role);
      if (authUser.role === "Owner" || authUser.role === "SuperAdmin") {
        navigate("/business-profile");
      } else {
        navigate("/user-profile");
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setDropdownOpen(false);
  };

  return (
    <nav className="flex justify-between items-center p-4 shadow-md bg-white px-6 md:px-20 relative">
      {/* Logo */}
      <div className="text-xl font-bold text-[#ef830f]">
        <img className="h-12 w-auto" src="/images/BookMyService.png" alt="BookMyService Logo" />
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-8 text-[#6d6d6d] items-center">
        <li>
          <Link to="/" className="hover:text-[#ef830f] font-medium">
            Home
          </Link>
        </li>
        <li>
          <Link to="/services" className="hover:text-[#ef830f] font-medium">
            Services
          </Link>
        </li>
        <li>
          <Link to="/portfolio" className="hover:text-[#ef830f] font-medium">
            Portfolio
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-[#ef830f] font-medium">
            Contact
          </Link>
        </li>
      </ul>

      {/* Desktop Buttons */}
      <div className="hidden md:flex items-center space-x-6">
        {authUser ? (
          // User is logged in - show profile dropdown
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-[#ef830f] hover:text-[#e56f00] flex items-center"
            >
              <User size={20} />
              <span className="ml-2 font-medium">{authUser.firstName || 'Profile'}</span>
            </button>

            {/* Profile Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                <button
                  onClick={handleProfileClick}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <User className="inline-block mr-2" size={16} />
                  My Profile
                </button>

                <Link
                  to="/my-bookings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  <Calendar className="inline-block mr-2" size={16} />
                  My Bookings
                </Link>

                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  <LogOut className="inline-block mr-2" size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          // Display login button if user is not logged in
          <Link
            to="/login"
            className="bg-transparent border-2 border-[#ef830f] text-[#ef830f] px-6 py-2 rounded-lg hover:bg-[#ef830f] hover:text-white transition duration-300 font-medium"
          >
            Login
          </Link>
        )}
        <button
          onClick={handleGetInTouch}
          className="bg-[#ef830f] text-white px-6 py-2 rounded-lg hover:bg-[#e56f00] transition duration-300 font-medium"
        >
          Get in Touch
        </button>
      </div>

      {/* Mobile Menu Icon */}
      <button
        className="md:hidden text-[#ef830f]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md z-10 md:hidden">
          <ul className="flex flex-col items-center space-y-4 py-4 text-[#6d6d6d]">
            <li>
              <Link
                to="/"
                className="hover:text-[#ef830f] font-medium"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="hover:text-[#ef830f] font-medium"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/portfolio"
                className="hover:text-[#ef830f] font-medium"
                onClick={() => setIsOpen(false)}
              >
                Portfolio
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-[#ef830f] font-medium"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </li>
            {authUser ? (
              // User is logged in - show profile options
              <>
                <li>
                  <button
                    onClick={() => {
                      handleProfileClick();
                      setIsOpen(false);
                    }}
                    className="flex items-center hover:text-[#ef830f] font-medium"
                  >
                    <User size={20} className="mr-2" />
                    My Profile
                  </button>
                </li>
                <li>
                  <Link
                    to="/my-bookings"
                    className="flex items-center hover:text-[#ef830f] font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    <Calendar size={20} className="mr-2" />
                    My Bookings
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="flex items-center text-red-600 hover:text-red-800 font-medium"
                  >
                    <LogOut size={20} className="mr-2" />
                    Logout
                  </button>
                </li>
              </>
            ) : (
              // Display login button if user is not logged in
              <li>
                <Link
                  to="/login"
                  className="hover:text-[#000] bg-[#ef830f] text-white px-6 py-2 rounded-lg hover:bg-[#e56f00] font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              </li>
            )}
            <button
              onClick={() => {
                handleGetInTouch();
                setIsOpen(false);
              }}
              className="bg-[#ef830f] text-white px-6 py-2 rounded-lg hover:bg-[#e56f00] font-medium"
            >
              Get in Touch
            </button>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;