import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold text-orange-500">MyCompany</h2>
          <p className="mt-2 text-sm">
            Empowering businesses and users with seamless services.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
          <ul>
            <li className="hover:text-orange-400 cursor-pointer">Home</li>
            <li className="hover:text-orange-400 cursor-pointer">Services</li>
            <li className="hover:text-orange-400 cursor-pointer">About Us</li>
            <li className="hover:text-orange-400 cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
          <p>Email: support@mycompany.com</p>
          <p>Phone: +91 9876543210</p>

          <div className="flex mt-4 space-x-4">
            <a href="#" className="hover:text-orange-400">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="hover:text-orange-400">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="hover:text-orange-400">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="hover:text-orange-400">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        © {new Date().getFullYear()} MyCompany. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
