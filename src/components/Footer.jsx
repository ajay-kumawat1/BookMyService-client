// import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaEnvelope } from "react-icons/fa";

// const Footer = () => {
//   return (
//     <footer className="bg-black text-white py-12">
//       <div className="container mx-auto px-6 md:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12 text-center md:text-left">
//         {/* Company Branding */}
//         <div className="flex flex-col items-center md:items-start">
//           <h2 className="text-3xl font-bold text-orange-500">BookMyService</h2>
//           <p className="mt-4 text-sm text-gray-400">The heart of seamless services</p>
//           <div className="flex justify-center md:justify-start mt-6 space-x-4">
//             {[FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaEnvelope, FaLinkedin].map((Icon, index) => (
//               <a key={index} href="#" className="text-gray-400 hover:text-orange-400 transition duration-300">
//                 <Icon size={24} />
//               </a>
//             ))}
//           </div>
//         </div>

//         {/* More Links */}
//         <div className="flex flex-col items-center md:items-start">
//           <h3 className="text-lg font-semibold mb-3 text-white">Quick Links</h3>
//           <ul className="space-y-2 text-gray-400">
//             {["Home", "Services", "About", "Contact"].map((link, index) => (
//               <li key={index} className="cursor-pointer hover:text-orange-400 transition duration-300">
//                 {link}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* About & Policies */}
//         <div className="flex flex-col items-center md:items-start">
//           <h3 className="text-lg font-semibold mb-3 text-white">About Us</h3>
//           <ul className="space-y-2 text-gray-400">
//             {["Partner with us", "Jobs", "Terms & Conditions", "Cookie Policy", "Privacy Policy", "Editorial Policy", "Masthead"].map((link, index) => (
//               <li key={index} className="cursor-pointer hover:text-orange-400 transition duration-300">
//                 {link}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* Bottom Bar */}
//       <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
//         © {new Date().getFullYear()} <span className="font-semibold text-white">BookMyService</span>. Made with ❤️ in India.
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-6 md:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12 text-center md:text-left">
        {/* Company Branding */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-3xl font-bold text-orange-500">BookMyService</h2>
          <p className="mt-4 text-sm text-gray-400">The heart of seamless services</p>
          <div className="flex justify-center md:justify-start mt-6 space-x-4">
            {[
              { Icon: FaFacebook, href: "https://facebook.com" },
              { Icon: FaInstagram, href: "https://instagram.com" },
              { Icon: FaTwitter, href: "https://twitter.com" },
              { Icon: FaYoutube, href: "https://youtube.com" },
              { Icon: FaEnvelope, href: "mailto:support@bookmyservice.com" },
              { Icon: FaLinkedin, href: "https://linkedin.com" },
            ].map(({ Icon, href }, index) => (
              <a
                key={index}
                href={href}
                className="text-gray-400 hover:text-orange-400 transition duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon size={24} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold mb-3 text-white">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            {[
              { label: "Home", to: "/" },
              { label: "Services", to: "/services" },
              { label: "Portfolio", to: "/portfolio" },
              { label: "Contact", to: "/contact" },
            ].map(({ label, to }, index) => (
              <li key={index}>
                <Link
                  to={to}
                  className="cursor-pointer hover:text-orange-400 transition duration-300"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* About & Policies */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold mb-3 text-white">About Us</h3>
          <ul className="space-y-2 text-gray-400">
            {[
              { label: "Partner with us", to: "/partner" },
              { label: "Jobs", to: "/jobs" },
              { label: "Terms & Conditions", to: "/terms-and-conditions" },
              { label: "Cookie Policy", to: "/cookie-policy" },
              { label: "Privacy Policy", to: "/privacy-policy" },
              { label: "Editorial Policy", to: "/editorial-policy" },
              { label: "Masthead", to: "/masthead" },
            ].map(({ label, to }, index) => (
              <li key={index}>
                <Link
                  to={to}
                  className="cursor-pointer hover:text-orange-400 transition duration-300"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} <span className="font-semibold text-white">BookMyService</span>. Made with ❤️ in India.
      </div>
    </footer>
  );
};

export default Footer;