import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
const Homepage = () => {
  const sectionsRef = useRef([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // Fetch services from the API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("https://bookmyservice.onrender.com/api/service/getAll");

       console.log(response);
       
        // const data = await response.json();
        setServices(response.data.data); // Assuming the services are in `data.data`
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);


    // Handle booking
    const handleBookService = () => {
      if (selectedService) {
        alert(`Booking service: ${selectedService.name}`);
        // Add your booking logic here
      }
    };
  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };
    // Open modal with service details
    const handleDetailsClick = (service) => {
      setSelectedService(service);
      setIsModalOpen(true);
    };
  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeInUp");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="bg-white text-black px-4 md:px-20">
      {/* Hero Section */}
      <section
        ref={(el) => (sectionsRef.current[0] = el)}
        className="flex flex-col lg:flex-row justify-between items-center px-4 md:px-12 py-12 md:py-16 opacity-0"
      >
        <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
          <h1 className="text-3xl md:text-5xl font-bold text-black leading-tight">
            Discover and Book <br /> Expert Services for Your Business
          </h1>
          <p className="text-lg text-gray-700">
            Welcome to{" "}
            <span className="font-semibold text-[#ef830f]">ServiceConnect</span>
            , where businesses showcase services and clients find what they need.
            Our platform streamlines booking and management for seamless
            transactions.
          </p>
          <button className="px-6 py-3 bg-[#ef830f] text-white font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105">
            Get Started
          </button>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center mt-8 lg:mt-0">
          <img
            src="../images/HomePageImage.svg"
            alt="Business Services"
            className="w-full max-w-md h-auto rounded-xl shadow-lg object-cover"
          />
        </div>
      </section>

      {/* Business Categories */}
      <section
        ref={(el) => (sectionsRef.current[1] = el)}
        className="flex justify-center flex-wrap gap-4 py-8 opacity-0"
      >
        {[
          "Plumbing",
          "Photography",
          "Catering",
          "Cleaning",
          "Event Planning",
          "Landscaping",
          "Home Repairs",
        ].map((service, index) => (
          <button
            key={index}
            className="relative px-6 py-3 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 shadow-md bg-[#ef830f] before:absolute before:top-0 before:left-0 before:w-0 before:h-full before:bg-[#e56000] before:transition-all before:duration-300 hover:before:w-full"
          >
            <span className="relative z-10">{service}</span>
          </button>
        ))}
      </section>

      {/* Explore Services */}
      <section
        ref={(el) => (sectionsRef.current[2] = el)}
        className="px-4 md:px-12 py-16 opacity-0"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-black text-center">
          Explore a Variety of Tailored Services for Your Business Needs.
        </h2>
        <div className="w-full h-64 mt-6 flex items-center justify-center relative">
          {/* Background Dotted Pattern */}
          <div className="absolute left-40 w-24 md:w-36 h-24 md:h-36 bg-[url('../public/images/dottedimage.png')] bg-cover"></div>

          {/* Main Image with Oval Mask */}
          <div className="w-4/5 md:w-2/3 h-full overflow-hidden rounded-[60px] md:rounded-[120px] relative">
            <img
              src="../public/images/largeimage.png"
              className="w-full h-full object-cover"
              alt="Service"
            />
          </div>

          {/* Floating Label */}
          <div className="absolute right-5 md:right-46 sm:right-0 sm:display-none  bg-orange-500 text-white px-4 md:px-6 py-2 md:py-4 rounded-lg font-semibold">
            Efficiency
          </div>
        </div>
      </section>

      {/* Browse Services */}
      <section
        ref={(el) => (sectionsRef.current[3] = el)}
        className="px-4 md:px-12 py-16 opacity-0"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-6">
          Browse Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "Marketing",
            "Design",
            "Consulting",
            "Technology",
            "Finance",
            "Legal",
          ].map((service, index) => (
            <div
              key={service}
              className="bg-[#e5c8a5] p-6 rounded-lg shadow-md flex items-center space-x-4 hover:bg-[#ef830f] hover:text-white transition-all duration-300 cursor-pointer"
            >
              <span className="text-xl font-bold">
                {index + 1 < 10 ? `0${index + 1}` : index + 1}
              </span>
              <span className="text-lg font-medium">{service}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button className="bg-[#ef830f] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#e56f00] transition-all duration-300">
            Show All
          </button>
        </div>
      </section>

      <section
        ref={(el) => (sectionsRef.current[4] = el)}
        className="px-4 md:px-12 py-16 opacity-0"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-6">
          Latest Services
        </h2>

        {loading ? (
          <div className="text-center py-6">Loading services...</div>
        ) : error ? (
          <div className="text-center py-6 text-red-500">Error: {error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service._id}
                className="bg-[#f2e2ce] p-6 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-[#e5c8a5] cursor-pointer"
              >
                {/* Image Placeholder or Service Image */}
                <div className="w-full h-40 bg-gray-300 flex items-center justify-center mb-4 rounded-lg overflow-hidden">
                  <img
                    src={service.image || "/Service.jpg"}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-lg font-bold text-black">{service.name}</h3>
                <p className="text-gray-600 mt-2">{service.description}</p>

                <button
                  onClick={() => handleDetailsClick(service)}
                  className="mt-3 bg-[#ef830f] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#e56f00] transition-all duration-300"
                >
                  Details
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Modal for Service Details */}
      {isModalOpen && selectedService && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">{selectedService.name}</h2>
            <img
              src={selectedService.image || "/Service.jpg"}
              alt={selectedService.name}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <p className="text-gray-600 mb-2">{selectedService.description}</p>
            <p className="text-gray-500 mb-2">
              Availability: {selectedService.availability}
            </p>
            <p className="text-gray-500 mb-4">
              Price: {selectedService.price ? `$${selectedService.price}` : "N/A"}
            </p>

            {/* Book Button (for users only) */}
            <button
              onClick={handleBookService}
              className="w-full bg-[#ef830f] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#e56f00] transition-all duration-300"
            >
              Book Now
            </button>

            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="mt-4 w-full bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;