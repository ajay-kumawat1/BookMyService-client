import { useState } from "react";
import { Menu, X, User } from "lucide-react"; // Import User icon
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider"; // Import useAuth hook

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [authUser] = useAuth(); // Get authenticated user from context

  const handleGetInTouch = () => {
    navigate("/contact");
  };

  const handleProfileClick = () => {
    // Redirect to the appropriate profile page based on the user's role
    if (authUser) {
      navigate(authUser.role === "Service Provider" ? "/business-profile" : "/user-profile");
    }
  };

  return (
    <nav className="flex justify-between items-center p-4 shadow-md bg-white px-6 md:px-20 relative">
      {/* Logo */}
      <div className="text-xl font-bold text-[#ef830f]">BookMyService</div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-6 text-[#6d6d6d]">
        <li>
          <Link to="/" className="hover:text-[#ef830f]">
            Home
          </Link>
        </li>
        <li>
          <Link to="/services" className="hover:text-[#ef830f]">
            Services
          </Link>
        </li>
        <li>
          <Link to="/portfolio" className="hover:text-[#ef830f]">
            Portfolio
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-[#ef830f]">
            Contact
          </Link>
        </li>
      </ul>

      {/* Desktop Buttons */}
      <div className="hidden md:flex space-x-4 items-center">
        {authUser ? (
          // Display profile icon if user is logged in
          <button
            onClick={handleProfileClick}
            className="text-[#ef830f] hover:text-[#e56f00]"
          >
            <User size={28} />
          </button>
        ) : (
          // Display login button if user is not logged in
          <Link
            to="/login"
            className="bg-transparent border border-[#ef830f] text-[#ef830f] px-4 py-2 rounded-lg hover:bg-[#ef830f] hover:text-white"
          >
            Login
          </Link>
        )}
        <button
          onClick={handleGetInTouch}
          className="bg-[#ef830f] text-white px-4 py-2 rounded-lg hover:bg-[#e56f00]"
        >
          Get in Touch
        </button>
      </div>

      {/* Mobile Menu Icon */}
      <button
        className="md:hidden text-[#ef830f]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md z-10 md:hidden">
          <ul className="flex flex-col items-center space-y-4 py-4 text-[#6d6d6d]">
            <li>
              <Link
                to="/"
                className="hover:text-[#ef830f]"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="hover:text-[#ef830f]"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-[#ef830f]"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </li>
            {authUser ? (
              // Display profile icon if user is logged in
              <li>
                <button
                  onClick={() => {
                    handleProfileClick();
                    setIsOpen(false);
                  }}
                  className="hover:text-[#ef830f]"
                >
                  <User size={28} />
                </button>
              </li>
            ) : (
              // Display login button if user is not logged in
              <li>
                <Link
                  to="/login"
                  className="hover:text-[#000] bg-[#ef830f] text-white px-4 py-2 rounded-lg hover:bg-[#e56f00]"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              </li>
            )}
            <button
              onClick={handleGetInTouch}
              className="bg-[#ef830f] text-white px-4 py-2 rounded-lg hover:bg-[#e56f00]"
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