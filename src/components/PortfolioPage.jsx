import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion'; // For animations
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthProvider';

const BACKEND_URL = "https://bookmyservice.onrender.com";

const PortfolioPage = () => {
  const [businessOwners, setBusinessOwners] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { authUser } = useAuth();

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const [ownersRes, statsRes] = await Promise.all([
          axios.get(`${BACKEND_URL}/api/admin/businesses`),
          axios.get(`${BACKEND_URL}/api/admin/statistics`)
        ]);
        setBusinessOwners(ownersRes.data.data.owners.slice(0, 4)); // Top 4 business owners
        setStats(statsRes.data.data);
      } catch (error) {
        console.error('Failed to fetch portfolio data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-500 to-orange-700 text-white py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Welcome to Our Service Booking Platform
          </motion.h1>
          <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
            Connect with top business owners and book services with ease and convenience.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-orange-600 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-100 transition"
            onClick={() => {navigate("/services")}}
          >
            Book a Service Now
          </motion.button>
        </div>
      </section>

      {/* Business Owners Spotlight */}
      <section className="py-12 md:py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Top Business Owners</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessOwners.map((owner) => (
              <motion.div
                key={owner._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * businessOwners.indexOf(owner) }}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition text-center"
              >
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-300 overflow-hidden">
                  {owner.businessLogo ? (
                    <img
                      src={owner.businessLogo}
                      alt={`${owner.businessName} Logo`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder-avatar.jpg";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-orange-100">
                      <span className="text-xl font-bold text-orange-500">
                        {owner.ownerFirstName?.charAt(0) || ""}
                        {owner.ownerLastName?.charAt(0) || ""}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-semibold">{owner.ownerFirstName} {owner.ownerLastName}</h3>
                <p className="text-gray-600">{owner.businessName}</p>
                <p className="text-sm text-gray-500">{owner.businessCategory}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-orange-100 to-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">Our Impact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Total Users', value: stats.totalUsers },
              { label: 'Business Owners', value: stats.totalBusinessOwners },
              { label: 'Services Offered', value: stats.totalServices },
              { label: 'Bookings Completed', value: stats.totalBookings },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <p className="text-3xl font-bold text-orange-600">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-20 bg-orange-600 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-lg mb-6 max-w-xl mx-auto">
          Join thousands of satisfied users and book your next service today!
        </p>
        {authUser &&
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          className="bg-white text-orange-600 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-100 transition"
        >
            Sign Up Now
          </motion.button>
        }
      </section>
    </div>
  );
};

export default PortfolioPage;